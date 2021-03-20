import React, { useEffect } from 'react';
import { AppProps } from 'next/app';

type Props = {
  pageProps: Record<string, unknown>
}

const App: React.FC<Props> = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
