import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import "react-phone-input-2/lib/style.css";
import { useUser } from "../components/Adminuser";

export default function CreateBusinessListing() {
  const [files, setFiles] = useState([]);

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
  const { username } = useUser("");
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
    const { id, type, checked, value } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [id]: checked });
    } else if (type === "number" || type === "text" || type === "textarea") {
      setFormData({ ...formData, [id]: value });
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



  const handleCountyChange = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      selectedCounty: value,
    }));
  };
  const categoriesData = {
    "Retail": [
      "Clothing Stores",
      "Electronics Retailers",
      "Furniture Shops",
      "Bookstores",
      "Toy Stores",
      "Jewelry Stores",
      "Home Goods Stores",
      "Cosmetics & Beauty Shops",
      "Sporting Goods Stores",
      "Specialty Boutiques"
    ],
    "Automotive": [
      "Car Dealerships",
      "Auto Repair Shops",
      "Tire Shops",
      "Car Washes",
      "Auto Body Shops",
      "Car Rental Agencies",
      "Oil Change Services",
      "Towing Companies",
      "Auto Detailing Services",
      "Windshield Repair Services"
    ],
    "Education & Training": [
      "Schools (Elementary, Middle, High)",
      "Tutoring Services",
      "Language Schools",
      "Test Preparation Centers",
      "Music Schools",
      "Dance Schools",
      "Art Classes",
      "Vocational Training Centers",
      "Driving Schools",
      "Online Learning Platforms"
    ],
    "Manufacturing & Industrial": [
      "Manufacturing Plants",
      "Machine Shops",
      "Fabrication Workshops",
      "Packaging Companies",
      "Metal Foundries",
      "Textile Mills",
      "Chemical Processing Plants",
      "Food Processing Facilities",
      "Printing Companies",
      "Automotive Assembly Plants"
    ],
    "Environmental Services": [
      "Environmental Consulting Firms",
      "Waste Management Companies",
      "Recycling Centers",
      "Environmental Testing Laboratories",
      "Hazardous Material Cleanup Services",
      "Environmental Education Centers",
      "Sustainable Energy Providers",
      "Ecotourism Companies",
      "Wildlife Rehabilitation Centers",
      "Organic Farming Cooperatives"
    ]
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
      const res = await fetch("http://localhost:3000/api/business/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          username: username
        }

        ),
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
        productdescription:"",
        productName:"",
        productprice:"",

      });
      // navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  console.log(formData)


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
            minLength="5"
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
          <div className="county-selector">
            <select
              value={formData.selectedCounty}
              onChange={handleCountyChange}
            >
              <option value="">Select resort-city</option>
              {countiesInKenya.map((county, index) => (
                <option key={index} value={county.newcity}>
                  {county.newcity}
                </option>
              ))}
            </select>
            {/* <p>Selected County: {selectedCounty}</p> */}
          </div>
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
        <input

            onChange={handleChange}
            value={formData.productName}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Product Name"
          type="text"
          id="productName"
        />
        <textarea
            onChange={handleChange}
            value={formData.productdescription}
            className="p-3 border border-gray-300 rounded w-full"
            placeholder="Product description"
            id="productdescription"
          />
          <input
            onChange={handleChange}
            value={formData.productprice}
            className="p-3 border border-gray-300 rounded w-full"
            placeholder="Product price"
            type="number"
            id="productprice"

          />
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



          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
        {/* <div className="flex flex-col gap-4 flex-1">
          <textarea
            onChange={(e) => setProductName(e.target.value)}
            value={formData.productName}
            className="p-3 border border-gray-300 rounded w-full"
            placeholder="Product Name"
          />
          <div className="flex gap-4 items-center">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="hidden"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <label
              htmlFor="images"
              className="p-3 border border-gray-300 rounded cursor-pointer"
            >
              Choose Product Image
            </label>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
              ))}
          </div>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={formData.productprice}
            className="p-3 border border-gray-300 rounded w-full"
            type="number"
            placeholder="Price"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={formData.productdescription}
            className="p-3 border border-gray-300 rounded w-full"
            placeholder="Product Description"
          />
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-black rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div> */}

      </form>
    </main>
  );
}
