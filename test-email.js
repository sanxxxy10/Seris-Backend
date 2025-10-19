import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendTestEmail = async () => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email from Seris Backend",
      text: "If you received this, email works!",
    });
    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};

sendTestEmail();
