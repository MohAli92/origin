const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

async function sendWhatsAppOTP(to, code) {
  const message = `Your verification code is: ${code}`;
  return client.messages.create({
    from: `whatsapp:${fromNumber}`,
    to: `whatsapp:${to}`,
    body: message
  });
}

module.exports = { sendWhatsAppOTP }; 