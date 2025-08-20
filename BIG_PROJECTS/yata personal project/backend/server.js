require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const { z } = require('zod');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

/* ---------- Security & middleware ---------- */
app.use(express.json({ limit: '10kb' }));
app.use(helmet());

// Allow only the dev origins you actually use
const allowed = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:3000',
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // allow tools like Postman
      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  })
);

// NOTE: no app.options('*') here (Express 5 path-to-regexp issue)

/* ---------- Validation ---------- */
// Accept either frontend naming (fullName/mobile) or backend naming (name/phoneNum)
const baseSchema = z.object({
  subject: z.string().min(1, 'Subject required').max(150),
  message: z.string().min(1, 'Message required').max(5000),
  email: z.string().email('Invalid email'),
  // optional/hidden fields
  website: z.string().optional(), // honeypot
});

const namePhoneVariants = z.union([
  z.object({
    name: z.string().min(1, 'Name required').max(100),
    phoneNum: z.string().optional().default(''),
  }),
  z.object({
    fullName: z.string().min(1, 'Full name required').max(100),
    mobile: z.string().optional().default(''),
  }),
]);

const messageSchema = baseSchema.and(namePhoneVariants);

/* ---------- Nodemailer transporter ---------- */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,                     // e.g. smtp.gmail.com
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',      // true for 465
  auth: {
    user: process.env.SMTP_USER,                   // your email/login
    pass: process.env.SMTP_PASS,                   // app password / SMTP key
  },
});

// verify once on boot (optional)
transporter
  .verify()
  .then(() => console.log('SMTP ready'))
  .catch((err) => console.error('SMTP error:', err.message));

/* ---------- Route ---------- */
app.post('/api/message', async (req, res) => {
  try {
    // Honeypot: bots fill "website" -> silently accept but do nothing
    if (req.body?.website) {
      return res.status(204).end();
    }

    const parsed = messageSchema.parse(req.body);

    // Normalize names/phone
    const name = 'name' in parsed ? parsed.name : parsed.fullName;
    const phoneNum = 'phoneNum' in parsed ? parsed.phoneNum : parsed.mobile || '';

    const text =
      `New message from your site:\n\n` +
      `Name: ${name}\n` +
      `Email: ${parsed.email}\n` +
      `Phone: ${phoneNum}\n` +
      `Subject: ${parsed.subject}\n\n` +
      `${parsed.message}\n`;

    const mail = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Gmail often requires sender = SMTP_USER
      to: process.env.EMAIL_TO,                     // your inbox
      replyTo: parsed.email,                        // so replies go to the visitor
      subject: parsed.subject,
      text,
    };

    const info = await transporter.sendMail(mail);
    return res.status(201).json({ ok: true, id: info.messageId });
  } catch (err) {
    if (err?.issues) {
      // Zod validation errors
      return res.status(400).json({ ok: false, error: err.issues });
    }
    console.error('SendMail error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
});

/* ---------- Boot ---------- */
const port = Number(process.env.PORT || 5000);
app.listen(port, () => {
  console.log(`App listening on port ${port}…`);
});
