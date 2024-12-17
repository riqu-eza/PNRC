// PropertyForm.jsx
import { useState } from "react";
import AddressForm from "./AddressForm";
import HoursForm from "./HoursForm";
import CategoryForm from "./CategoryForm";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const PropertyForm = () => {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  const [propertyData, setPropertyData] = useState({
    name: "",
    email: "",
    description: "",
    contact: "",
    amenities: "",
    imageUrls: [],
    category: [],
    hours: [],
    address: {
      street: "",
      city: "",
      location: {
        address: "",
        lat: "",
        lng: "",
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + propertyData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setPropertyData({
            ...propertyData,
            imageUrls: propertyData.imageUrls.concat(urls),
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
    setPropertyData({
      ...propertyData,
      imageUrls: propertyData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(propertyData);
    const amenitiesArray = propertyData.amenities
      .split(",")
      .map((amenity) => amenity.trim());

    const finalData = {
      ...propertyData,
      amenities: amenitiesArray, // Now store as an array
    };
    console.log("final",finalData);
    try {
      setUploading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...finalData,
        }),
      });

      console.log("Response received from server:", res);
      const data = await res.json();
      console.log("Data received from server:", data);

      if (data.success === false) {
        console.log("Error from server:", data.message);
      } else {
        console.log("Listing created successfully");

        // Resetting propertyData to initial state
        setPropertyData({
          name: "",
          email: "",
          description: "",
          contact: "",
          imageUrls: [], // Resetting array to empty
          category: [], // Resetting array to empty
          hours: [], // Resetting array to empty
          address: {
            street: "",
            city: "",
            location: {
              address: "",
              lat: "", // Resetting to an empty string
              lng: "", // Resetting to an empty string
            },
          },
        });
      }
    } catch (err) {
      console.error("Error occurred:", err); // Log errors for debugging
    }
  };

  const handleHoursUpdate = (newHours) => {
    setPropertyData((prevData) => ({
      ...prevData,
      hours: newHours, // Updates the hours array
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Property Information</h2>

      <input
        type="text"
        name="name"
        placeholder="Property Name"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="amenities"
        placeholder="amenities(separeted with `,`)"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p>Add images</p>

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
        <p className="text-red-700 text-sm">
          {imageUploadError && imageUploadError}
        </p>
      </div>
      {propertyData.imageUrls.length > 0 &&
        propertyData.imageUrls.map((url, index) => (
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
      <AddressForm
        address={propertyData.address}
        setAddress={setPropertyData}
      />
      <HoursForm hours={propertyData.hours} setHours={handleHoursUpdate} />
      <CategoryForm
        setCategories={(categories) =>
          setPropertyData((prev) => ({ ...prev, category: categories }))
        }
      />

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
