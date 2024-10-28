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

const CinemaForm = ({ details, setDetails }) => {
  const [movieTitle, setMovieTitle] = useState(details.movieTitle || "");
  const [cinemaHall, setCinemaHall] = useState(details.cinemaHall || "");
  const [showtimes, setShowtimes] = useState(details.showtimes || []);
  const [ticketPrice, setTicketPrice] = useState(details.ticketPrice || "");
  const [duration, setDuration] = useState(details.duration || "");
  const [rating, setRating] = useState(details.rating || "");
  const [cinemaLocation, setCinemaLocation] = useState(
    details.cinemaLocation || ""
  );
  const [availableSeats, setAvailableSeats] = useState(
    details.availableSeats || ""
  );

  // State for storing cinema entries
  const [cinemaEntries, setCinemaEntries] = useState([]);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Reset form with new details if props change
  useEffect(() => {
    setMovieTitle(details.movieTitle || "");
    setCinemaHall(details.cinemaHall || "");
    setShowtimes(details.showtimes || []);
    setTicketPrice(details.ticketPrice || "");
    setDuration(details.duration || "");
    setRating(details.rating || "");
    setCinemaLocation(details.cinemaLocation || "");
    setAvailableSeats(details.availableSeats || "");
  }, [details]);

  const handleAddShowtime = () => {
    const newShowtime = prompt("Enter Showtime (e.g., '1:00 PM'):");
    if (newShowtime) {
      setShowtimes((prevShowtimes) => [...prevShowtimes, newShowtime]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newEntry = {
      movieTitle,
      cinemaHall,
      showtimes,
      ticketPrice,
      duration,
      rating,
      cinemaLocation,
      availableSeats,
      imageUrls
    };

    setCinemaEntries((prevEntries) => [...prevEntries, newEntry]); // Save entry locally
    setDetails((prevEntries) => [...prevEntries, newEntry]); // Update parent details

    // Clear form fields
    setMovieTitle("");
    setCinemaHall("");
    setShowtimes([]);
    setTicketPrice("");
    setDuration("");
    setRating("");
    setCinemaLocation("");
    setAvailableSeats("");
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
          setFiles([]); // Clear selected files after upload
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
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
        placeholder="Movie Title"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      {/* Other input fields */}

      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Save Cinema Details
      </button>

      {/* Display saved entries */}
      <div className="mt-4">
        <h6 className="font-semibold">Saved Cinema Entries:</h6>
        <ul>
          {cinemaEntries.map((entry, index) => (
            <li key={index} className="border p-2 mb-2">
              <strong>{entry.movieTitle}</strong> at {entry.cinemaHall}
              {/* Render other details */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CinemaForm;
