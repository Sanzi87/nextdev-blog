import React, { useState } from 'react';
import ContactForm from './_components/ContactForm';
import { Metadata } from 'next';
const ContactPage = () => {
  return (
    <div className='px-6'>
      <ContactForm />
    </div>
  );
};

export default ContactPage;

export const metadata: Metadata = {
  title: 'Contact NextDev Solutions - Get in Touch',
  description:
    'Reach out to NextDev Solutions for any web development inquiries. Connect with Alexander and the community. We welcome your questions, feedback, and collaboration opportunities.',
};
