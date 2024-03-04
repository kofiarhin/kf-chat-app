import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setMessages: (state, action) => {
      console.log("set mesages");
      state.messages = action.payload;
    },
  },
});

export const { reset, setMessages } = messageSlice.actions;

export default messageSlice.reducer;
