import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vickymuthunga@gmail.com", 
    pass: "Vicky,03muthunga,", 
  },
});

export const sendEmail = async (to, subject, content) => {
  try {
    await transporter.sendMail({
      from: "vickymuthunga@gmail.com", 
      to: to, 
      subject: subject, 
      html: content, 
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
