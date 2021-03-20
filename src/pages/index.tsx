import Head from 'next/head';
import { Fragment } from 'react';

const HomePage: React.FC = () => (
  <Fragment>
    <Head>
      <title>
        Jacob Fletcher
      </title>
      <link
        rel="icon"
        href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/waving-hand_1f44b.png"
      />
      <meta
        name="description"
        content="Grand Rapids creative designer and developer building software for brands and businesses."
      />
      <meta
        name="keywords"
        content="ui, ux, javascript, front-end, developer, designer, react, trouble, trbl, payload, software, saas, product, branding, web design, graphic design"
      />
    </Head>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        maxWidth: '850px',
        padding: '0 40px',
        lineHeight: 1.25,
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontSize: '36px',
        }}
      >
        &#128075;
      <br />
      You found me
    </h1>
      <p
        style={{
          fontSize: '22px',
        }}
      >
        {'Hello, my name is Jacob Fletcher and I am a designer and developer at '}
        <a href="https://trbl.design">
          Trouble
        </a>
        {'. I am also creator and maintainer of '}
        <a href="https://github.com/faceless-ui">
          Faceless UI
        </a>
        {' and '}
        <a href="https://rhtml.io">
          Rasterize HTML
        </a>
        {'. I have worked with brands and businesses from small to enterprise. Here is my '}
        <a href="https://github.com/jacobsfletch">
          GitHub
        </a>
        {' and my '}
        <a
          href="mailto:jacobsfletch@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </p>
    </div>
  </Fragment>
);

export default HomePage;
