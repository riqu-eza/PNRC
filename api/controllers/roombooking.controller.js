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
      "Palmnazi-RC | 1234 Street Name, City, Country | Phone: +123 456 7890",
      { align: "center" }
    )
    .moveDown(0.5);

   
    doc.end();

    // Email Content with Inline QR Code and Download Link for PDF
    const emailBody = `
    <div style="width: 100%; background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">

    <!-- Header -->
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
      <h1 style="color: #333; font-size: 24px; font-weight: bold;">Welcome to ${listingName}</h1>
      <p style="color: #555; font-size: 16px;">Thank you for choosing to stay with us, ${firstName}!</p>
    </div>

    <!-- Booking Details -->
    <div style="padding: 20px 0;">
      <h2 style="font-size: 20px; color: #333; font-weight: bold; margin: 0;">Your Booking Details</h2>
      <p style="color: #666; font-size: 14px;">We're delighted to confirm your booking details:</p>
      <ul style="list-style: none; padding: 0; color: #444; font-size: 15px;">
        <li><strong>Arrival Date:</strong> ${startDate}</li>
        <li><strong>Departure Date:</strong> ${endDate}</li>
        <li><strong>Number of People:</strong> ${numberOfPeople}</li>
      </ul>
    </div>

    <!-- QR Code and Download Link -->
   

    <!-- Footer -->
    <div style="padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
      <p style="font-size: 14px; color: #666;">Best regards,</p>
      <p style="font-size: 14px; color: #333; font-weight: bold;">Palmnazi-RC</p>
      <p style="font-size: 12px; color: #999;">1234 Street Name, City, Country | Phone: +123 456 7890</p>
    </div>

  </div>
</div>

  `;
    const attachments = [
      {
        filename: `${newBooking._id}-receipt.pdf`,
        path: pdfFilePath, // Path to the PDF
      },
    ];
    await sendEmail(listingEmail, "New Booking", emailBody, attachments);
    await sendEmail(email, "Booking Confirmation", emailBody, attachments);

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
