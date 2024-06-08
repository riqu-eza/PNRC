import Business from "../models/business.model.js";


export const createBusiness = async (req, res, next) => {
    try {
        const business = await Business.create(req.body);
        return res.status(201).json(business);
    } catch (error) {
        next(error);
    }
};