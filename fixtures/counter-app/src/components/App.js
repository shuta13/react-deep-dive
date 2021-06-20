'use strict';

require('../assets/styles/global.css');

const ToyReact = require('toy-react');
const { useState } = require('toy-react');
const { Counter } = require('./Counter');

const styles = {
  wrapper: {
    maxWidth: '768px',
    width: '100%',
    margin: 'auto',
  },
  header: { background: 'black', color: 'white', padding: '1rem' },
};

export const App = () => {
  const [count, setCount] = useState(0);

  const countUp = () => {
    setCount((prevState) => prevState + 1);
  };

  const countDown = () => {
    setCount((prevState) => prevState - 1);
  };

  return (
    <main style={styles.wrapper}>
      <header>
        <h1 style={styles.header}>This is ToyReact!</h1>
      </header>
      <Counter count={count} countUp={countUp} countDown={countDown} />
    </main>
  );
};
