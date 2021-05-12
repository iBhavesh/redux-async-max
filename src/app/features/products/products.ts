import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      id: "p1",
      title: "Shoe",
      price: 6,
      description: "These are shoes!",
    },
    {
      id: "p2",
      title: "Shirt",
      price: 10,
      description: "This is a shirt!",
    },
    {
      id: "p3",
      title: "Trouser",
      price: 6,
      description: "These are shoes!",
    },
  ],
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

// export const {} = products.actions;
export default products.reducer;
