import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import ReactPhoneInput from "react-phone-input-2";

import { getCountryCallingCode } from "libphonenumber-js";
import "react-phone-input-2/lib/style.css";

export default function CreateListing() {
  // const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [hovered, setHovered] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    email: "",
    contact: "",
    selectedCategory: "",
    selectedSubcategory: "",
    location: "",
    selectedCounty: "",
    inputValue: "",
    address: "",
    type: "rent",
    openinghour: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    recreation: false,
    eventfacilities: false,
    security: false,
    transportation: false,
    rooms: 1,
  });
  //console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          setImageUploadError("Image upload fail (2 mb max per image)");
          setUploading(false);
        });
    } else if (files.length === 0) {
      setImageUploadError("Select images to upload");
      setUploading(false);
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageref = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageref, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`The progress is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleLocationChange = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newLocation = {
          ...formData,
          location: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
        };
        setFormData(newLocation);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  useEffect(() => {
    fetchCounties();
  }, []);

  const [countiesInKenya, setCounties] = useState([]);
  const fetchCounties = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/cities");
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setCounties(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  // const countiesInKenya = [
  //   "Mombasa",
  //   "Malindi",
  //   "Watamu",
  //   "Lamu",
  //   "Diani"
  // ];

  const handleCountyChange = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      selectedCounty: value,
    }));
  };
  const categoriesData = {
    Relaxation: [
      "Spa & Wellness Centers",
      "Yoga Studios",
      "Meditation Centers",
      "Parks & Gardens",
      "Beaches",
      "Lakes & Rivers",
      "Picnic Areas",
      "Hot Springs",
    ],

    Accommodation: [
      "Hotels",
      "Resorts",
      "Motels",
      "Bed & Breakfast",
      "Inns",
      "Guest Houses",
      "Hotels",
      "Vacation Rentals",
      "Camping Sites",
    ],
    Dining: [
      "Restaurants",
      "Cafes & Coffee Shops",
      "Bakeries",
      "Bars & Pubs",
      "Food Trucks",
      "Fine Dining Restaurants",
      "Ethnic Cuisine Restaurants",
      "Fast Food Chains",
    ],
    Entertainment: [
      "Movie Theaters",
      "Concert Halls",
      "Live Music Venues",
      "Night Clubs",
      "Bowling Alleys",
      "Arcahdes",
      "Amusement Parks",
      "Casinos",
      "Golf Courses",
    ],
    Culture_and_Historicalsites: [
      "Museums",
      "Art Galleries",
      "Historic Landmarks",
      "Monuments",
      "Archaelogical Sites",
      "Cultural Sites",
      "Heritage Sites",
      "Religious plsces of interest",
    ],
    Shopping: [
      "Shopping Malls",
      "Boutiques",
      "Markets",
      "Antique Stores",
      "Souvenir Shops",
      "Department stores",
      "Outlet Stores",
      "Speciality Stores",
    ],
    Education_and_Learning: [
      "Libraries",
      "Bookstores",
      "Education Centers",
      "Art Schools",
      "Cooking Schools",
      "Language Schools",
      "Workshops & Classes",
    ],
    Health_and_Fitness: [
      "Sport Clubs",
      "Swimming Pools",
      "Martial arts Studios",
      "Dance Studio",
      "Rock Climbing Gyms",
      "Cycling Tracks",
      "Running Tracks",
    ],
    Services: [
      "Spar & massage centers",
      "Hair Salons",
      "Nail Salons",
      "Dry Cleaners",
      "Pet Groomers",
      "Car Washes",
      "Post Offices",
      "Banks and ATMS",
      "Medical Centers",
    ],
  };

  const handleCategoryChange = (category) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedCategory: category,
    }));
  };

  const handleSubcategoryChange = (subcategory) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedSubcategory: subcategory,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountedPrice)
        return setError("Discount price must be greater than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,

          // userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      setFormData({
        imageUrls: [],
        name: "",
        description: "",
        email: "",
        contact: "",
        selectedCategory: "",
        selectedSubcategory: "",
        location: "",
        selectedCounty: "",
        inputValue: "",
        address: "",
        type: "rent",
        openinghour: "",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
        recreation: false,
        eventfacilities: false,
        security: false,
        transportation: false,
        rooms: 1,
      });
      // navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          {/* <PhoneInput
          id="contact"
          placeholder="Enter phone number"
          value={formData.contact}
          onChange={handleChange}
          defaultCountry="UG" 
          >

          </PhoneInput> */}
          <input
            type="number"
            placeholder="Contact"
            className="border p-3 rounded-lg"
            id="contact"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.contact}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div>
            <select
              value={formData.selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">Select Category</option>
              {Object.keys(categoriesData).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {formData.selectedCategory && (
              <div>
                <select
                  value={formData.selectedSubcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {categoriesData[formData.selectedCategory]?.map(
                    (subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "uploading" : "upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <div className="relative">
            <button type="button" onClick={handleLocationChange}>
              Pin location
            </button>
          </div>
          <h3>Amenities Available:</h3>

          <div className="flex gap-6 flex-wrap">
            {/* <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div> */}
            {/* <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div> */}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking === true}
              />
              <span>Parking Area</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="recreation"
                className="w-5"
                onChange={handleChange}
                value={formData.recreation === true}
              />
              <span>Recreational Facilities</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="eventfacilities"
                className="w-5"
                onChange={handleChange}
                value={formData.eventfacilities === true}
              />
              <span>Event Facilities</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="transportationServices"
                className="w-5"
                onChange={handleChange}
                value={formData.transportation === true}
              />
              <span>Transportation Services</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="security"
                className="w-5"
                onChange={handleChange}
                value={formData.security === true}
              />
              <span>Security Survailance</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished === true}
              />
              <span>Accomodation</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer === true}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            {formData.furnished && (
              <div className="flex">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="rooms"
                    min="1"
                    max="5"
                    required
                    className="p-3 border border-gray-300 rounded-lg w-16"
                    onChange={handleChange}
                    value={formData.rooms}
                  />
                  <p>rooms</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border border-gray-300 rounded-lg w-16"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                  <p>Beds</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="5"
                    required
                    className="p-3 border border-gray-300 rounded-lg w-16"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <p>Baths</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg w-16"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(Ksh/night)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-16"
                  onChange={handleChange}
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">(Ksh / night)</span>
                </div>
              </div>
            )}
          </div>

          <div className="county-selector">
            <select
              value={formData.selectedCounty}
              onChange={handleCountyChange}
            >
              <option value="">Select</option>
              {countiesInKenya.map((county, index) => (
                <option key={index} value={county.newcity}>
                  {county.newcity}
                </option>
              ))}
            </select>
            {/* <p>Selected County: {selectedCounty}</p> */}
          </div>

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
