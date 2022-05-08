import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script'

const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window { // eslint-disable-line no-unused-vars
    gtag: (...args: unknown[]) => void  // eslint-disable-line no-unused-vars
  }
}

const GoogleAnalytics: React.FC = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (asPath) {
      if (gaMeasurementID && typeof window.gtag === 'function') {
        window.gtag('config', gaMeasurementID, { page_path: asPath });
      }
    }
  }, [asPath]);

  if (gaMeasurementID) {
    return (
      <Head>
        <Script
          strategy="afterInteractive"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`}
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementID}');`,
          }}
        />
      </Head>
    );
  }
  return null;
};

export default GoogleAnalytics;
