'use strict';

const ToyReact = require('toy-react');

export const Counter = (props) => {
  const { count, countUp, countDown } = props;

  return (
    <section>
      <header>
        <h2>Counter</h2>
      </header>
      <div>
        <span>{count}</span>
        <button onClick={countUp}>+</button>
        <button onClick={countDown}>-</button>
      </div>
    </section>
  );
};
