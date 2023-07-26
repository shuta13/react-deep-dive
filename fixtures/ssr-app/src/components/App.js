'use strict';

require('../assets/styles/global.css');

const ToyReact = require('toy-react');

const styles = {
  wrapper: {
    maxWidth: '768px',
    width: '100%',
    margin: 'auto',
  },
  header: { background: 'black', color: 'white', padding: '1rem' },
};

export const App = () => {
  return (
    <main style={styles.wrapper}>
      <header>
        <h1 style={styles.header}>This is ToyReact(with SSR)!</h1>
      </header>
    </main>
  );
};
