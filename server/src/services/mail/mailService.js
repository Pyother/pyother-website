const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

// * Global variables:
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPassword
  }
});

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    }); 
}

module.exports = sendMail;