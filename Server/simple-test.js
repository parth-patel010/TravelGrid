console.log('Starting email test...');
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing nodemailer...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

console.log('Creating transporter...');
const transporter = nodemailer.createTransport(config);

console.log('Verifying connection...');
transporter.verify()
  .then(() => {
    console.log('✅ SMTP server is ready!');
    
    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'TravelGrid Test Email',
      text: 'This is a test email from TravelGrid',
      html: '<h1>Test Email</h1><p>This is a test email from TravelGrid</p>'
    };
    
    return transporter.sendMail(mailOptions);
  })
  .then((info) => {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  })
  .catch((error) => {
    console.error('❌ Email error:', error);
  });
