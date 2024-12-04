import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReviewAsync, selectReviewStatus } from "../reviewSlice";
import { Link, useParams } from "react-router-dom";
import { selectLoggedInUserInfo } from "../../users/usersSlice";
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

const RatingReviewForm = () => {
  // States to manage rating and review text
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const status = useSelector(selectReviewStatus);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { email } = useSelector(selectLoggedInUserInfo);
  const alert = useAlert();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the rating and review, or you can send this to the backend
    console.log("Rating:", rating);
    console.log("Review:", reviewText);
    const reviewData = {
      rating: rating,
      comment: reviewText,
      email: email,
      productId: productId,
    };
    // ASYNC API CALL
    dispatch(createReviewAsync({ reviewData: reviewData, alert }));
    // Reset form fields after submission
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
      {status === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Loader component */}
          <Grid
            className="loader"
            height={80}
            width={80}
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            visible={true}
          />
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Rate & Review
      </h2>

      {/* Rating stars */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              size={24}
              className={`cursor-pointer ${
                starValue <= (hover || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </div>

      {/* Review text area */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg mb-4 text-gray-700"
          rows="4"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          disabled={!rating || !reviewText.trim()} // Disable if rating or review is empty
        >
          Submit Review
        </button>
      </form>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or
          <Link to="/">
            <button
              type="button"
              className="font-medium text-gray-600 hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RatingReviewForm;
