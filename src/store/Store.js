import { configureStore } from "@reduxjs/toolkit";
import adminProductSlice from "./admin/product-slice";
import authReducer from "./auth-slice";

import shoppingCartSlice from "./shop/cart-slice";
import ShoppingOrderSlice from "./shop/order-slice";
import shoppingAddressSlice from "./shop/order-slice";
import shoppingProductSlice from "./shop/product-slice";
import ShoppingReviewSlice from "./shop/review-slice";
import ShoppingSearchSlice from "./shop/search-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,

    shopProduct: shoppingProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shoppingAddressSlice,
    shopOrder: ShoppingOrderSlice,
    shopSearch: ShoppingSearchSlice,
    shopReview: ShoppingReviewSlice,
  },
});
export default store;
