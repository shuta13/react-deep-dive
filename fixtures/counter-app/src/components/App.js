'use strict';

const ToyReact = require('toy-react');

// toy-react から useState を require
// const { useState } = require('toy-react');
// Counter コンポーネントを require
// const { Counter } = require('./Counter');

export const App = () => {
  // useState でカウンターの state を定義
  // const [count, setCount] = useState(0);

  // カウントアップ
  const countUp = () => {
    // setCount((prevState) => prevState + 1);
  };

  // カウントダウン
  const countDown = () => {
    // setCount((prevState) => prevState - 1);
  };

  return (
    <main>
      <header>
        <h1>This is Toy React!</h1>
      </header>
      {/* Counter コンポーネントを追加 */}
      {/* <Counter count={count} countUp={countUp} countDown={countDown} /> */}
    </main>
  );
};

// export default App;
