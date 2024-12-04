import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllReviewsAsync,
  selectAllReviews,
  selectReviewStatus,
  updateReviewByIdAsync,
} from "../../review/reviewSlice";

import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";

const AdminReviews = () => {
  const reviews = useSelector(selectAllReviews);
  const dispatch = useDispatch();
  console.log(reviews);
  const status = useSelector(selectReviewStatus);

  // Fetch reviews on component mount
  useEffect(() => {
    dispatch(fetchAllReviewsAsync());
  }, [dispatch]);

  // Handle status change of a review
  const handleStatusChange = async (review, e) => {
    console.log(e.target.value);
    console.log(review);
    const updatedReview = {
      ...review,
      status: e.target.value,
    };
    dispatch(updateReviewByIdAsync(updatedReview));
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      {status === "loading" && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <h1 className="text-2xl text-gray-500 font-bold mb-4">Admin Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">ProductId</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Comment</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews &&
              reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-gray-800">
                    {review.email}
                  </td>
                  <Link to={`/product-detail/${review.productId}`}>
                    <td className="py-2 px-4 border-b text-gray-800">
                      {review.productId}
                    </td>
                  </Link>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {review.rating}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {review.comment}
                  </td>
                  <td className="py-2 px-4 border-b text-gray-800">
                    {review.status === "verified" ? (
                      <span className="text-green-500 font-semibold">
                        Verified
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={
                        review.status === "verified" ? "verified" : "pending"
                      }
                      onChange={(e) => handleStatusChange(review, e)}
                      className="bg-gray-200 border border-gray-400 rounded-md p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
