import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  addressList: [],
};
export const addNewAddress = createAsyncThunk(
  "/add/addNewaddress",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const getAllAddress = createAsyncThunk(
  "/get/getAlladdress",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);
export const editAddress = createAsyncThunk(
  "/edit/address",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/address/edit/${userId}/${addressId}`,
      { formData },
      { withCredentials: true }
    );

    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/delete/address",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/api/shop/address/delete/${userId}/${addressId}`,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  }
);

const shoppingAddressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.success ? action.payload.data : null;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(getAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.success ? action.payload.data : null;
      })
      .addCase(getAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default shoppingAddressSlice.reducer;
