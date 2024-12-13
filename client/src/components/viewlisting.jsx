import { useState, useEffect } from "react";

const ViewListing = () => {
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    contact: "",
    selectedCategory: "",
    selectedSubcategory: "",
    location: "",
    selectedCounty: "",
    address: "",
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
    username: "vicky",
  });

  // Fetch listings
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch("/api/listing/getall");
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };

  // Delete a listing
  const handleDeleteListing = async (id) => {
    try {
      await fetch(`/api/listing/delete/${id}`, {
        method: 'DELETE',
      });
      setListings(listings.filter(listing => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing", error);
    }
  };

  // Start editing a listing
  const startEditing = (listing) => {
    setEditingListing(listing._id);
    setFormData({ ...listing });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingListing(null);
    setFormData({
      name: "",
      description: "",
      email: "",
      contact: "",
      selectedCategory: "",
      selectedSubcategory: "",
      location: "",
      selectedCounty: "",
      address: "",
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
      username: "vicky",
    });
  };

  // Update a listing
  const handleUpdateListing = async (id) => {
    try {
      const response = await fetch(`/api/listing/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setEditingListing(null);
        fetchListings(); // Fetch updated list
      } else {
        console.error("Error updating listing", response.statusText);
      }
    } catch (error) {
      console.error("Error updating listing", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard - Manage Listings</h1>
      {listings.length === 0 ? (
        <p className="text-center text-gray-600">No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {editingListing === listing._id ? (
                <div className="p-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Name"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Description"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Contact"
                  />
                  <input
                    type="text"
                    name="selectedCategory"
                    value={formData.selectedCategory}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    name="selectedSubcategory"
                    value={formData.selectedSubcategory}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Subcategory"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    name="selectedCounty"
                    value={formData.selectedCounty}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="County"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="openinghour"
                    value={formData.openinghour}
                    onChange={handleChange}
                    className="border p-2 rounded mb-4 w-full"
                    placeholder="Opening Hour"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Bedrooms"
                    />
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Bathrooms"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="number"
                      name="regularPrice"
                      value={formData.regularPrice}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Regular Price"
                    />
                    <input
                      type="number"
                      name="discountedPrice"
                      value={formData.discountedPrice}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Discounted Price"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="offer"
                        checked={formData.offer}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Offer
                    </label>
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="parking"
                        checked={formData.parking}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Parking
                    </label>
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="furnished"
                        checked={formData.furnished}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Furnished
                    </label>
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="recreation"
                        checked={formData.recreation}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Recreation
                    </label>
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="eventfacilities"
                        checked={formData.eventfacilities}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Event Facilities
                    </label>
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="security"
                        checked={formData.security}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Security
                    </label>
                    <label className="block mb-2">
                      <input
                        type="checkbox"
                        name="transportation"
                        checked={formData.transportation}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Transportation
                    </label>
                  </div>
                  <div className="mb-4">
                    <input
                      type="number"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder="Rooms"
                    />
                  </div>
                  <button
                    onClick={() => handleUpdateListing(listing._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{listing.name}</h2>
                  {/* <p className="text-gray-700 mb-2">{listing.description}</p> */}
                  <p className="text-gray-700 mb-2">Email: {listing.email}</p>
                  <p className="text-gray-700 mb-2">Contact: {listing.contact}</p>
                  <p className="text-gray-700 mb-2">Category: {listing.selectedCategory}</p>
                  <p className="text-gray-700 mb-2">Subcategory: {listing.selectedSubcategory}</p>
                  <p className="text-gray-700 mb-2">Location: {listing.location}</p>
                  <p className="text-gray-700 mb-2">County: {listing.selectedCounty}</p>
                  <p className="text-gray-700 mb-2">Address: {listing.address}</p>
                  <p className="text-gray-700 mb-2">Opening Hour: {listing.openinghour}</p>
                  <p className="text-gray-700 mb-2">Bedrooms: {listing.bedrooms}</p>
                  <p className="text-gray-700 mb-2">Bathrooms: {listing.bathrooms}</p>
                  <p className="text-gray-700 mb-2">Regular Price: {listing.regularPrice}</p>
                  <p className="text-gray-700 mb-2">Discounted Price: {listing.discountedPrice}</p>
                  <p className="text-gray-700 mb-2">Offer: {listing.offer ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Parking: {listing.parking ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Furnished: {listing.furnished ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Recreation: {listing.recreation ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Event Facilities: {listing.eventfacilities ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Security: {listing.security ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Transportation: {listing.transportation ? "Yes" : "No"}</p>
                  <p className="text-gray-700 mb-2">Rooms: {listing.rooms}</p>
                  <button
                    onClick={() => startEditing(listing)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewListing;
