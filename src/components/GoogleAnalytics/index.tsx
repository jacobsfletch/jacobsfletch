'use client'
import React, { Fragment, useEffect } from 'react';
import Script from 'next/script'
import { usePathname } from 'next/navigation';

const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window { // eslint-disable-line no-unused-vars
    gtag: (...args: unknown[]) => void  // eslint-disable-line no-unused-vars
  }
}

const GoogleAnalytics: React.FC = () => {
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      if (gaMeasurementID && typeof window.gtag === 'function') {
        window.gtag('config', gaMeasurementID, { page_path: pathName });
      }
    }
  }, [pathName]);

  if (gaMeasurementID) {
    return (
      <Fragment>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`}
          id="google-analytics-script"
        />
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementID}');`,
          }}
          id="google-analytics-gtag"
        />
      </Fragment>
    );
  }
  return null;
};

export default GoogleAnalytics;
