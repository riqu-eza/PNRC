import Order from "../models/mealorder.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { sendEmail } from "../utils/email.js";
import { generateQRCode } from "../utils/Qrcode.js";

const getDirname = () => {
  return path.dirname(new URL(import.meta.url).pathname);
};
export const createBookingmeal = async (req, res, next) => {
  try {
    console.log("Received order data:", req.body);
    const newBooking = await Order.create(req.body);

    const {
      firstName,
      lastName,
      email,
      paymentMethod,
      mealCount,
      totalPrice,
      mealname,
    } = req.body;

    // Generate QR Code
    const bookingUrl = `http://localhost:3000/api/booking/getmeal/${newBooking._id}`; // Replace with your frontend URL
    const qrCodeDataUrl = await generateQRCode(bookingUrl);

    const receiptsDir = path.resolve(getDirname(), "../Receipts");
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir);
    }

    // Generate PDF Receipt
    const pdfFilePath = path.join(receiptsDir, `${newBooking._id}-receipt.pdf`);
    console.log(`PDF will be saved to: ${pdfFilePath}`);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfFilePath));
    doc.fontSize(20).text("Booking Receipt", { align: "center" }).moveDown();
    doc.fontSize(14).text(`Dear ${firstName} ${lastName},`);
    doc.text(`Meal Name: ${mealname}`);
    doc.text(`Meal Count: ${mealCount}`);
    doc.text(`Total Price: $${totalPrice}`);
    doc.text(`Payment Method: ${paymentMethod}`);
    doc.moveDown();

    const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
    doc.image(qrCodeBuffer, {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });
    doc.end();

    // Email Content with Inline QR Code and Download Link for PDF
    const emailBody = `
<div style="font-family: Arial, sans-serif; background-color: #d1d1d1; padding: 20px; border-radius: 8px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
    <h1>Welcome to </h1>
        <h2 style="color: #333; text-align: center;">Dear ${firstName},</h2>
        <p style="font-size: 16px; color: #555;">Thank you for your booking! Here are your meal details:</p>
        <ul style="list-style-type: none; padding: 0; color: #444;">
            <li style="margin-bottom: 10px;">
                <strong style="color: #333;">Meal Name:</strong> ${mealname}
            </li>
            <li style="margin-bottom: 10px;">
                <strong style="color: #333;">Meal Count:</strong> ${mealCount}
            </li>
            <li style="margin-bottom: 10px;">
                <strong style="color: #333;">Total Price:</strong> $${totalPrice}
            </li>
            <li style="margin-bottom: 20px;">
                <strong style="color: #333;">Payment Method:</strong> ${paymentMethod}
            </li>
        </ul>
        <div style="text-align: center;">
            <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 120px; height: 120px; margin-top: 20px; border-radius: 8px; border: 1px solid #ddd;" />
        </div>
       
        <p style="font-size: 14px; color: #777; text-align: center;">If you have any questions, feel free to contact us!</p>
        <p style="font-size: 14px; color: #333; text-align: center;">Best regards,<br> Palmnazi-RC</p>
    </div>
</div>

      `;
    const attachments = [
      {
        filename: `${newBooking._id}-receipt.pdf`,
        path: pdfFilePath, // Path to the PDF
      },
    ];
    await sendEmail(email, "Booking Confirmation", emailBody, attachments);

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

export const getmeal = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    // Retrieve booking by ID
    const booking = await Order.findById(bookingId);

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
