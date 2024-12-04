import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  createReturn,
  fetchAllOrders,
  fetchAllReturns,
  fetchOrderById,
  fetchReturnById,
  updateOrderById,
  updateReturnById,
} from "./ordersAPI";

const initialState = {
  returns: [],
  return: null,
  orders: [],
  totalOrders: 0,
  status: "idle",
  error: null,
  orderSuccess: null,
  selectedOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createReturnAsync = createAsyncThunk(
  "order/createReturn",
  async ({ data, alert }, { rejectWithValue }) => {
    try {
      const response = await createReturn(data);
      alert("Return Request Succesfully Created");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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
export const fetchReturnByIdAsync = createAsyncThunk(
  "return/fetchReturnById",
  async (id) => {
    const response = await fetchReturnById(id);
    return response.data;
  }
);
export const fetchAllReturnsAsync = createAsyncThunk(
  "return/fetchAllReturn",
  async () => {
    const response = await fetchAllReturns();
    return response.data;
  }
);
export const updateReturnByIdAsync = createAsyncThunk(
  "return/updateReturnById",
  async ({ id, updatedReturnItem }) => {
    const response = await updateReturnById(id, updatedReturnItem);
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
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
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
      })
      .addCase(createReturnAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReturnAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createReturnAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchReturnByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReturnByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.return = action.payload;
      })
      .addCase(fetchReturnByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchAllReturnsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllReturnsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.returns = action.payload;
      })
      .addCase(fetchAllReturnsAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateReturnByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReturnByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.returns.findIndex(
          (r) => r.id === action.payload.id
        );
        state.returns.splice(index, 1, action.payload);
      })
      .addCase(updateReturnByIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { resetOrderSuccess } = ordersSlice.actions;

export const selectOrderSuccess = (state) => state.order.orderSuccess;
export const selectAllOrders = (state) => state.order.orders;
export const selectSelectedOrder = (state) => state.order.selectedOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderError = (state) => state.order.error;
export const selectAllReturns = (state) => state.order.returns;
export const selectReturn = (state) => state.order.return;

export default ordersSlice.reducer;
