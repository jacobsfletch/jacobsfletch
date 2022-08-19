import React, { Fragment } from 'react';
import { AppProps } from 'next/app';
import GoogleAnalytics from '../components/GoogleAnalytics';
import './_app.css';

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
