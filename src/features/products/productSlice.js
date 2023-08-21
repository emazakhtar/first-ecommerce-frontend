import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  fetchAllProducts,
  fetchBrand,
  fetchCategory,
  fetchProductByFilter,
  fetchProductById,
  updateProductById,
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
export const updateProductByIdAsync = createAsyncThunk(
  "product/updateProductById",
  async (updatedProduct) => {
    const response = await updateProductById(updatedProduct);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "product/addProduct",
  async (product) => {
    const response = await addProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
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
      })
      .addCase(updateProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products.splice(index, 1, action.payload);
      })
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      });
  },
});

export const { resetSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrand = (state) => state.product.brand;
export const selectCategory = (state) => state.product.category;
export const selectProduct = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
