import { configureStore } from "@reduxjs/toolkit";
import user_info from "./user_info.js"


export const store = configureStore({
  reducer: {
    counter: user_info,
  },
});