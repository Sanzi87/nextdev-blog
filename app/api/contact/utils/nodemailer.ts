import nodemailer from 'nodemailer';

const host = process.env.NODEMAILER_HOST;
const port = parseInt(process.env.NODEMAILER_PORT || '465');
const user = process.env.NODEMAILER_USR;
const pass = process.env.NODEMAILER_PASS;

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: { user, pass },
} as nodemailer.TransportOptions);
