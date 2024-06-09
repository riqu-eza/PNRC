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