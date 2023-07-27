'use strict';

const ToyReact = require('toy-react');

const styles = {
  wrapper: {
    maxWidth: '768px',
    width: '100%',
    height: '100%',
    margin: 'auto',
    background: 'palegoldenrod',
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
  },
  header: {
    color: 'dimgray',
    padding: '1rem',
    margin: 0,
  },
};

export const App = () => {
  return (
    <main style={styles.wrapper}>
      <header>
        <h1 style={styles.header}>This is ToyReact(with SSG)!</h1>
      </header>
    </main>
  );
};
