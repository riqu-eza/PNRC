import Business from "../models/business.model.js";

export const createBusiness = async (req, res, next) => {
  try {
    const business = await Business.create(req.body);
    return res.status(201).json(business);
  } catch (error) {
    next(error);
  }
};

export const getUniqueSelectedCounties = async (req, res, next) => {
  try {
    const city = await Business.distinct("selectedCounty");
    console.log("sent data", city);
    res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const getBusinessbycategory = async (req, res, next) => {
  try {
    const city = req.query.name;

    const business = await Business.find({ selectedCounty: city });

    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBusinessesByCounty = async (req, res) => {
  try {
    const city = req.query.name;
    const selectedCounty = city;

    const businesses = await Business.find({ selectedCounty })
      .populate("category.selectedCategory")
      .populate("category.selectedSubcategory");

    let businessCount = 0;
    let productCount = 0;
    let totalProductViews = 0;

    const groupedData = {};

    businesses.forEach((business) => {
      const { selectedCategory, selectedSubcategory } = business.category;

      businessCount++;

      if (!groupedData[selectedCategory]) {
        groupedData[selectedCategory] = {};
      }
      if (!groupedData[selectedCategory][selectedSubcategory]) {
        groupedData[selectedCategory][selectedSubcategory] = {
          businesses: [],
          productCount: 0,
          totalProductViews: 0,
        };
      }

      groupedData[selectedCategory][selectedSubcategory].businesses.push(
        business
      );

      // Count products and aggregate product views
      let businessProductViews = 0; // Reset for each business
      business.products.forEach((product) => {
        productCount++;
        businessProductViews += product.views;
      });

      // Update subgroup counts
      groupedData[selectedCategory][selectedSubcategory].productCount +=
        business.products.length;
      groupedData[selectedCategory][selectedSubcategory].totalProductViews +=
        businessProductViews;

      totalProductViews += businessProductViews;
    });

    const responseData = {
      businessCount,
      productCount,
      totalProductViews,
      groupedData,
    };

    // Send response
    res.json(responseData);
    console.log(responseData);
  } catch (err) {
    console.error("Error fetching businesses:", err);
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
};

export const getBusinessById = async (req, res, next) => {
  try {
    const businessId = req.params.id;
    const business = await Business.findById(businessId).populate("products");

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Collect all products and count their occurrences
    const productCount = {};
    business.products.forEach((product) => {
      if (!productCount[product.productName]) {
        productCount[product.productName] = { count: 0, products: [] };
      }
      productCount[product.productName].count++;
      productCount[product.productName].products.push(product);
    });

    // Determine key products based on frequency
    const sortedProducts = Object.keys(productCount)
      .map((key) => ({ productName: key, ...productCount[key] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Get the top 10 key products

    // Prepare the response data
    const response = {
      businessDetails: {
        name: business.name,
        description: business.description,
        email: business.email,
        contact: business.contact,
        address: business.address,
        location: business.location,
      },
      keyProducts: sortedProducts.map((product) => ({
        productName: product.productName,
        count: product.count,
        products: product.products,
      })),
      allProducts: business.products,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  console.log(productId);
  try {
    // Find the business containing the product with the given productId
    const business = await Business.findOne({ "products._id": productId })
      .select("name contact email address location description products")
      .exec();

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Find the specific product details from the products array
    const product = business.products.find(
      (p) => p._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Construct the response object
    const response = {
      product: {
        productName: product.productName,
        productPrice: product.productPrice,
        productDescription: product.productDescription,
        productImage: product.productImage || [], // Default to empty array if no images
      },
      businessDetails: {
        name: business.name,
        contact: business.contact,
        email: business.email,
        address: business.address,
        location: business.location,
        description: business.description,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching product and business details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
 
export const createReviews = async (req, res) =>{
    try {
        const { productId, rating, comment } = req.body;
    
        const newReview = new Review({
          productId,
          rating,
          comment,
        });
    
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
      } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
      }
}

export const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
      }
}


export const deleteBusiness = async (req, res, next) => {
  const listing = await Business.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Business not found!"));
  }
  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, "You can only delete your own Business!"));
  // }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Business has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateBusiness = async (req, res, next) => {
  const listing = await Business.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Busin not found"));
  }
  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, "You can only update your own Business!"));
  // }
  try {
    const updatedListing = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getAllBusiness = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses', error });
  }
};