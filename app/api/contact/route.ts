import { NextRequest, NextResponse } from 'next/server';
import { transporter } from './utils/nodemailer';
import { contactSchema } from '@/app/validationSchemas';
import { createMailOptions } from './utils/mailOptions';
import { verifyRecaptcha } from './utils/verifyRecaptcha';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      console.error('Validation Error:', validation.error.format());
      return NextResponse.json({ message: 'Validation error', status: 400 });
    }

    const isRecaptchaValid = await verifyRecaptcha(body.token);

    if (!isRecaptchaValid) {
      console.error('reCAPTCHA verification failed.');
      return NextResponse.json({
        message: 'reCAPTCHA verification failed',
        status: 400,
      });
    }

    const mailOptions = createMailOptions({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    //Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      message: 'Your message has been sent',
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email', status: 500 });
  }
}
