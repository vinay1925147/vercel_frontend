import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReviews = createAsyncThunk(
  "/add/review",
  async (data) => {
    const response = axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/review/add`,
      data
    );

    return response.data;
  }
);
export const getProductReviews = createAsyncThunk(
  "/get/review",
  async ({ productId }) => {
    const response = axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
    );
    return response.data;
  }
);

const ShoppingReviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action?.payload?.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = null;
      });
  },
});
export default ShoppingReviewSlice.reducer;
