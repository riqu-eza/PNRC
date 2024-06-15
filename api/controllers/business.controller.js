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

export const getBusinessesByCounty = async (req, res) => {
    try {
        const city = req.query.name;
        const selectedCounty = city;
        console.log(selectedCounty)

        // Query businesses by selectedCounty and populate the category fields
        const businesses = await Business.find({ selectedCounty })
            .populate('category.selectedCategory')
            .populate('category.selectedSubcategory');
            console.log()

        // Group by categories and subcategories within the selected county
        const groupedData = {};
        
        businesses.forEach((business) => {
            const { selectedCategory, selectedSubcategory } = business.category;
            if (!groupedData[selectedCategory]) {
                groupedData[selectedCategory] = {};
            }
            if (!groupedData[selectedCategory][selectedSubcategory]) {
                groupedData[selectedCategory][selectedSubcategory] = [];
            }
            groupedData[selectedCategory][selectedSubcategory].push(business);
        });

        res.json(groupedData);
        console.log(groupedData)
    } catch (err) {
        console.error('Error fetching businesses:', err);
        res.status(500).json({ error: 'Failed to fetch businesses' });
    }
};

export const getBusinessById = async (req, res, next) => {
    try {
        const businessId = req.params.id;
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.status(200).json(business);
    } catch (error) {
        console.error('Error fetching business:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};