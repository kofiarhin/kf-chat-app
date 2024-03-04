import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = navigationSlice.actions;

export default navigationSlice.reducer;
