'use-strict';

/**
 * @param {{ count: number, increaseCount: () => void, decreaseCount: () => void }} props
 * @returns
 */
export const Counter = (props) => {
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
