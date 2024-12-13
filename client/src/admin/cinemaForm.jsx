/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CinemaForm = ({ details, setDetails, addItem }) => {
  // Combined state for all form inputs
  const [formData, setFormData] = useState({
    movieTitle: details.movieTitle || "",
    movieGenre: details.movieGenre || "",
    cinemaHall: details.cinemaHall || "",
    showtimes: details.showtimes || [],
    ticketPrice: details.ticketPrice || "",
    duration: details.duration || "",
    rating: details.rating || "",
    cinemaLocation: details.cinemaLocation || "",
    availableSeats: details.availableSeats || "",
  });

  // Other states
  const [cinemaEntries, setCinemaEntries] = useState([]);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Reset formData if details prop changes
  useEffect(() => {
    setFormData({
      movieTitle: details.movieTitle || "",
      movieGenre: details.movieGenre || "",
      cinemaHall: details.cinemaHall || "",
      showtimes: details.showtimes || [],
      ticketPrice: details.ticketPrice || "",
      duration: details.duration || "",
      rating: details.rating || "",
      cinemaLocation: details.cinemaLocation || "",
      availableSeats: details.availableSeats || "",
    });
  }, [details]);

  // Update formData on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleAddShowtime = () => {
  //   const newShowtime = prompt("Enter Showtime (e.g., '1:00 PM'):");
  //   if (newShowtime) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       showtimes: [...prevData.showtimes, newShowtime],
  //     }));
  //   }
  // };

  const handleSave = (e) => {
    e.preventDefault();

    const newEntry = { ...formData, imageUrls };
    setCinemaEntries((prevEntries) =>
      Array.isArray(prevEntries) ? [...prevEntries, newEntry] : [newEntry]
    );
  
    setDetails((prevEntries) =>
      Array.isArray(prevEntries) ? [...prevEntries, newEntry] : [newEntry]
    );

    addItem(newEntry);

    // Clear form fields
    setFormData({
      movieTitle: "",
      movieGenre: "",
      cinemaHall: "",
      showtimes: [],
      ticketPrice: "",
      duration: "",
      rating: "",
      cinemaLocation: "",
      availableSeats: "",
    });
    setImageUrls([]);
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      const promises = files.map((file) => storeImage(file));

      Promise.all(promises)
        .then((urls) => {
          setImageUrls((prev) => [...prev, ...urls]);
          setImageUploadError(false);
          setUploading(false);
          setFiles([]);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2MB max per image)");
          console.error(err);
          setUploading(false);
        });
    } else if (files.length === 0) {
      setImageUploadError("Please select images to upload");
      setUploading(false);
    } else {
      setImageUploadError("You can upload a maximum of 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress: ${progress}%`);
        },
        reject,
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border border-gray-300 rounded mt-4">
      <h5 className="text-md font-medium mb-2">Cinema Details</h5>

      <input
        type="text"
        name="movieTitle"
        value={formData.movieTitle}
        onChange={handleInputChange}
        placeholder="Movie Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="movieGenre"
        value={formData.movieGenre}
        onChange={handleInputChange}
        placeholder="Movie Genre"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="cinemaHall"
        value={formData.cinemaHall}
        onChange={handleInputChange}
        placeholder="Cinema Hall"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="ticketPrice"
        value={formData.ticketPrice}
        onChange={handleInputChange}
        placeholder="Ticket Price"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleInputChange}
        placeholder="Duration"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="rating"
        value={formData.rating}
        onChange={handleInputChange}
        placeholder="Rating (age)"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="cinemaLocation"
        value={formData.cinemaLocation}
        onChange={handleInputChange}
        placeholder="Cinema Location"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="availableSeats"
        value={formData.availableSeats}
        onChange={handleInputChange}
        placeholder="Available Seats"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="showtimes"
        value={formData.showtimes}
        onChange={handleInputChange}
        placeholder="show time(7:pm)"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Cinema Details
      </button>

      {/* Display saved entries */}
      <div className="mt-4">
        <h6 className="font-semibold">Saved Cinema Entries:</h6>
        <ul>
          {cinemaEntries.map((entry, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>{entry.movieTitle}</strong> at {entry.cinemaHall}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CinemaForm;
