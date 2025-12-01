import { configureStore } from "@reduxjs/toolkit";
import adminProductSlice from "./admin/product-slice";
import authReducer from "./auth-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shoppingProductSlice from "./shop/product-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shoppingProductSlice,
    shopCart: shoppingCartSlice,
  },
});

export default store;
