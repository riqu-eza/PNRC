import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing!"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// export const getUniqueSelectedCounties = async (req, res, next) => {
//   try {
//     const uniqueCounties = await Listing.distinct("selectedCounty");

//     res.status(200).json(uniqueCounties);
//   } catch (error) {
//     next(error);
//   }
// };
export const getUniqueSelectedCounties = async (req, res, next) => {
  try {
    // Fetch all unique counties
    const uniqueCounties = await Listing.distinct("selectedCounty");

    // Filter out any null, undefined, or empty string values
    const filteredCounties = uniqueCounties.filter(county => county);

    // Respond with the filtered list of unique counties
    res.status(200).json(filteredCounties);
  } catch (error) {
    next(error);
  }
};


export const getListingsByCounty = async (req, res, next) => {
  try {
    const { selectedCounty } = req.query;

    console.log("Selected County:", selectedCounty);

    const listings = await Listing.find({ selectedCounty });

    console.log("Listings sent in response:", listings);

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { selectedCounty: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getcategories = async (req, res) => {
  try {
    const { county, categoryname } = req.params;
    console.log("County:", county);
    console.log("Category:", categoryname);

    let query = { selectedCounty: county };

    // Define custom search criteria based on the category
    if (categoryname) {
      // Add conditions based on the category name
      query = {
        ...query,
        $or: [
          { selectedCategory: { $regex: categoryname, $options: "i" } },
          { selectedSubcategory: { $regex: categoryname, $options: "i" } },
        ],
      };
      console.log(query)
    }

    // Query listings from the database based on the constructed query
    const listings = await Listing.find(query);
    res.json(listings);
    console.log("listings:", listings);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
