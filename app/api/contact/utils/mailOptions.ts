export interface MailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function createMailOptions(mailData: MailData) {
  const [from, to] = [
    process.env.NODEMAILER_FROM,
    process.env.NODEMAILER_MAILTO,
  ];

  return {
    from,
    to,
    subject: 'New message from NextDev Blog',
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${mailData.name}</p>
            <p><strong>Email:</strong> ${mailData.email}</p>
            <p><strong>Subject:</strong> ${mailData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${mailData.message}</p>
        </div>
      `,
  };
}
