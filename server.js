const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Twilio credentials
const accountSid = 'AC253ea1abc3f4b4ed81f149cceba7c29d';  // Replace with your Twilio SID
const authToken = '6a3868f116945011f0936994084f5516';    // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// POST route to receive SOS message and send SMS
app.post('/send-sos', (req, res) => {
    const { message, phoneNumber } = req.body;

    // Validate input
    if (!message || !phoneNumber) {
        return res.status(400).json({ error: 'Message and phone number are required' });
    }

    // Send SMS using Twilio
    client.messages
        .create({
            body: message,
            from: '+18159164730',  // Your Twilio phone number
            to: phoneNumber,              // Emergency contact phone number
        })
        .then((message) => {
            res.json({ success: true, sid: message.sid, message: 'SOS alert sent!' });
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: error.message });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
