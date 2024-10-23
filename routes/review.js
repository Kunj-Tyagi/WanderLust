const express = require("express");
// If parent wala part route ka use ho raha call back mai toh usko mergeParams:true karega
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isloggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Reviews-Post Route
router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
