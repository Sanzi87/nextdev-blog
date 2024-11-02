import axios from 'axios';

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRETKEY;

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: recaptchaSecretKey,
          response: token,
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}
