import {register_user ,login_user ,forgot_password } from "../controller/auth.controller.js"
import express from "express"

const route = express.Router()

route.post("/register", register_user);
route.post("/login", login_user);
route.post("/forgot-password", forgot_password);


export default route

