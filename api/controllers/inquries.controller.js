import Inquiry from "../models/inquries.model.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vickymuthunga@gmail.com",
    pass: "Vicky,03muthunga,",
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "your_email@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    return res.status(201).json(inquiry);
  } catch (error) {
    console.error("Error handling inquiry:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
