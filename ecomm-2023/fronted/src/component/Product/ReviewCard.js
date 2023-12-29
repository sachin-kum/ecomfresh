import React from "react";
import "../../css/DetailsPage.css";
import { Rating } from "@mui/material";
const ReviewCard = (review) => {
  return (
    <>
      <div className="container">
        <div class="accordion testimonial">
          <div class="lb row my-3">
            <div
              class="testi-image dfw-FontResize col-3"
              style={{ fontSize: "15px" }}
            >
              <img src="https://i.imgur.com/Vzox3O3.jpg" alt="Testimonial9" />
            </div>

            <div className="review-para col-9">
              <div class="rating-t">
                <Rating
                  name="read-only"
                  value={review?.reviews?.rating}
                  readOnly
                  precision={0.5}
                />
                <strong>{review?.reviews?.name}</strong>
              </div>
              <div class="testi-text">
                <span class="quote-l"></span>
                {review?.reviews?.comment}
                <span class="quote-r"></span>
              </div>
            </div>
          </div>

          <div class="pane"></div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
