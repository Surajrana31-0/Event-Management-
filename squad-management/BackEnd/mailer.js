const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // e.g., "your@gmail.com"
    pass: process.env.EMAIL_PASS        // your app password or SMTP password
  }
});

module.exports = transporter;
