'use strict';

const { useState } = require('toy-react');

/**
 * @param {{ count: number, increaseCount: () => void, decreaseCount: () => void }} props
 * @returns
 */
const Counter = (props) => {
  const { count, increaseCount, decreaseCount } = props;

  return (
    <section>
      <header>
        <h2>Counter</h2>
      </header>
      <div>
        <span>{count}</span>
        <button onClick={increaseCount}>increment</button>
        <button onClick={decreaseCount}>decrement</button>
      </div>
    </section>
  );
};

export const App = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const decreaseCount = () => {
    setCount((prevState) => prevState - 1);
  };

  return (
    <main>
      <header>
        <h1>This is Toy React!</h1>
      </header>
      <Counter
        count={count}
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
      />
    </main>
  );
};
