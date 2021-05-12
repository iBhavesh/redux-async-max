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
  showCart: boolean;
}

const initialState: CartState = {
  items: [],
  showCart: false,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload, type }: PayloadAction<Product | CartItem>) {
      const index = state.items.findIndex((item) => item.id === payload.id);

      if (index === -1) {
        state.items.push({
          id: payload.id,
          title: payload.title,
          price: payload.price,
          quantity: 1,
          total: payload.price,
        });
      } else if (index !== -1) {
        const item = state.items[index];
        item.total += item.price;
        item.quantity++;
      }
    },
    removeItem(state, { payload, type }: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === payload);
      if (index === -1) {
        return;
      }
      if (state.items[index].quantity > 1) {
        state.items[index].quantity--;
        return;
      }
      state.items = state.items.filter((item) => item.id !== payload);
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { addItem, removeItem, toggleCart } = cart.actions;
export default cart.reducer;
