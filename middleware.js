const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./Schema.js");

// Check if user is logged in
module.exports.isloggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login");
  }
  next();
};

// Save redirect URL in session
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Check if user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  // Check if the current user is the owner of the listing
  if (!listing.owner || !listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to edit.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// Server-side validation for Listing
module.exports.validationListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(".");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Server-side validation for Review
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(".");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
  
    // Check if the current user is the owner of the listing
    if (!review.author || !review.author._id.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission to delete.");
      return res.redirect(`/listings/${id}`);
    }
  
    next();
  };