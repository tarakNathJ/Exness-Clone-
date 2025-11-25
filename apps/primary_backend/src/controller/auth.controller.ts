import api_responce from "../utils/api_responce.js";
import { api_error } from "../utils/api_error.js";
import { async_handler } from "../utils/async_handler.js";
import { user, db, eq, account_balance } from "@database/main/dist/index.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { and } from "drizzle-orm";

// signup controller
export const register_user = async_handler(async (req, res) => {
  const { name, email, password } = req.body;

  //chack all fields
  // chack user all ready exist or not
  // genetrate hash
  // insert data in out db
  // return responce
  if (
    [name, email, password].some(
      (item) => item.trim() === undefined || item.trim() === ""
    )
  ) {
    throw new api_error(400, "please fill all the fields");
  }

  const user_exist = await db.select().from(user).where(eq(user.email, email));
  if (user_exist.length > 0) {
    console.log(user_exist);
    throw new api_error(400, "user already exist try anather email");
  }
  const salt = await bcrypt.genSalt(10);
  const hashed_password = bcrypt.hashSync(password, salt);
  if (!hashed_password) throw new api_error(400, "generate solt failed");

  const [add_new_user] = await db
    .insert(user)
    .values({
      name: name,
      email: email,
      password: hashed_password,
      is_active: true,
    })
    .returning({
      name: user.name,
      email: user.email,
    });

  if (!add_new_user) {
    throw new api_error(400, "database insert failed");
  }

  return new api_responce(201, "user added successfully", add_new_user).send(
    res
  );
});

// login controller
export const login_user = async_handler(async (req, res) => {
  const { email, password } = req.body;

  //   chack hole fields
  //find user data
  // chack password are write or wrong
  if (
    [email, password].some(
      (item) => item.trim() === undefined || item.trim() === ""
    )
  ) {
    throw new api_error(400, "please fill all the fields");
  }

  const [user_data] = await db.select().from(user).where(eq(user.email, email));

  if (!user_data) {
    throw new api_error(400, "user not found");
  }

  const is_password_match = bcrypt.compareSync(password, user_data.password);

  if (!is_password_match) {
    throw new api_error(400, "password not match");
  }

  const token = JWT.sign(
    { id: user_data.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
  if (!token) throw new api_error(400, "token not generated");

  return new api_responce(200, "login successfully", {
    token,
    email: user_data.email,
    name: user_data.name,
  }).send(res);
});

// fogget password
export const forgot_password = async_handler(async (req, res) => {
  const { new_password, email } = req.body;

  if (
    [email, new_password].some(
      (item) => item.trim() === undefined || item.trim() === ""
    )
  ) {
    throw new api_error(400, "please fill all the fields");
  }

  const [fing_user] = await db.select().from(user).where(eq(user.email, email));
  if (!fing_user) throw new api_error(400, "user not found");

  const salt = await bcrypt.genSalt(10);
  const hashed_password = bcrypt.hashSync(new_password, salt);
  if (!hashed_password) throw new api_error(400, "generate solt failed");

  const [update_password] = await db
    .update(user)
    .set({ password: hashed_password })
    .where(eq(user.email, email))
    .returning();

  if (!update_password) throw new api_error(400, "update password failed");

  return new api_responce(200, "password updated successfully").send(res);
});

// add user balance

export const add_balance = async_handler(async (req, res) => {
  // chack .  all data are exist or not
  // find user  : db and chack
  // chack this symbol data are exist or not
  // chack if exist then update || if not exist then create
  // return responce

  const { symbol, balance } = req.body;
  // @ts-ignore
  const user_id = req.user.id;
  if (!symbol || !user_id || !balance) {
    throw new api_error(400, "please fill all the fields");
  }

  const [user_are_exist] = await db
    .select()
    .from(user)
    .where(eq(user.id, user_id));

  if (
    !user_are_exist ||
    user_are_exist === undefined ||
    user_are_exist === null
  ) {
    throw new api_error(400, "user not found");
  }

  const [chack_balance_for_this_simbol_balance_exist] = await db
    .select()
    .from(account_balance)
    .where(
      and(
        eq(account_balance.symbol, symbol),
        eq(account_balance.user_id, user_id)
      )
    );
  if (!chack_balance_for_this_simbol_balance_exist) {
    throw new api_error(400, "balance not found");
  }
  const [add_new_balance] = await db
    .insert(account_balance)
    .values({
      balance: balance,
      symbol: symbol,
      user_id: user_id,
    })
    .onConflictDoUpdate({
      target: [account_balance.symbol, account_balance.user_id],
      set: {
        balance: balance + chack_balance_for_this_simbol_balance_exist.balance,
      },
    })
    .returning({
      balance: account_balance.balance,
      symbol: account_balance.symbol,
    });

  if (!add_new_balance) throw new api_error(400, "db insert failed");

  return new api_responce(
    200,
    "balance added successfully",
    add_new_balance
  ).send(res);
});

// purchase new simple tread
