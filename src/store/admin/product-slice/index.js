import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "admin/product/add",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/product/add`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const getAllProduct = createAsyncThunk(
  "admin/getAllproduct",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/product/get`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateproduct",
  async ({ id, formData }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/product/edit/${id}`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/product/delete/${id}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.products;
      })
      .addCase(getAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
    // Add new product
    // .addCase(addNewProduct.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(addNewProduct.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.error = null;
    // })
    // .addCase(addNewProduct.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // })
    // // Update product
    // .addCase(updateProduct.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(updateProduct.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.error = null;
    // })
    // .addCase(updateProduct.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // })
    // // Delete product
    // .addCase(deleteProduct.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(deleteProduct.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.error = null;
    // })
    // .addCase(deleteProduct.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // });
  },
});
export default adminProductSlice.reducer;
