import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getAllFilterProduct = createAsyncThunk(
  "shop/getAllproduct",
  async ({ filterParams, sortParms }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParms,
    });
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/product/get?${query}`,
      { withCredentials: true }
    );
    //  console.log(response.data)

    return response.data;
  }
);
export const getProductDetails = createAsyncThunk(
  "shop/getproductdetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/product/get/${id}`,
      { withCredentials: true }
    );
    // console.log(response.data);

    return response.data;
  }
);
const shoppingProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilterProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilterProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(getAllFilterProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action?.payload?.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
