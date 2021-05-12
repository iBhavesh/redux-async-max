import { configureStore } from "@reduxjs/toolkit";
import products from "./features/products/products";
import cart from "./features/cart/cart";
import ui from "./features/ui/ui";

const store = configureStore({
  reducer: {
    products,
    cart,
    ui,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
