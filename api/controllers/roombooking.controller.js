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
    doc
      .fontSize(20)
      .text("Room Booking Receipt", { align: "center" })
      .moveDown();
    doc.fontSize(14).text(`Dear ${firstName} ${lastName},`);
    doc.text(`Arrival Date: ${startDate}`);
    doc.text(`Departure Date: ${endDate}`);
    doc.text(`Number of People: ${numberOfPeople}`);
    doc.moveDown();

    // Convert QR Code Data URL to Buffer
    const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
    doc.image(qrCodeBuffer, {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });
    doc.end();

    // Email Content with Inline QR Code and Download Link for PDF
    const emailBody = `
    <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #c9c5c5; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="padding: 20px;">
                <h2 style="font-family: Arial, sans-serif; color: #333;">Dear ${firstName},</h2>
                <p style="font-family: Arial, sans-serif; color: #555;">Your booking details:</p>
                <ul style="list-style-type: none; padding: 0; color: #444;">
                  <li><strong>Arrival Date:</strong> ${startDate}</li>
                  <li><strong>Departure Date:</strong> ${endDate}</li>
                  <li><strong>Number of People:</strong> ${numberOfPeople}</li>
                </ul>
                <p style="font-family: Arial, sans-serif; color: #555;">Thank you for your booking!</p>
                <div style="text-align: center; margin-top: 20px;">
                  <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 100px; height: 100px; margin-top: 20px; border: 1px solid #ddd; border-radius: 5px;" />
                </div>
                <p style="margin-top: 20px; font-family: Arial, sans-serif;">
                  <a href="http://localhost:3000/receipts/${newBooking._id}-receipt.pdf" style="color: #008cba; text-decoration: none; font-weight: bold;">Download Receipt (PDF)</a>
                </p>
                <p style="font-family: Arial, sans-serif; color: #333;">Best regards,<br> Palmnazi-RC</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
    const attachments = [
      {
        filename: `${newBooking._id}-receipt.pdf`,
        path: pdfFilePath, // Path to the PDF
      },
    ];
    await sendEmail(listingEmail, "New Booking", emailBody,  attachments);
    await sendEmail(email, "Booking Confirmation", emailBody ,attachments);

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


