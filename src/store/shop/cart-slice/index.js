import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addCartItems = createAsyncThunk(
  "cart/addCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/cart/add",
      { userId, productId, quantity },
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  }
);

export const getCartItems = createAsyncThunk("cart/getCart", async (userId) => {
  const response = await axios.get(
    `http://localhost:8000/api/shop/cart/get/${userId}`,
    { withCredentials: true }
  );
  console.log(response.data);
  return response.data;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:8000/api/shop/cart/update-cart",
      { userId, productId, quantity },
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/shop/cart/${userId}/${productId}`,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
