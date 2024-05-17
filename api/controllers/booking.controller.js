import Booking from "../models/Booking.model.js";
import { sendEmail } from "../utils/email.js";

export const createBooking = async (req, res, next) => {
  try {
    console.log("Received booking data:", req.body);

    const newBooking = await Booking.create(req.body);

    const { userEmail, listingEmail, arrivalDate, departureDate, numberOfPeople } = req.body;


    const emailBody = `
    Dear User,

    Your booking details:
    Arrival Date: ${arrivalDate}
    Departure Date: ${departureDate}
    Number of People: ${numberOfPeople}

    Thank you for your booking.

    Best regards,
    Your Company
  `;

  await sendEmail(listingEmail, "New Booking", emailBody);

  
  await sendEmail(userEmail, "Booking Confirmation", emailBody);

    return res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
