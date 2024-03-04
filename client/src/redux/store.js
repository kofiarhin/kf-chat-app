import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import messageReducer from "./message/messageSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});
