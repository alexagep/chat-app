const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { messages } = require("../common/messages");
const responseMessage = require("../common/responseMessage");
// const db = require("../../db/models");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMail = async (email) => {
  try {
    const otp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    console.log(process.env.EMAIL_SERVICE,process.env.EMAIL_ADDRESS,process.env.EMAIL_PASS,);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "OTP code for login",
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return otp;
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
};
