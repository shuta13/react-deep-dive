'use strict';

/**
 * @param {{ count: number, countUp: () => void, countDown: () => void }} props
 * @returns
 */
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
