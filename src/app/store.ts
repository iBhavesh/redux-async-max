import { configureStore } from "@reduxjs/toolkit";
import products from "./features/products/products";
import cart from "./features/cart/cart";

const store = configureStore({
  reducer: {
    products,
    cart,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
