var nodemailer = require("nodemailer");
require("dotenv").config();

const SendEmail = (receipt_email, payment_receipt) => {
  let trasporter = nodemailer.createTransport({
    host: process.env.HOST,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
  let messageOptions = {
    from: process.env.USER_EMAIL,
    to: receipt_email,
    subject: "Thanks for the Payment for the Product",
    html: payment_receipt,
  };
  trasporter.sendMail(messageOptions, (err, res) => {
    if (err) console.log(err.message,'..................Mail error');
    else console.log("Email sent Successfully...................");
  });
};
module.exports = SendEmail;
