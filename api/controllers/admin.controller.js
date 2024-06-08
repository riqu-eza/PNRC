import admin from "../models/admin.model.js";
import City from "../models/city.model.js";

export const createCountyimg = async (req, res, next) => {
  try {
    // console.log("Received request body:", req.body);
    // console.log("Received files:", req.files);

    const newcountyimage = await admin.create(req.body);
    return res.status(201).json(newcountyimage);
  } catch (error) {
    console.error("Error in createCountyimg controller:", error);

    next(error);
  }
};
// export const createCity = async (req, res, next) =>{
//   try {
//     console.log(req.body)
//     const newcity = await City.create(req.body)
//     return res.status(201).json(newcity)
//   } catch (error) {

//   }
// }

export const createCity = async (req, res, next) => {
  try {
    const { newCity, username } = req.body;

    console.log("city:", newCity, "user:", username);
    console.log("Received request body:", req.body);

   

    const newCityEntry = new City({ newcity: newCity, username: username });
    const savedCity = await newCityEntry.save();

    return res.status(201).json(savedCity);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const duplicatedCityName = error.keyValue.newcity;
      return res
        .status(400)
        .json({ error: `City "${duplicatedCityName}" already exists` });
    }
    console.error("Error in createCity controller:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find();
    return res.json(cities);
  } catch (error) {
    console.error("Error in getAllCities controller:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const countyimage = async (req, res, next) => {
  try {
    const { county } = req.query;

    // Fetch the entire county data from the database
    const countyData = await admin.findOne({ selectedCounty: county });

    if (!countyData) {
      // If no county data is found, send a 404 response
      return res.status(404).json({ message: "County not found" });
    }

    // Send the entire county data as the response
    res.json(countyData);
  } catch (error) {
    console.error("Error fetching county data:", error);
    next(error);
  }
};
