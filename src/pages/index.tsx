const HomePage: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      maxWidth: '540px',
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
      {'I am a designer and developer at '}
      <a href="https://trbl.design">
        Trouble
        </a>
      {'. I am also the creator and maintainer of '}
      <a href="https://github.com/faceless-ui">
        Faceless UI
        </a>
      {'. Another project of mine is '}
      <a href="https://rhtml.io">
        rhtml
        </a>
      {', but there\'s more on '}
      <a href="https://github.com/jacobsfletch">
        GitHub
        </a>
      {'.'}
    </p>
  </div>
);

export default HomePage;
