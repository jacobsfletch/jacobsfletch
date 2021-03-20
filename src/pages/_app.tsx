import React, { Fragment } from 'react';
import { AppProps } from 'next/app';
import GoogleAnalytics from '../components/GoogleAnalytics';

type Props = {
  pageProps: Record<string, unknown>
}

const App: React.FC<Props> = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <GoogleAnalytics />
    <Component {...pageProps} />
  </Fragment>
);

export default App;
