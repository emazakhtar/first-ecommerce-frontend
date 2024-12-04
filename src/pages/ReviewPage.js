import React from "react";
import Navbar from "../features/navbar/Navbar";
import RatingReviewForm from "../features/review/components/Rating";

function RatingReviewPage() {
  return (
    <div>
      <Navbar>
        <RatingReviewForm></RatingReviewForm>
      </Navbar>
    </div>
  );
}

export default RatingReviewPage;
