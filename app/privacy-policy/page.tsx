import { Metadata } from 'next';
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <article className='px-10 pb-10 max-w-3xl mx-auto article-page'>
      <h1>Privacy Policy for NextDev Solutions</h1>
      <p className='mb-5'>Effective Date: 2024-01-01</p>
      <p>
        Thank you for visiting NextDev Solutions. This Privacy Policy outlines
        how we collect, use, and safeguard your personal information when you
        use our website.
      </p>
      <h2>1. Information We Collect</h2>
      <h3>1.1 Contact Form</h3>
      <p>
        When you use the contact form on our website, we collect your name and
        email address to respond to your inquiries. We do not share this
        information with third parties.
      </p>
      <h3>1.2 Comments</h3>
      <p>
        To leave a comment on our blog posts, you must log in with your Google
        account or GitHub account. We collect your name, email address, and
        profile information associated with your chosen authentication method.
        This information is used solely for the purpose of displaying your
        comment and interacting with our community.
      </p>
      <h3>1.3 Analytics</h3>
      <p>
        We use Google Analytics to collect information about how visitors use
        our site. Google Analytics may collect data such as your IP address,
        browser type, and pages visited. This information is aggregated and
        anonymized, and it helps us improve the user experience on our site.
      </p>
      <h3>1.4 ReCAPTCHA</h3>
      <p>
        We use Google reCAPTCHA to protect our contact form and comment section
        from spam and abuse. Your use of these features is subject to Google's
        Privacy Policy and Terms of Service.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>
        2.1 We use your contact information to respond to your inquiries and
        feedback.
      </p>
      <p>
        2.2 Your name and profile information associated with your Google or
        GitHub account are displayed publicly when you leave a comment on our
        blog posts.
      </p>
      <p>
        2.3 We use aggregated and anonymized data from Google Analytics to
        analyze website traffic and improve our content.
      </p>
      <h2>3. Information Security</h2>
      <p>
        We prioritize the security of your information and employ
        industry-standard measures to protect against unauthorized access,
        disclosure, alteration, or destruction of data.
      </p>
      <h2>4. Third-Party Services</h2>
      <p>
        While we do not sell or share your personal information with third
        parties, please be aware that the use of Google Analytics and reCAPTCHA
        is subject to Google's policies. We encourage you to review their
        privacy policies for more information.
      </p>
      <h2>5. Your Choices</h2>
      <p>
        You can choose to disable cookies in your browser settings. However,
        this may affect your experience on our website.
      </p>
      <h2>6. Updates to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy to reflect changes in our practices.
        The updated policy will be effective upon posting.
      </p>
      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, please
        contact us by the contact form.
      </p>
      <p>
        By using our website, you acknowledge and agree to the terms outlined in
        this Privacy Policy.
      </p>
      <p className='mt-5'>Dala Software</p>
      <p>Sweden</p>
    </article>
  );
};

export default PrivacyPolicyPage;

export const metadata: Metadata = {
  title: 'NextDev Solutions Privacy Policy: Your Data Security Matters',
  description:
    'Read the privacy policy of NextDev Solutions. Learn how we handle your data with care, our commitment to security.',
};
