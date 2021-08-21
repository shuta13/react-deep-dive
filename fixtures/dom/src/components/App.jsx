'use strict';

const { useState } = require('toy-react');
const { Counter } = require('./Counter');

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
