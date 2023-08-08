import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrand,
  fetchCategory,
  fetchProductByFilter,
  fetchProductById,
} from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brand: [],
  category: [],
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductByFilter(filter, sort, pagination);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchBrandAsync = createAsyncThunk(
  "product/fetchBrandAsync",
  async () => {
    const response = await fetchBrand();
    return response.data;
  }
);
export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategoryAsync",
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brand = action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrand = (state) => state.product.brand;
export const selectCategory = (state) => state.product.category;
export const selectProduct = (state) => state.product.selectedProduct;

export default productSlice.reducer;
