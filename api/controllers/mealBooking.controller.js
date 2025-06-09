import Order from "../models/mealorder.model.js";
import PDFDocument from "pdfkit";
import { sendEmail } from "../utils/email.js";
import { generateQRCode } from "../utils/Qrcode.js";
import Receipt from "../models/receipts.model.js";

export const createBookingmeal = async (req, res, next) => {
  try {
    console.log("Received order data:", req.body);
    const newBooking = await Order.create(req.body);

    const {
      firstName,
      lastName,
      email,
      mealCount,
      orderType,
      totalPrice,
      mealname,
      restaurantEmail,
    } = req.body;

    // Generate QR Code as a Data URL
    const bookingUrl = `${req.protocol}://${req.get("host")}/api/booking/getmeal/${newBooking._id}`;
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
      const primaryColor = "#FF6B6B"; // Reddish color for food theme
      const secondaryColor = "#4ECDC4"; // Teal accent
      const darkColor = "#333333";
      const lightColor = "#F8F9FA";

      // Header with background
      doc.rect(0, 0, doc.page.width, 95).fill(primaryColor);

      doc
        .fillColor("#FFFFFF")
        .fontSize(24)
        .text("PALMNAZI RESORT CITIES", 50, 30)
        .fontSize(14)
        .text("Meal Order Confirmation", 50, 60);

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
        .moveDown(1);

      // Meal Information Section
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .stroke(secondaryColor)
        .fillColor(secondaryColor)
        .fontSize(16)
        .text("MEAL INFORMATION", 50, doc.y + 10)
        .moveDown(0.5);

      doc
        .fillColor(darkColor)
        .fontSize(12)
        .text(`Meal: ${mealname}`, 70, doc.y)
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
        { label: "Meal Name", value: mealname },
        { label: "Quantity", value: mealCount },
        { label: "Total Price", value: `$${totalPrice}` },
        { label: "Order Date", value: new Date().toLocaleDateString() },
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
        .text("YOUR ORDER QR CODE", { align: "center" })
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
        .text("Present this QR code to collect your meal", { align: "center" })
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
        .text("Enjoy your meal!", doc.page.width - 200, footerY + 30, {
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
     const restaurantEmailBody = `
<div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #FF6B6B; padding: 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;">PALMNAZI RESORT CITIES</h1>
        </div>
        
        <h2 style="color: #333; border-bottom: 2px solid #4ECDC4; padding-bottom: 10px;">New Meal Order Notification</h2>
        
        <p style="font-size: 16px; color: #555;">Dear Restaurant Team,</p>
        <p style="font-size: 16px; color: #555;">You have received a new meal order from ${firstName} ${lastName}:</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #FF6B6B; margin-top: 0;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Customer Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Meal:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${mealname}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Quantity:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${mealCount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Price:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">$${totalPrice}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Customer Email:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${email}</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; color: #555;">Please prepare this order for the customer.</p>
        
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
        <div style="background-color: #FF6B6B; padding: 20px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
            <h1 style="color: white; text-align: center; margin: 0;">PALMNAZI RESORT CITIES</h1>
        </div>
        
        <h2 style="color: #333; border-bottom: 2px solid #4ECDC4; padding-bottom: 10px;">Your Meal Order Confirmation</h2>
        
        <p style="font-size: 16px; color: #555;">Dear ${firstName},</p>
        <p style="font-size: 16px; color: #555;">Thank you for your order! Here are your meal details:</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #FF6B6B; margin-top: 0;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Meal Name:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${mealname}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Quantity:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${mealCount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Total Price:</strong></td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">$${totalPrice}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Order Type:</strong></td>
                    <td style="padding: 8px 0; text-align: right;">${orderType}</td>
                </tr>
            </table>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Present this QR code to collect your meal:</p>
            <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 150px; height: 150px; border: 1px solid #ddd; border-radius: 8px;" />
        </div>
        
        <p style="font-size: 16px; color: #555;">Your order is being prepared. Please present this QR code when collecting your meal.</p>
        
        <div style="background-color: #F8F9FA; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 14px; color: #666; margin: 0;">Your receipt is attached to this email. If you have any questions about your order, please reply to this email.</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #999; text-align: center;">Palmnazi Resort Cities  • 4th Floor Palmnazi-rc Plaza, Nairobi, Kenya<br>Phone: +254 794 369 806 • Email: info@palmnazi_rc.com
        </div>
    </div>
</div>
`;

    const attachments = [
      {
        filename: `${newBooking._id}-receipt.pdf`,
        content: pdfBuffer,
      },
    ];

    // Send to Restaurant with customer email in reply-to
    const restaurantMessageId = await sendEmail(
      restaurantEmail,
      `New Meal Order: ${firstName} ${lastName} - ${mealname}`,
      restaurantEmailBody,
      attachments,
      {
        replyTo: email,
        cc: "vickymuthunga@gmail.com",
        bookingId: newBooking._id.toString(),
      }
    );

    // Send to Customer with restaurant email in reply-to
    await sendEmail(
      email,
      `Meal Order Confirmation: ${mealname}`,
      customerEmailBody,
      attachments,
      {
        replyTo: restaurantEmail,
        cc: "vickymuthunga@gmail.com",
        inReplyTo: restaurantMessageId,
        bookingId: newBooking._id.toString(),
      }
    );

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
