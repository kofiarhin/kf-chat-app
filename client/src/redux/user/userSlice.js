import { socket } from "../../utils/helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const username = JSON.parse(localStorage.getItem("username"));

const initialState = {
  username: username ? username : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  users: [],
};

// login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkApi) => {
    socket.emit("join", userData);
    localStorage.setItem("username", JSON.stringify(userData));
    return userData;
  }
);

// logout user
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (username, thunkApi) => {
    localStorage.removeItem("username");
    socket.emit("leave", username);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.username = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.username = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "something went wrong";
      });
  },
});

export const { reset, setUsers } = userSlice.actions;

export default userSlice.reducer;
