import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchAllOrders,
  fetchOrderById,
  updateOrderById,
} from "./ordersAPI";

const initialState = {
  orders: [],
  totalOrders: 0,
  status: "idle",
  error: null,
  orderSuccess: null,
  selectedOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    const response = await createOrder(orderData);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ pagination, sort }) => {
    const response = await fetchAllOrders({ pagination, sort });
    return response.data;
  }
);
export const updateOrderByIdAsync = createAsyncThunk(
  "order/updateOrderById",
  async (id) => {
    const response = await updateOrderById(id);
    return response.data;
  }
);
export const fetchOrderByIdAsync = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    const response = await fetchOrderById(id);
    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    resetOrderSuccess: (state) => {
      state.orderSuccess = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderSuccess = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders.splice(index, 1, action.payload);
      })
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedOrder = action.payload;
      });
  },
});

export const { resetOrderSuccess } = ordersSlice.actions;

export const selectOrderSuccess = (state) => state.order.orderSuccess;
export const selectAllOrders = (state) => state.order.orders;
export const selectSelectedOrder = (state) => state.order.selectedOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrderStatus = (state) => state.order.status;

export default ordersSlice.reducer;
