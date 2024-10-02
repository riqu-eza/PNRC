import React from 'react';

const Categoryform = ({ formData, handleChange }) => {
    return (
        <>
            {formData.category === "Accommodation" && (
                <div>
                    <h3>Accommodation Details</h3>

                    <div>
                        <h3>Rooms</h3>

                        {/* Display Added Room Names with Remove Option */}
                        {formData.details.accommodation.rooms.length > 0 &&
                            formData.details.accommodation.rooms.map((room, index) => (
                                <div
                                    key={`room-${index}`}
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
                                <p className="font-semibold">Image:</p>
                                <div className="flex gap-4">
                                    <input
                                        onChange={(e) =>
                                            setRoomFiles(Array.from(e.target.files))
                                        }
                                        className="p-3 border border-gray-300 rounded w-full"
                                        type="file"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                    />
                                    <button
                                        disabled={uploading}
                                        type="button"
                                        onClick={() => handleImageSubmit("room")}
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
                            }
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
        </>
    );
};

export default Categoryform;
