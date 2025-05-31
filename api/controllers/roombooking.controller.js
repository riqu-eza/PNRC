import Booking from "../models/Booking.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { sendEmail } from "../utils/email.js";
import { generateQRCode } from "../utils/Qrcode.js";

const getDirname = () => {
  return path.dirname(new URL(import.meta.url).pathname);
};
export const createBookingroom = async (req, res, next) => {
  try {
    console.log("Received booking data:", req.body);
    const newBooking = await Booking.create(req.body);

    const {
      firstName,
      lastName,
      email,
      listingEmail,
      startDate,
      endDate,
      numberOfPeople,
      listingName,
    } = req.body;

    // Generate QR Code as a Data URL
    const bookingUrl = `http://localhost:3000/api/booking/getroom${newBooking._id}`;
    const qrCodeDataUrl = await generateQRCode(bookingUrl);

    // Ensure the 'receipts' directory exists
    const receiptsDir = path.resolve(getDirname(), "../Receipts");
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir);
    }

    // Generate PDF Receipt with QR Code
    const pdfFilePath = path.join(receiptsDir, `${newBooking._id}-receipt.pdf`);
    console.log(`PDF will be saved to: ${pdfFilePath}`);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfFilePath));

    // Title
    doc
    .fontSize(24)
    .fillColor('#333')
    .text("Hotel Booking Receipt", { align: "center", underline: true })
    .moveDown(1.5);

  // Subheading with Greeting
  doc
    .fontSize(18)
    .fillColor('#666')
    .text(`Dear ${firstName} ${lastName},`, { align: "left" })
    .moveDown(1);

  // Introduction Text
  doc
    .fontSize(14)
    .fillColor('#333')
    .text("Thank you for choosing us for your stay. Below are the details of your booking:", { align: "left" })
    .moveDown(1);

  // Booking Details
  doc
    .fontSize(16)
    .fillColor('#333')
    .text("Booking Details", { underline: true })
    .moveDown(0.5);

  // Details Table
  const details = [
    { label: "Arrival Date:", value: startDate },
    { label: "Departure Date:", value: endDate },
    { label: "Number of People:", value: numberOfPeople },
  ];
  
  // Set up table-like layout for details
  details.forEach((item) => {
    doc
      .fontSize(14)
      .fillColor('#555')
      .text(item.label, { continued: true })
      .fillColor('#000')
      .text(` ${item.value}`)
      .moveDown(0.5);
  });

    // Footer Section
   


    // Convert QR Code Data URL to Buffer
    const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
    doc.image(qrCodeBuffer, {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });
    doc
    .fontSize(12)
    .fillColor("#666")
    .text(
      "Thank you for choosing us! We look forward to making your stay comfortable and memorable.",
      { align: "center" }
    )
    .moveDown(2);

  doc
    .fontSize(10)
    .fillColor("#999")
    .text(
      "Palmnazi-RC | Palmnazi Plaza, Nairobi, Kenya | Phone: +254 794369806",
      { align: "center" }
    )
    .moveDown(0.5);

   
    doc.end();

    // Email Content with Inline QR Code and Download Link for PDF
    const hotelEmailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Booking Notification</h2>
        <p>Dear ${listingName} Management,</p>
        <p>You have received a new booking from ${firstName} ${lastName}:</p>
        <ul>
          <li><strong>Dates:</strong> ${startDate} to ${endDate}</li>
          <li><strong>Guests:</strong> ${numberOfPeople}</li>
          <li><strong>Guest Email:</strong> ${email}</li>
        </ul>
        <p>Please confirm this booking by replying to this email.</p>
        <p style="color: #666; font-size: 0.9em;">
          Note: When you reply, your response will go directly to the guest with our system in copy.
        </p>
      </div>
    `;

    // Email to Client
    const clientEmailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Booking Received</h2>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for booking with ${listingName}. Your booking details:</p>
        <ul>
          <li><strong>Dates:</strong> ${startDate} to ${endDate}</li>
          <li><strong>Guests:</strong> ${numberOfPeople}</li>
        </ul>
        <p>We've notified ${listingName} about your booking. They will confirm shortly.</p>
        <p style="color: #666; font-size: 0.9em;">
          Note: When the hotel replies, you'll receive their response directly.
        </p>
      </div>
    `;

    const attachments = [
      {
        filename: `${newBooking._id}-receipt.pdf`,
        path: pdfFilePath,
      },
    ];

    // Send to Hotel with client email in reply-to
    const hotelMessageId = await sendEmail(
      listingEmail,
      `New Booking: ${firstName} ${lastName} - ${startDate} to ${endDate}`,
      hotelEmailBody,
      attachments,
      {
        replyTo: email, // Replies will go to client
        cc: "vickymuthunga@gmail.com", // You get a copy
        bookingId: newBooking._id.toString()
      }
    );

    // Send to Client with hotel email in reply-to
    await sendEmail(
      email,
      `Booking Confirmation: ${listingName}`,
      clientEmailBody,
      attachments,
      {
        replyTo: listingEmail, // Replies will go to hotel
        cc: "vickymuthunga@gmail.com", // You get a copy
        inReplyTo: hotelMessageId, // Thread the conversation
        bookingId: newBooking._id.toString()
      }
    );


    return res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    next(error);
  }
};
export const getroom = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    // Retrieve booking by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Serve booking details (can be rendered in frontend or used in a PDF template)
    res.status(200).json({
      message: "Booking details retrieved successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Error retrieving booking details" });
  }
};
