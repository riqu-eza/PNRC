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
        console.log("sent data", city)
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

// export const getBusinessesByCounty = async (req, res) => {
//     try {
//         const city = req.query.name;
//         const selectedCounty = city;
//         console.log(selectedCounty)

//         // Query businesses by selectedCounty and populate the category fields
//         const businesses = await Business.find({ selectedCounty })
//             .populate('category.selectedCategory')
//             .populate('category.selectedSubcategory');
//             console.log()

//         // Group by categories and subcategories within the selected county
//         const groupedData = {};
        
//         businesses.forEach((business) => {
//             const { selectedCategory, selectedSubcategory } = business.category;
//             if (!groupedData[selectedCategory]) {
//                 groupedData[selectedCategory] = {};
//             }
//             if (!groupedData[selectedCategory][selectedSubcategory]) {
//                 groupedData[selectedCategory][selectedSubcategory] = [];
//             }
//             groupedData[selectedCategory][selectedSubcategory].push(business);
//         });

//         res.json(groupedData);
//         console.log(groupedData)
//     } catch (err) {
//         console.error('Error fetching businesses:', err);
//         res.status(500).json({ error: 'Failed to fetch businesses' });
//     }
// };

export const getBusinessesByCounty = async (req, res) => {
    try {
        const city = req.query.name;
        const selectedCounty = city;

        // Query businesses by selectedCounty and populate the category fields
        const businesses = await Business.find({ selectedCounty })
            .populate('category.selectedCategory')
            .populate('category.selectedSubcategory');

        // Initialize counts
        let businessCount = 0;
        let productCount = 0;
        let totalProductViews = 0;

        // Group by categories and subcategories within the selected county
        const groupedData = {};

        businesses.forEach((business) => {
            const { selectedCategory, selectedSubcategory } = business.category;

            // Increment business count
            businessCount++;

            // Initialize subcategory if not exists
            if (!groupedData[selectedCategory]) {
                groupedData[selectedCategory] = {};
            }
            if (!groupedData[selectedCategory][selectedSubcategory]) {
                groupedData[selectedCategory][selectedSubcategory] = {
                    businesses: [],
                    productCount: 0,
                    totalProductViews: 0
                };
            }

            // Push business into the subgroup
            groupedData[selectedCategory][selectedSubcategory].businesses.push(business);

            // Count products and aggregate product views
            business.products.forEach((product) => {
                productCount++;
                totalProductViews += product.views;
            });

            // Update subgroup counts
            groupedData[selectedCategory][selectedSubcategory].productCount += business.products.length;
            groupedData[selectedCategory][selectedSubcategory].totalProductViews += totalProductViews;
        });

        // Prepare response data with counts
        const responseData = {
            businessCount,
            productCount,
            totalProductViews,
            groupedData
        };

        // Send response
        res.json(responseData);
        console.log(responseData);
    } catch (err) {
        console.error('Error fetching businesses:', err);
        res.status(500).json({ error: 'Failed to fetch businesses' });
    }
};

export const getBusinessById = async (req, res, next) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId).populate('products');

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Collect all products and count their occurrences
        const productCount = {};
        business.products.forEach(product => {
            if (!productCount[product.productName]) {
                productCount[product.productName] = { count: 0, products: [] };
            }
            productCount[product.productName].count++;
            productCount[product.productName].products.push(product);
        });

        // Determine key products based on frequency
        const sortedProducts = Object.keys(productCount)
            .map(key => ({ productName: key, ...productCount[key] }))
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
            keyProducts: sortedProducts.map(product => ({
                productName: product.productName,
                count: product.count,
                products: product.products,
            })),
            allProducts: business.products
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching business:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
