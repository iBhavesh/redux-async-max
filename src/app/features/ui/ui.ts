import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Notification = {
  status: string;
  title: string;
  message: string;
};
interface UIState {
  showCart: boolean;
  notification: Notification | null;
}

const initialState: UIState = {
  showCart: false,
  notification: null,
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action: PayloadAction<Notification | null>) {
      if (action.payload) {
        state.notification = {
          ...action.payload,
        };
      } else {
        state.notification = null;
      }
    },
  },
});

export const { toggleCart, showNotification } = ui.actions;
export default ui.reducer;
