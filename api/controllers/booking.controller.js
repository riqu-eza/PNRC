import Booking from "../models/Booking.model.js";
import Order from "../models/mealorder.model.js";

import { sendEmail } from "../utils/email.js";

export const createBookingroom = async (req, res, next) => {
  try {
    console.log("Received booking data:", req.body);

    const newBooking = await Booking.create(req.body);

    const {
      email,
      listingEmail,
      contactNumber,
      startDate,
      endDate,
      numberOfPeople,
    } = req.body;

    const emailBody = `
    Dear friend, <br><br><br>

    Your booking details:<br>
    Arrival Date: ${startDate} <br>
    Departure Date: ${endDate} <br>
    Number of People: ${numberOfPeople}<br>
    Thank you for your booking. <br><br><br>

    Best regards, <br>
    Palmnazi-RC, <br>
  `;

    await sendEmail(listingEmail, "New Booking", emailBody);

    await sendEmail(email, "Booking Confirmation", emailBody);

    return res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

export const createBookingmeal = async (req, res, next) => {
  try {
    console.log("Received order data:", req.body);

    const newBooking = await Order.create(req.body);

    const {
      firstName,
      lastName,
      email,
      contact,
      paymentMethod,
      mealCount,
      totalPrice,
      mealname,
    } = req.body;

    const emailBody = `
    <div style="font-family: Arial, sans-serif;">
        <h2>Dear ${firstName},</h2>
        <p>Your booking details:</p>
        <ul>
            <li><strong>Meal Name:</strong> ${mealname}</li>
            <li><strong>Meal Count:</strong> ${mealCount}</li>
            <li><strong>Total Price:</strong> $${totalPrice}</li>
            <li><strong>Payment Method:</strong> ${paymentMethod}</li>
        </ul>
        <p>Thank you for your booking!</p>
        <p>Best regards,<br> Palmnazi-RC</p>
    </div>
 `;

    await sendEmail(email, "Booking Confirmation", emailBody);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};
