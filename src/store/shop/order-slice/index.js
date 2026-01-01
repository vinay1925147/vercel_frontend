import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  orderId: null,
  approvalURL: null,
};

// export const createNewOrder = createAsyncThunk(
//   "/createNew/order",
//   async (orderData) => {
//     const API_KEY = "rzp_test_Rxq4f57ftUUrWY";
//     // const getAPI
//     const { data } = await axios.post(
//       "${import.meta.env.VITE_API_URL}/api/shop/order/create",
//       { orderData }
//     );
//     console.log(data);
//     const options = {
//       key:API_KEY, // Enter the Key ID generated from the Dashboard
//       amount: data?.amount, // Amount is in currency subunits.
//       currency: "INR",
//       name: "Shopping",
//       description: "Test Transaction",
//       image:"",
//       order_id: data?.id,
//       callback_url: "${import.meta.env.VITE_API_URL}/api/shop/order/verify",
//       prefill: {
//         name: "Vinay Asati",
//         email: "vinayasati90@gmail.com",
//         contact: "9770096768",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#121212",
//       },
//     };
//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();

//     console.log(data)
//     return data;
//   }
// );

// export const captureOrder = createAsyncThunk(
//   "/capture/order",
//   async ({ paymentId, payerId, orderId }) => {
//     const response = await axios.post(
//       "${import.meta.env.VITE_API_URL}/api/shop/order/capture",
//       {
//         paymentId,
//         payerId,
//         orderId,
//       }
//     );
//     //  console.log(response.data,response);
//     return response.data;
//   }
// );

export const createNewOrder = createAsyncThunk(
  "/createNew/order",
  async (orderData) => {
    const API_KEY = "rzp_test_Rxq4f57ftUUrWY";
    const { data } = await axios.post(
      "${import.meta.env.VITE_API_URL}/api/shop/order/create",
      { orderData }
    );

    const options = {
      key: API_KEY,
      amount: data.amount,
      currency: "INR",
      name: "Shopping",
      description: "Test Transaction",
      order_id: data.id,

      handler: async function (response) {
        // 🔥 THESE VALUES COME HERE
        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/shop/order/verify`,
          verifyData
        );
      },

      prefill: {
        name: "Vinay Asati",
        email: "vinayasati90@gmail.com",
        contact: "9770096768",
      },
      theme: {
        color: "#121212",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    console.log("data is coming....", data);
    return data;
  }
);

const ShoppingOrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.approvalURL = action?.payload?.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        // state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default ShoppingOrderSlice.reducer;
