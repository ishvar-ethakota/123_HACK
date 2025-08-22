require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const scheduledEmails = [];

app.post('/schedule-email', (req, res) => {
  const { subject, message, time, email } = req.body;

  if (!subject || !message || !time || !email) {
    return res.status(400).json({ error: 'Subject, message, time, and email are required' });
  }

  const [hour, minute] = time.split(':');

  const cronExpression = `${minute} ${hour} * * *`;
  const job = cron.schedule(cronExpression, () => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Email error:', err);
      else console.log(`Email sent to ${email}:`, info.response);
    });
  }, { scheduled: true, timezone: "Asia/Kolkata" });

  scheduledEmails.push(job);

  res.json({ success: true, scheduledFor: time, to: email });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
