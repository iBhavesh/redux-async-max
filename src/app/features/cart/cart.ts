import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/products";

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  total: number;
  price: number;
};

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload, type }: PayloadAction<Product | CartItem>) {
      const item = state.items.find((item) => item.id === payload.id);

      if (!item) {
        state.items.push({
          id: payload.id,
          title: payload.title,
          price: payload.price,
          quantity: 1,
          total: payload.price,
        });
      } else if (item) {
        item.total += item.price;
        item.quantity++;
      }
      state.totalQuantity++;
    },
    removeItem(state, { payload, type }: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === payload);
      if (!item) {
        return;
      }
      if (item.quantity > 1) {
        item.quantity--;
        item.total -= item.price;
        return;
      }
      state.items = state.items.filter((item) => item.id !== payload);
      state.totalQuantity--;
    },
  },
});

export const { addItem, removeItem } = cart.actions;
export default cart.reducer;
