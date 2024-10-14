import Booking from "../models/Booking.model.js";

import { sendEmail } from "../utils/email.js";

export const createBooking = async (req, res, next) => {
  try {
    console.log("Received booking data:", req.body);

    const newBooking = await Booking.create(req.body);

    const { email, listingEmail,contactNumber, startDate,  endDate, numberOfPeople } = req.body;


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
