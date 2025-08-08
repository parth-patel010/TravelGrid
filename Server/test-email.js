require('dotenv').config();
const { sendEmail, testEmailConfiguration, sendVerificationEmail } = require('./utils/emailService');

async function testEmail() {
  console.log('🔍 Testing email configuration...');
  console.log('Environment variables:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
  console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('');

  // Test 1: Email configuration
  console.log('1️⃣ Testing email configuration...');
  const configTest = await testEmailConfiguration();
  if (!configTest.success) {
    console.error('❌ Email configuration failed:', configTest.error);
    return;
  }
  console.log('✅ Email configuration is valid');
  console.log('');

  // Test 2: Send test email
  console.log('2️⃣ Sending test email...');
  try {
    const testTo = process.env.EMAIL_USER; // Send to self for testing
    const testSubject = 'TravelGrid - Email Test';
    const testHtml = `
      <h2>Email Test Successful! 🎉</h2>
      <p>This is a test email from TravelGrid server.</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      <p>If you received this email, the email service is working correctly.</p>
    `;

    const result = await sendEmail(testTo, testSubject, testHtml);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
  } catch (error) {
    console.error('❌ Test email failed:', error.message);
    console.error('Full error:', error);
  }

  console.log('');
  console.log('3️⃣ Testing verification email template...');
  try {
    const testTo = process.env.EMAIL_USER; // Send to self
    const result = await sendVerificationEmail(testTo, 'Test User', '123456');
    console.log('✅ Verification email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('❌ Verification email failed:', error.message);
  }
}

testEmail().catch(console.error);
