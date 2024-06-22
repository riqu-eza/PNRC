import mongoose from "mongoose";
import axios from "axios";
import Listing from "../models/listing.model.js";


const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
const location = '1.2921,36.8219'; // Nairobi coordinates
const radius = 5000; // in meters
const types = ['restaurant', 'hotel', 'lodging' ,'Relaxation', ' Accommodation', 'Dining', 'Entertainment', ' Culture_and_Historicalsites', 'Shopping', 'Education_and_Learning', 'Health_and_Fitness', 'Services']; // Types of places to fetch

export const fetchPlaces = async () => {
  for (const type of types) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const places = response.data.results;

      places.forEach(async (place) => {
        const existingPlace = await Listing.findOne({ name: place.name, address: place.vicinity });

        if (!existingPlace) {
          const newPlace = new Listing({
            imageUrls: place.photos ? place.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`) : [],
            name: place.name,
            description: type,
            email: '', // No email provided by Places API
            contact: '', // No contact provided by Places API
            selectedCategory: type,
            selectedSubcategory: '', // Subcategory can be derived if needed
            location: `${place.geometry.location.lat},${place.geometry.location.lng}`,
            address: place.vicinity,
            type: 'rent', // Assuming rent as default
            username: 'admin', // Default or fetched from a config
            regularPrice: 0, // Default or fetched from other sources
          });

          await newPlace.save();
        }
      });
    } catch (error) {
      console.error(`Failed to fetch ${type} places:`, error);
    }
  }
};

// fetchPlaces().then(() => {
//   console.log('Data fetched and stored.');
//   mongoose.connection.close();
// }).catch(error => {
//   console.error('Error fetching data:', error);
//   mongoose.connection.close();
// });
