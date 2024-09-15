/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import categories from "../utility/CategoryData";
import { useSelector } from "react-redux";
import { useUser } from "../components/Adminuser";
import InputField from "../utility/inputfield";
import MapComponent from "../utility/MapComponent";
import { app } from "../firebase";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const CreateListing = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { username } = useUser("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    description: "",
    amenities: "",
    imageUrls: [],
    address: {
      street: "",
      city: "",
      location: {
        address: "",
        lat: null,
        lng: null,
      },
    },
    category: "",
    subcategory: "",
    username: currentUser.username,
    details: {
      accommodation: {
        rooms: [
          {
            type: "",
            beds: "",
            price: "",
            discount: "",
            description: "",
            amenities: [],
            imageUrls: [],
          },
        ],
        check_in_time: "",
        check_out_time: "",
        amenities: [],
      },
      dining: {
        meals: [{ meal_id: "", name: "", description: "", price: "" }],
        operating_hours: { open: "", close: "" },
      },
      entertainment: {
        activities: [{ activity_id: "", name: "", description: "", price: "" }],
      },
      education: {
        classes: [
          {
            class_id: "",
            name: "",
            subject: "",
            schedule: { day: "", time: "" },
          },
        ],
      },
      health_and_fitness: {
        services: [{ service_id: "", name: "", description: "", price: "" }],
      },
    },
  });
  const [rooms, setRooms] = useState(
    formData.details.accommodation.rooms || []
  );
  const [countiesInKenya, setCounties] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    type: "",
    beds: "",
    price: "",
    discount: "",
    description: "",
    amenities: "",
    imagesurl: [],
  });
  const handleRoomChange = (field, value) => {
    setCurrentRoom((prevRoom) => ({
      ...prevRoom,
      [field]: value,
    }));
  };
  const addRoom = () => {
    // Add the current room to the list of rooms and reset the form for the next room
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        accommodation: {
          ...prevData.details.accommodation,
          rooms: [...prevData.details.accommodation.rooms, currentRoom],
        },
      },
    }));

    // Clear the form fields for the next room input
    setCurrentRoom({
      type: "",
      beds: "",
      price: "",
      discount: "",
      description: "",
      amenities: "",
      imagesurl: [],
    });
  };
  useEffect(() => {
    fetchCounties();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); // Log when the submit button is clicked

    try {
      // Validation checks
      // if (formData.imageUrls.length < 1) {
      //     console.log("Validation failed: No images uploaded");
      //     return setError("You must upload at least one image");
      // }
      // if (+formData.regularPrice < +formData.discountedPrice) {
      //     console.log("Validation failed: Discount price is greater than regular price");
      //     return setError("Discount price must be greater than regular price");
      // }

      console.log("Validation passed. Sending request...");

      setLoading(true);
      setError(false);

      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          username: username,
        }),
      });

      console.log("Response received from server:", res);

      const data = await res.json();
      console.log("Data received from server:", data);

      setLoading(false);

      if (data.success === false) {
        console.log("Error from server:", data.message);
        setError(data.message);
      } else {
        console.log("Listing created successfully");
        // Optionally, navigate or perform other actions
        // navigate(`/listing/${data._id}`);
        // Clear the form if needed
        setFormData({
          name: "",
          email: "",
          description: "",
          contact: "",
          address: {
            street: "",
            city: "",
            postal_code: "",
            location: "",
          },
          category: "",
          subcategory: "",
          username: currentUser.username,
          details: {
            accommodation: {
              type: "",
              rooms: [{ room_id: "", type: "", size: "", amenities: [] }],
              check_in_time: "",
              check_out_time: "",
            },
            dining: {
              meals: [{ meal_id: "", name: "", description: "", price: "" }],
              operating_hours: { open: "", close: "" },
            },
            entertainment: {
              activities: [
                { activity_id: "", name: "", description: "", price: "" },
              ],
            },
            education: {
              classes: [
                {
                  class_id: "",
                  name: "",
                  subject: "",
                  schedule: { day: "", time: "" },
                },
              ],
            },
            health_and_fitness: {
              services: [
                { service_id: "", name: "", description: "", price: "" },
              ],
            },
          },
        });
      }
    } catch (error) {
      console.error("Error occurred:", error); // Log errors for debugging
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNestedChange = (section, field, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [section]: {
          ...prevData.details[section],
          [field]: value,
        },
      },
    }));
  };

  const removeRoom = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        accommodation: {
          ...prevData.details.accommodation,
          rooms: prevData.details.accommodation.rooms.filter(
            (room, i) => i !== index
          ),
        },
      },
    }));
  };

  const handleCountyChange = (e) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState, // Keep the entire formData object
      address: {
        ...prevState.address, // Keep all the existing fields in the address object
        city: value, // Update only the 'city' field
      },
    }));
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (category) => {
    setFormData((prevState) => ({
      ...prevState,
      category: category, // Update the category in formData
      subcategory: "", // Reset the subcategory when category changes
    }));
    setSelectedCategory(category); // Update the selectedCategory state
  };

  // Function to handle subcategory change
  const handleSubcategoryChange = (subcategory) => {
    setFormData((prevState) => ({
      ...prevState,
      subcategory: subcategory, // Update the subcategory in formData
    }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleLocationChange = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            ...formData,
            address: {
              ...formData.address,
              location: {
                address: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
          };
          setFormData(newLocation);
        },
        (error) => {
          // Handle errors
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  // image handling
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
 
  const handleImageSubmit = async (type, roomIndex = null) => {
    const maxImages = 6; // Assuming max 6 images per type
    const maxTotalImages = 100; // Assuming total limit
  
    // Ensure imageUrlsKey and currentImageUrls are properly set
    let imageUrlsKey;
    let currentImageUrls;
    
    if (type === 'listing') {
      imageUrlsKey = 'imageUrls';
      currentImageUrls = formData.imageUrls || [];
    } else {
      imageUrlsKey = `details.accommodation.rooms[${roomIndex}].imageUrls`;
      currentImageUrls = formData.details.accommodation.rooms[roomIndex]?.imageUrls || [];
    }
  
    // Validation
    if (files.length > 0 && files.length + currentImageUrls.length <= maxTotalImages) {
      if (currentImageUrls.length + files.length <= maxImages) {
        setUploading(true);
        setImageUploadError(false);
  
        const promises = files.map((file) => storeImage(file));
        try {
          const urls = await Promise.all(promises);
          const updatedFormData = { ...formData };
  
          if (type === 'listing') {
            updatedFormData.imageUrls = currentImageUrls.concat(urls);
          } else {
            updatedFormData.details.accommodation.rooms[roomIndex].imageUrls = currentImageUrls.concat(urls);
          }
  
          setFormData(updatedFormData);
          setImageUploadError(false);
        } catch (err) {
          setImageUploadError("Image upload failed (2 MB max per image)");
        } finally {
          setUploading(false);
        }
      } else {
        setImageUploadError(`You can only upload ${maxImages} images per ${type}`);
        setUploading(false);
      }
    } else if (files.length === 0) {
      setImageUploadError("Select images to upload");
      setUploading(false);
    } else {
      setImageUploadError(`You can only upload ${maxTotalImages} images in total`);
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

  return (
    <form>
      <h2>collecting Property Details</h2>
      {/* common details */}
      {step === 1 && (
        <div>
          <div>
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputField
              label="Contact"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputField
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <div>
              <p className="font-semibold">
                add the Property Image:
                <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover 
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
            </div>
          </div>
          <button
            className="p-3 bg-blue-500 w-20 text-white rounded-lg"
            onClick={handleNextStep}
            // Disable continue if name is empty
          >
            Continue
          </button>
        </div>
      )}
      {/* address */}
      {step === 2 && (
        <>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Address</h3>

            <div className="mb-4">
              <InputField
                label="Street"
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              {/* Conditional rendering based on loading and data */}
              {loading ? (
                <p>Loading counties...</p>
              ) : countiesInKenya.length > 0 ? (
                <select
                  onChange={handleCountyChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select resort-city</option>
                  {countiesInKenya.map((county, index) => (
                    <option key={index} value={county.newcity}>
                      {county.newcity}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No counties available</p>
              )}
            </div>

            <button type="button" onClick={handleLocationChange}>
              Pin location
            </button>
          </div>
          <div className="flex gap-4 justify-evenly mt-8 ">
            <button
              className="p-3 bg-gray-500 text-white rounded-lg"
              onClick={handlePreviousStep}
            >
              Back
            </button>
            <button
              className="p-3 bg-blue-500 text-white rounded-lg"
              onClick={handleNextStep}
              // Disable continue if email is empty
            >
              Continue
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div>
            <div>
              <label>Category:</label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Selector (only visible if a category is selected) */}
            {formData.category && (
              <div>
                <label>Subcategory:</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {categories[formData.category].map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="flex gap-4 justify-evenly mt-8 ">
            <button
              className="p-3 bg-gray-500 text-white rounded-lg"
              onClick={handlePreviousStep}
            >
              Back
            </button>
            <button
              className="p-3 bg-blue-500 text-white rounded-lg"
              onClick={handleNextStep}
              // Disable continue if email is empty
            >
              Continue
            </button>
          </div>
        </>
      )}
      {/* Accommodation Section */}
      {step === 4 && (
        <>
          {formData.category === "Accommodation" && (
            <div>
              <h3>Accommodation Details</h3>

              <div>
                <h3>Rooms</h3>

                {/* Display Added Room Names with Remove Option */}
                {formData.details.accommodation.rooms.length > 1 &&
                  formData.details.accommodation.rooms.map((room, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <p>
                        Room {index + 1}: {room.type}
                      </p>
                      <button
                        type="button"
                        className="p-2 bg-red-500 text-white rounded-lg"
                        onClick={() => removeRoom(index)}
                      >
                        Remove Room
                      </button>
                    </div>
                  ))}

                {/* Room Input Form */}
                <div className="room-details">
                  <h4>New Room</h4>

                  <InputField
                    label="Name of the Room"
                    type="text"
                    name="type"
                    value={currentRoom.type}
                    onChange={(e) => handleRoomChange("type", e.target.value)}
                  />

                  <InputField
                    label="Describe the Room"
                    type="text"
                    name="description"
                    value={currentRoom.description}
                    onChange={(e) =>
                      handleRoomChange("description", e.target.value)
                    }
                  />

                  <InputField
                    label="Number of Beds and Size"
                    type="text"
                    name="beds"
                    value={currentRoom.beds}
                    onChange={(e) => handleRoomChange("beds", e.target.value)}
                  />

                  <InputField
                    label="Room Price Per Night"
                    type="text"
                    name="price"
                    value={currentRoom.price}
                    onChange={(e) => handleRoomChange("price", e.target.value)}
                  />

                  <InputField
                    label="Discount (if any)"
                    type="text"
                    name="discount"
                    value={currentRoom.discount}
                    onChange={(e) =>
                      handleRoomChange("discount", e.target.value)
                    }
                  />

                  <label>Amenities (comma-separated)</label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    name="amenities"
                    value={currentRoom.amenities}
                    onChange={(e) =>
                      handleRoomChange(
                        "amenities",
                        e.target.value.split(",").map((item) => item.trim())
                      )
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      Image:
                      {/* <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span> */}
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
                        // eslint-disable-next-line no-undef
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
                  </div>
                </div>

                {/* Button to Add Another Room */}
                <button
                  type="button"
                  className="mt-4 p-3 bg-blue-500 text-white rounded-lg"
                  onClick={addRoom}
                  disabled={
                    !currentRoom.type || !currentRoom.beds || !currentRoom.price
                  } // Basic validation
                >
                  Add Another Room
                </button>
              </div>
              <InputField
                label="Check-in Time"
                type="text"
                name="accommodation.check_in_time"
                value={formData.details.accommodation.check_in_time}
                onChange={(e) =>
                  handleNestedChange("accommodation", "check_in_time", e)
                }
              />
              <InputField
                label="Check-out Time"
                type="text"
                name="accommodation.check_out_time"
                value={formData.details.accommodation.check_out_time}
                onChange={(e) =>
                  handleNestedChange("accommodation", "check_out_time", e)
                }
              />
              <label>Amenities In the Property(comma-separate)</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="accommodation.amenities"
                value={formData.details.accommodation.amenities}
                onChange={(e) =>
                  handleNestedChange("accommodation", "amenities", e)
                }
              />
            </div>
          )}
          {/* Dining Section */}
          {formData.category === "accomodation" && (
            <div>
              <h3>Dining Details</h3>
              {/* Similar structure as Accommodation */}
            </div>
          )}
          {/* Entertainment Section */}
          {formData.category === "accomodation" && (
            <div>
              <h3>Entertainment Details</h3>
            </div>
          )}
          {/* Education Section */}
          {formData.category === "accomodation" && (
            <div>
              <h3>Education Details</h3>
              {/* Similar structure as Accommodation */}
            </div>
          )}
          {/* Health and Fitness Section */}
          {formData.category === "accomodation" && (
            <div>
              <h3>Health and Fitness Details</h3>
              {/* Similar structure as Accommodation */}
            </div>
          )}
          <div className="flex gap-4 justify-evenly mt-8 ">
            <button
              className="p-3 bg-gray-500 text-white rounded-lg"
              onClick={handlePreviousStep}
            >
              Back
            </button>
            <button
              className="p-3 bg-blue-500 text-white rounded-lg"
              onClick={handleNextStep}
            >
              Continue
            </button>
          </div>
        </>
      )}
      {step === 5 && (
        <div className="text-center m-12">
          <h3 className="text-3xl m-8"> Submit</h3>

          <div>
            <button
              className="p-3 bg-gray-500 text-white rounded-lg"
              onClick={handlePreviousStep}
            >
              Back
            </button>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Submitting..." : "Create listing"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateListing;
