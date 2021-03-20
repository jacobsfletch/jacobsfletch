import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`}
        />
        <script dangerouslySetInnerHTML={{
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
