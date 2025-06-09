import Booking from "../models/Booking.model.js";
import PDFDocument from "pdfkit";
import { sendEmail } from "../utils/email.js";
import { generateQRCode } from "../utils/Qrcode.js";
import Receipt from "../models/receipts.model.js";

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
    const bookingUrl = `${req.protocol}://${req.get("host")}/api/booking/getroom/${newBooking._id}`;
    const qrCodeDataUrl = await generateQRCode(bookingUrl);

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      bufferPages: false,
    });

    const pdfChunks = [];
    doc.on("data", (chunk) => pdfChunks.push(chunk));
    
    let pdfBuffer;
    await new Promise((resolve) => {
      doc.on("end", () => {
        pdfBuffer = Buffer.concat(pdfChunks);
        resolve();
      });

      // Sky blue color scheme
      const primaryColor = "#87CEEB";
      const secondaryColor = "#4682B4";
      const darkColor = "#333333";
      const lightColor = "#F8F9FA";

      // Header with background
      doc.rect(0, 0, doc.page.width, 95).fill(primaryColor);

      doc
        .fillColor("#FFFFFF")
        .fontSize(24)
        .text("PALMNAZI RESORTS CITIES", 50, 30)
        .fontSize(14)
        .text("Booking Confirmation", 50, 60);

      // Booking ID and Date
      doc
        .fillColor(darkColor)
        .fontSize(10)
        .text(`Booking ID: ${newBooking._id}`, doc.page.width - 200, 55)
        .text(
          `Date: ${new Date().toLocaleDateString()}`,
          doc.page.width - 200,
          doc.y
        );

      // Guest Information Section
      const guestInfoY = 120;
      doc
        .moveTo(50, guestInfoY)
        .lineTo(doc.page.width - 50, guestInfoY)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("GUEST INFORMATION", 50, guestInfoY + 10)
        .moveDown(0.5);

      doc
        .fillColor(darkColor)
        .fontSize(12)
        .text(`Name: ${firstName} ${lastName}`, 70, doc.y)
        .text(`Email: ${email}`, 70, doc.y + 10)
        .moveDown(1);

      // Property Information Section
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("PROPERTY INFORMATION", 50, doc.y + 10)
        .moveDown(0.5);

      doc
        .fillColor(darkColor)
        .fontSize(12)
        .text(`Property: ${listingName}`, 70, doc.y)
        .moveDown(1);

      // Booking Details Section
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("BOOKING DETAILS", 50, doc.y + 10)
        .moveDown(0.5);

      // Create and draw booking details table
      const bookingDetails = [
        {
          label: "Check-in Date",
          value: new Date(startDate).toLocaleDateString(),
        },
        {
          label: "Check-out Date",
          value: new Date(endDate).toLocaleDateString(),
        },
        { label: "Number of Guests", value: numberOfPeople },
        { label: "Booking Status", value: "To be Confirmed" },
        { label: "Booking Date", value: new Date().toLocaleDateString() },
      ];

      const tableStartY = doc.y;
      const col1 = 50;
      const col2 = 250;
      const rowHeight = 20;

      bookingDetails.forEach((detail, i) => {
        const y = tableStartY + i * rowHeight;

        if (i % 2 === 0) {
          doc.rect(col1, y, col2 - col1, rowHeight).fill(lightColor);
        }

        doc
          .fillColor(darkColor)
          .fontSize(12)
          .text(detail.label, col1 + 10, y + 5)
          .text(detail.value, col2 + 10, y + 5);
      });

      // Position QR code with proper spacing
      const qrCodeSize = 150;
      const qrCodeY = Math.max(doc.y + 30, 400); // Ensure minimum space
      const qrCodeX = (doc.page.width - qrCodeSize) / 2;

      doc
        .fillColor(secondaryColor)
        .fontSize(14)
        .text("YOUR BOOKING QR CODE", { align: "center" })
        .moveDown(0.5);

      const qrCodeBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
      doc.image(qrCodeBuffer, {
        fit: [qrCodeSize, qrCodeSize],
        x: qrCodeX,
        y: qrCodeY,
      });

      doc
        .fillColor("#666666")
        .fontSize(10)
        .text("Present this QR code at check-in", { align: "center" })
        .moveDown(1);

      // Footer
      const footerHeight = 60;
      const footerY = doc.page.height - footerHeight;

      doc
        .rect(0, footerY, doc.page.width, footerHeight)
        .fill(primaryColor)
        .fillColor("#FFFFFF")
        .fontSize(10)
        .text("Palmnazi Resort Cities", 50, footerY + 15)
        .text("4th Floor Palmnazi-rc Plaza, Nairobi, Kenya", 50, footerY + 30)
        .text(
          "Phone: +254 794 369 806 | Email: info@palmnazi_rc.com",
          50,
          footerY + 45
        )
        .text("Thank you for choosing us!", doc.page.width - 200, footerY + 30, {
          align: "right",
        });

      doc.end();
    });

    // Save receipt to database
    const newReceipt = await Receipt.create({
      bookingId: newBooking._id,
      pdfBuffer,
      qrCodeDataUrl,
    });

    // Rest of your email sending code...
    const hotelEmailBody = `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #FF6B6B; padding: 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;"> PALMNAZI RESORT CITIES </h1>
        </div>
        
        <h2 style="color: #333; border-bottom: 2px solid #4ECDC4; padding-bottom: 10px;">New Booking Notification</h2>
        
        <p style="font-size: 16px; color: #555;">Dear ${listingName} Management,</p>
        <p style="font-size: 16px; color: #555;">You have received a new booking from ${firstName} ${lastName}:</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #FF6B6B; margin-top: 0;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Guest Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Dates:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${startDate} to ${endDate}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Number of Guests:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${numberOfPeople}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Guest Email:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${email}</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; color: #555;">Please confirm this booking by replying to this email.</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0;">Note: When you reply, your response will go directly to the guest with our system in copy.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #999; text-align: center;"> Palmnazi Resort Cities • Nairobi, Kenya<br>Phone: +254 794 369 806 • Email: info@palmnazi_rc.com</p>
        </div>
    </div>
</div>
`;

const clientEmailBody = `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #FF6B6B; padding: 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;">PALMNAZI RESORT CITIES</h1>
        </div>
        
        <h2 style="color: #333; border-bottom: 2px solid #4ECDC4; padding-bottom: 10px;">Booking Confirmation</h2>
        
        <p style="font-size: 16px; color: #555;">Dear ${firstName} ${lastName},</p>
        <p style="font-size: 16px; color: #555;">Thank you for booking with ${listingName}. Here are your booking details:</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #FF6B6B; margin-top: 0;">Booking Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Property:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${listingName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Dates:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${startDate} to ${endDate}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Number of Guests:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${numberOfPeople}</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; color: #555;">We've notified ${listingName} about your booking. They will confirm shortly.</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0;">Note: When the hotel replies, you'll receive their response directly.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #999; text-align: center;"> Palmnazi Resort Cities • Nairobi, Kenya<br>Phone: +254 794 369 806 • Email: info@palmnazi_rc.com</p>
        </div>
    </div>
</div>
`;

    const attachments = [
      {
        filename: `${newBooking._id}-receipt.pdf`,
        content: pdfBuffer
      },
    ];

    // Send to Hotel with client email in reply-to
    const hotelMessageId = await sendEmail(
      listingEmail,
      `New Booking: ${firstName} ${lastName} - ${startDate} to ${endDate}`,
      hotelEmailBody,
      attachments,
      {
        replyTo: email,
        cc: "vickymuthunga@gmail.com",
        bookingId: newBooking._id.toString(),
      }
    );

    // Send to Client with hotel email in reply-to
    await sendEmail(
      email,
      `Booking Confirmation: ${listingName}`,
      clientEmailBody,
      attachments,
      {
        replyTo: listingEmail,
        cc: "vickymuthunga@gmail.com",
        inReplyTo: hotelMessageId,
        bookingId: newBooking._id.toString(),
      }
    );

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    next(error);
  }
};

// Rest of your controller methods...

export const getReceipt = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    // Find receipt by bookingId
    const receipt = await Receipt.findOne({ bookingId }).populate("bookingId");

    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }

    // Set appropriate headers for PDF download
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${receipt.bookingId._id}-receipt.pdf`,
      "Content-Length": receipt.pdfBuffer.length,
    });

    // Send the PDF buffer
    res.send(receipt.pdfBuffer);
  } catch (error) {
    console.error("Error fetching receipt:", error);
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
