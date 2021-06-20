'use strict';

const ToyReact = require('toy-react');

const styles = {
  wrapper: {
    width: '100%',
  },
  header: {
    textAlign: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  counter: { fontSize: '2rem', width: '100%', textAlign: 'center' },
  button: {
    width: '1.5rem',
    height: '1.5rem',
    cursor: 'pointer',
    margin: '1rem',
  },
};

export const Counter = (props) => {
  const { count, countUp, countDown } = props;

  return (
    <section style={styles.wrapper}>
      <header style={styles.header}>
        <h2>Counter</h2>
      </header>
      <div style={styles.container}>
        <span style={styles.counter}>{count}</span>
        <button style={styles.button} onClick={countUp}>
          +
        </button>
        <button style={styles.button} onClick={countDown}>
          -
        </button>
      </div>
    </section>
  );
};
