import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  fetchAllReview,
  fetchReviewByUserId,
  updateReviewById,
} from "./reviewAPI";

const initialState = {
  reviews: [],
  userReviews: [],
  status: "idle",
  error: null,
};

export const updateReviewByIdAsync = createAsyncThunk(
  "review/updateReview",
  async (updatedReview) => {
    const response = await updateReviewById(updatedReview);
    return response.data;
  }
);
export const fetchReviewByUserIdAsync = createAsyncThunk(
  "review/fetchReviewByUserId",
  async (userId) => {
    const response = await fetchReviewByUserId(userId);
    return response.data;
  }
);

export const fetchAllReviewsAsync = createAsyncThunk(
  "review/fetchAllReview",
  async () => {
    const response = await fetchAllReview();
    return response.data;
  }
);

export const createReviewAsync = createAsyncThunk(
  "review/createReview",
  async ({ reviewData, alert }) => {
    const response = await createReview(reviewData);
    alert.success("Review Successfully Saved");
    return response.data;
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateReviewByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReviewByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.reviews.findIndex(
          (item) => item.id === action.payload.id
        );
        state.reviews.splice(index, 1, action.payload);
      })
      .addCase(updateReviewByIdAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(fetchAllReviewsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllReviewsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.reviews = action.payload;
      })
      .addCase(fetchAllReviewsAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(createReviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReviewAsync.fulfilled, (state, action) => {
        console.log("reached here");
        state.status = "idle";
        state.reviews.push(action.payload);
      })
      .addCase(createReviewAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchReviewByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userReviews.push(action.payload);
      })
      .addCase(fetchReviewByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const selectAllReviews = (state) => state.review.reviews;
export const selectReviewStatus = (state) => state.review.status;
export const selectUserReviews = (state) => state.review.userReviews;

export default reviewSlice.reducer;
