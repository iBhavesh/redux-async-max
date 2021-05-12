import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showCart: boolean;
}

const initialState: UIState = {
  showCart: false,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { toggleCart } = ui.actions;
export default ui.reducer;
