import EntertainmentOrder from "../models/Entertainmentorder.model.js";
import Receipt from "../models/receipts.model.js";
import PDFDocument from "pdfkit";
import { sendEmail } from "../utils/email.js";
import { generateQRCode } from "../utils/Qrcode.js";


export const createBookingEntertainment = async (req, res, next) => {
  try {
    console.log("Received order data:", req.body);
    const newBooking = await EntertainmentOrder.create(req.body);

    const {
      firstName,
      lastName,
      email,
      contact,
      ticketCount,
      totalPrice,
      eventName,
      listingEmail,
      listingName,
      listingAddress,
      eventType,
      eventTime,
      venue
    } = req.body;

    // Generate QR Code as a Data URL
    const bookingUrl = `${req.protocol}://${req.get("host")}/api/booking/getevent/${newBooking._id}`;
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

      // Color scheme
      const primaryColor = "#4A6FA5"; // Blue color for event theme
      const secondaryColor = "#FF9F1C"; // Orange accent
      const darkColor = "#333333";
      const lightColor = "#F8F9FA";

      // Header with background
      doc.rect(0, 0, doc.page.width, 95).fill(primaryColor);

      doc
        .fillColor("#FFFFFF")
        .fontSize(24)
        .text("PALMNAZI RESORT CITIES", 50, 30)
        .fontSize(14)
        .text("Event Ticket Confirmation", 50, 60);

      // Order ID and Date
      doc
        .fillColor(darkColor)
        .fontSize(10)
        .text(`Order ID: ${newBooking._id}`, doc.page.width - 200, 55)
        .text(
          `Date: ${new Date().toLocaleDateString()}`,
          doc.page.width - 200,
          doc.y
        );

      // Customer Information Section
      const customerInfoY = 120;
      doc
        .moveTo(50, customerInfoY)
        .lineTo(doc.page.width - 50, customerInfoY)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("CUSTOMER INFORMATION", 50, customerInfoY + 10)
        .moveDown(0.5);

      doc
        .fillColor(darkColor)
        .fontSize(12)
        .text(`Name: ${firstName} ${lastName}`, 70, doc.y)
        .text(`Email: ${email}`, 70, doc.y + 10)
        .text(`Phone: ${contact}`, 70, doc.y + 20)
        .moveDown(1);

      // Event Information Section
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("EVENT INFORMATION", 50, doc.y + 10)
        .moveDown(0.5);

      doc
        .fillColor(darkColor)
        .fontSize(12)
        .text(`Event: ${eventName}`, 70, doc.y)
        .text(`Type: ${eventType}`, 70, doc.y + 10)
        .text(`Venue: ${venue}`, 70, doc.y + 10)
        .text(`Time: ${eventTime}`, 70, doc.y + 10)
        .moveDown(1);

      // Order Details Section
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("ORDER DETAILS", 50, doc.y + 10)
        .moveDown(0.5);

      // Create and draw order details table
      const orderDetails = [
        { label: "Event Name", value: eventName },
        { label: "Tickets", value: ticketCount },
        { label: "Total Price", value: `KES ${totalPrice}` },
        { label: "Order Date", value: new Date().toLocaleDateString() },
        { label: "Venue", value: venue },
      ];

      const tableStartY = doc.y;
      const col1 = 50;
      const col2 = 250;
      const rowHeight = 20;

      orderDetails.forEach((detail, i) => {
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
        .text("YOUR EVENT TICKET QR CODE", { align: "center" })
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
        .text("Present this QR code for event entry", { align: "center" })
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
          "Phone: +254 794 369 806 | Email: info@palmnazi.com",
          50,
          footerY + 45
        )
        .text("Enjoy the event!", doc.page.width - 200, footerY + 30, {
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

    // Email Content with Inline QR Code and Download Link for PDF
    const organizerEmailBody = `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4A6FA5; padding: 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;">PALMNAZI RESORT CITIES</h1>
        </div>
        
        <h2 style="color: #333; border-bottom: 2px solid #FF9F1C; padding-bottom: 10px;">New Event Booking Notification</h2>
        
        <p style="font-size: 16px; color: #555;">Dear Event Organizer,</p>
        <p style="font-size: 16px; color: #555;">You have received a new ticket booking from ${firstName} ${lastName}:</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4A6FA5; margin-top: 0;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Customer Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Event:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${eventName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tickets:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${ticketCount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Price:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">KES ${totalPrice}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Event Time:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${eventTime}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Customer Email:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${email}</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; color: #555;">Please prepare for this booking. The customer will present their QR code for entry.</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0;">Note: When you reply, your response will go directly to the customer with our system in copy.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #999; text-align: center;">Palmnazi Resort Cities • 4th Floor Palmnazi-rc Plaza, Nairobi, Kenya<br>Phone: +254 794 369 806 • Email: info@palmnazi_rc.com
        </div>
    </div>
</div>
`;

    // Email Content for Customer
    const customerEmailBody = `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4A6FA5; padding: 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;">PALMNAZI RESORT CITIES</h1>
        </div>
        
        <h2 style="color: #333; border-bottom: 2px solid #FF9F1C; padding-bottom: 10px;">Your Event Ticket Confirmation</h2>
        
        <p style="font-size: 16px; color: #555;">Dear ${firstName},</p>
        <p style="font-size: 16px; color: #555;">Thank you for your booking! Here are your event details:</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4A6FA5; margin-top: 0;">Booking Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Event Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${eventName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Event Type:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${eventType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tickets:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${ticketCount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Price:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">KES ${totalPrice}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Event Time:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${eventTime}</td>
                </tr>
            </table>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Present this QR code for event entry:</p>
            <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 150px; height: 150px; border: 1px solid #ddd; border-radius: 8px;" />
        </div>
        
        
        
        <p style="font-size: 16px; color: #555;">We look forward to seeing you at the event!</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0;">Your ticket is attached to this email. If you have any questions about your booking, please reply to this email.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #999; text-align: center;">Palmnazi Resort Cities • 4th Floor Palmnazi-rc Plaza, Nairobi, Kenya<br>Phone: +254 794 369 806 • Email: info@palmnazi_rc.com
        </div>
    </div>
</div>
`;

    const attachments = [
      {
        filename: `${newBooking._id}-ticket.pdf`,
        content: pdfBuffer,
      },
    ];

    // Send to Organizer with customer email in reply-to
    const organizerMessageId = await sendEmail(
      listingEmail,
      `New Event Booking: ${firstName} ${lastName} - ${eventName}`,
      organizerEmailBody,
      attachments,
      {
        replyTo: email,
        cc: "vickymuthunga@gmail.com",
        bookingId: newBooking._id.toString(),
      }
    );

    // Send to Customer with organizer email in reply-to
    await sendEmail(
      email,
      `Event Booking Confirmation: ${eventName}`,
      customerEmailBody,
      attachments,
      {
        replyTo: listingEmail,
        cc: "vickymuthunga@gmail.com",
        inReplyTo: organizerMessageId,
        bookingId: newBooking._id.toString(),
      }
    );

    return res.status(201).json({
      success: true,
      message: "Event booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error creating event booking:", error);
    next(error);
  }
};

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