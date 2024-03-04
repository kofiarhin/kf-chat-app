import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import messageReducer from "./message/messageSlice";
import navigationReducer from "./Navigation/navigationSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    navigation: navigationReducer,
  },
});
