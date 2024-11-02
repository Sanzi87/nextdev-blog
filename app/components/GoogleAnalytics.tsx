import Script from 'next/script';

interface GoogleAnalyticsProps {
  ga_id: string;
}
const GoogleAnalytics = ({ ga_id }: GoogleAnalyticsProps) => {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js? 
      id=${ga_id}`}
      ></Script>
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ga_id}');
        `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
