import Listing from "../models/listing.model.js";
import Property from "../models/property.model.js";
import { errorHandler } from "../utils/error.js";
import {prepareSearchTerm} from "../utils/Searchutil.js";

export const createListing = async (req, res, next) => {
  try {
    console.log("data", req.body)
    const listing = await Property.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Property.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, "You can only delete your own listing!"));
  // }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Property.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, "You can only update your own listings!"));
  // }
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


export const getUniqueSelectedCounties = async (req, res, next) => {
  try {
    // Fetch all unique counties
    const uniqueCounties = await Property.distinct("address.city");

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

    const listings = await  Property.find({ 'address.city': selectedCounty });

    console.log("Listings sent in response:", listings);

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await  Property.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getAllListings = async (req, res) => {
  try {
    const listings = await  Property.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}
// search algorithm specific

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

    let searchTerm = req.query.searchTerm || "";
    searchTerm = prepareSearchTerm(searchTerm); // Clean and prepare the search term

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { 'address.selectedCounty': { $regex: searchTerm, $options: "i" } },  // Updated
        { 'address.location': { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { subcategory:{ $regex: searchTerm, $options: "i" }},
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



export const getCategories = async (req, res) => {
  try {
    const { county, categoryname } = req.params;
    console.log("County:", county);
    console.log("Category:", categoryname);

    let query = { 'address.city': county };

    // Define custom search criteria based on the category
    if (categoryname) {
      query = {
        ...query,
        $or: [
          { 'category.category': { $regex: categoryname, $options: "i" } }, // Match the selected category
          { 'category.subcategories.subcategory': { $regex: categoryname, $options: "i" } }, // Match subcategory
        ],
      };
      console.log("Constructed query:", query);
    }

    // Query listings from the database based on the constructed query
    const listings = await Property.find(query).populate('category.subcategories.rooms');

    // Check if listings were found
    if (listings.length === 0) {
      return res.status(404).json({ message: "No listings found." });
    }

    // Filter the listings to only return the specific category and subcategories that match `categoryname`
    const filteredListings = listings.map(listing => {
      // Filter the categories based on the selected category name
      const filteredCategories = listing.category.filter(cat =>
        cat.category.toLowerCase() === categoryname.toLowerCase()
      );

      // Create a new object containing the filtered categories
      return {
        ...listing._doc,
        category: filteredCategories, // Override the full category list with the filtered one
      };
    }).filter(listing => listing.category.length > 0); // Ensure only listings with the selected category are returned

    // Send the filtered listings
    res.json(filteredListings);
    console.log("Filtered Listings:", filteredListings);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

