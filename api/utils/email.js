import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vickymuthunga@gmail.com",
    pass: "phao chdg beqx cgla",
  },
});

export const sendEmail = async (to, subject, content, attachments, options = {}) => {
  try {
    const mailOptions = {
      from: "vickymuthunga@gmail.com",
      to: to,
      subject: subject,
      html: content,
      attachments: attachments,
      // Add these new fields
      replyTo: options.replyTo || "vickymuthunga@gmail.com",
      headers: {
        ...options.headers,
        'X-Booking-ID': options.bookingId || ''
      }
    };

    if (options.cc) {
      mailOptions.cc = options.cc;
    }

    if (options.inReplyTo) {
      mailOptions.headers = {
        ...mailOptions.headers,
        'In-Reply-To': options.inReplyTo,
        'References': options.inReplyTo
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};