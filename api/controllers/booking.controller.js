import Booking from "../models/Booking.model.js";

import { sendEmail } from "../utils/email.js";

export const createBooking = async (req, res, next) => {
  try {
    console.log("Received booking data:", req.body);

    const newBooking = await Booking.create(req.body);

    const { userEmail, listingEmail, arrivalDate, departureDate, numberOfPeople } = req.body;


    const emailBody = `
    Dear friend, <br><br><br>

    Your booking details:<br>
    Arrival Date: ${arrivalDate} <br>
    Departure Date: ${departureDate} <br>
    Number of People: ${numberOfPeople}<br>
    Thank you for your booking. <br><br><br>

    Best regards, <br>
    Palmnazi-RC, <br>
  `;

  await sendEmail(listingEmail, "New Booking", emailBody);

  
  await sendEmail(userEmail, "Booking Confirmation", emailBody);

    return res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
