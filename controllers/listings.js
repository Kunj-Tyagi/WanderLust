const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showlisting = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editform = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updatelisting = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deletelisting = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports.search = async (req, res) => {
  // Helper function to handle the response rendering
  const renderListings = (message, allListings) => {
    res.locals.success = message;
    res.render("listings/index.ejs", { allListings });
    return;
  };

  // Extract and clean the search query
  const input = (req.query.q || "").trim().replace(/\s+/g, " ");
  console.log(input);

  // Check for empty input
  if (input === "") {
    req.flash("error", "Search value empty !!!");
    return res.redirect("/listings");
  }

  // Capitalize the first letter of each word
  const capitalizeInput = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const element = capitalizeInput(input);
  console.log(element);

  // Function to search listings based on a regex query
  const searchListings = async (field) => {
    const results = await Listing.find({
      [field]: { $regex: element, $options: "i" },
    }).sort({ _id: -1 });
    if (results.length > 0) {
      return results;
    }
    return [];
  };

  // Search in order of preference
  let allListings = await searchListings("title");
  if (allListings.length > 0) {
    return renderListings("Listings searched by Title", allListings);
  }

  allListings = await searchListings("category");
  if (allListings.length > 0) {
    return renderListings("Listings searched by Category", allListings);
  }

  allListings = await searchListings("country");
  if (allListings.length > 0) {
    return renderListings("Listings searched by Country", allListings);
  }

  allListings = await searchListings("location");
  if (allListings.length > 0) {
    return renderListings("Listings searched by Location", allListings);
  }

  // Check if input is a number for price search
  const intValue = parseInt(element, 10);
  if (Number.isInteger(intValue)) {
    allListings = await Listing.find({ price: { $lte: intValue } }).sort({
      price: 1,
    });
    if (allListings.length > 0) {
      return renderListings(
        `Listings searched for less than Rs ${intValue}`,
        allListings
      );
    }
  }

  // If no listings found
  req.flash("error", "Listings are not here !!!");
  res.redirect("/listings");
};
