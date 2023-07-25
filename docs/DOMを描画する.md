まずはじめに DOM を描画出来るようにテンプレートを拡張していきましょう。

## `ToyReact.createElement` の実装

まずは `ToyReact.createElement` を実装します。 `createElement` 関数は以下のように受け取った引数に応じてオブジェクトを作成する関数です。

```js
const element = ToyReact.createElement('div', null, ToyReact.createElement('span', null));

/**
 * element = {
 *  type: 'div',
 *  props: {
 *    children: [
 *      { type: 'span', null, props: { children: [...] } }
 *    ]
 *  }
 * }
 */
```

生成されるオブジェクトのうち、`type` は HTML 要素を作成する際に `document.createElement` に渡す tagName です(`document.createElement('div')` のように使いますね！)。

`props` には JSX の全ての属性の key と value、また `children` が含まれます。`children` は配列で、React 要素の下の階層のオブジェクトが含まれています。

それでは以下のように `packages/toy-react/src/ToyReactElement.js` を変更してみましょう。

```js
'use strict';

function createTextElement(node) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: node,
      children: [],
    },
  };
}

export function createElement(type, config, ...children) {
  const props = {
    ...config,
    children: children.map((child) =>
      typeof child === 'object' ? child : createTextElement(child)
    ),
  };
  return {
    type,
    props,
  };
}

```

変更した箇所を見てみましょう。`createElement` は先に述べたように `type` と `props` のあるオブジェクトを返すようになりました。ここで急に現れた `createTextElement` について触れていきましょう。

`children` は React 要素の下の階層のオブジェクトが含まれているはずですが、これがただの文字列の場合、何かしらの方法で文字列を DOM に描画する必要があります。そのために `createTextElement` 関数を用意し、`children` の各値がオブジェクトではなかった場合呼び出すようになっています。

本来の React では `children` が何もない場合や文字列だった場合、空の配列を作成や別のオブジェクトを生成するような処理は行われませんが、簡単のために今回はこういった形で進めていきます。

## `ToyReactDOM.render` の実装

次に `ToyReactDOM.render` を実装していきます。 `render` 関数は `createElement` で生成したオブジェクトを元に DOM ノードの作成や更新、削除を行います。本当は [`render` は3つ目の引数として callback を受け取れる](https://github.com/facebook/react/blob/54e88ed12c931fa717738849ba5656cc1cf3527a/packages/react-dom/src/client/ReactDOMLegacy.js#L267)のですが、今回は実装を省略します。

まずは DOM ノードを作成出来るように `packages/toy-react-dom/src/client/ToyReactDOMLegacy.js` を変更してみましょう。`createElement` は `type` と `props` のオブジェクトを返すので、`type` を使って DOM ノードの作成します。

これを実現する最も簡単な実装は以下の通りです。

```js
export function render(element, container) {
  const dom = document.createElement(element.type);
​
  container.appendChild(dom);
}

```

しかしこれでは `props.children` の各要素から DOM ノードを作成出来ていません。なので、`children` の各要素に対しても `render` を呼び出すような再帰関数になるように修正します。

```js
export function render(element, container) {
  const dom = document.createElement(element.type);

  element.props.children.forEach((child) => {
    render(child, dom)
  })
​
  container.appendChild(dom);
}

```

また `children` 以外の `props` を DOM ノードにマッピングするようにも修正する必要があります。完成した `render` 関数は以下の通りです。

```js
function isProperty(key) {
  return key !== 'children';
}

export function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => {
    render(child, dom);
  });

  container.appendChild(dom);
}

```

ここまで行った後、確認のため counter-app を起動してみましょう(`yarn dev && yarn start` を行って下さい)。

「あれ、何も表示されないじゃん！」となると思います。一旦 `fixtures/counter-app/src/index.js` を開き、以下のように修正してみてください。

```js
'use strict';

const ToyReact = require('toy-react');
const ToyReactDOM = require('toy-react-dom');

// const { App } = require('./components/App');

ToyReactDOM.render(<h1>This is ToyReact!</h1>, document.getElementById('root'));
// ToyReactDOM.render(<App />, document.getElementById('root'));

```

これで再度ビルドを行いサーバーを立ち上げ直してみましょう。「This is ToyReact!」の文字がブラウザで見れればひとまず完了です！

> ※ 今は `<App />` を描画することが出来ませんが、ここは後々修正して動くようにします！

> ※※ 何度もビルドするのは煩わしいので、ターミナルをもう１つ開いて `yarn dev -w` をしておくと保存するごとにビルドが走るようになって良いです。

## `ToyScheduler` の実装

DOM が描画出来たから一安心といきたいところですが、実はこの実装には大きな問題点があります。

気づいている方もいらっしゃると思いますが、`render` は自身を何度も呼び出す再帰関数です。もしネストの深い JSX を描画することになるとどうなるでしょうか...1度 `render` を呼び出してしまうと他の処理を長時間ブロックしてしまう可能性があります。これは stack reconciler で問題になっていた点でした。

またユーザーの操作(入力など)の処理やアニメーションをスムーズに動かす処理を行うにも、このままでは DOM の描画が完了するまで待機する必要があります(即座に反映されないということです)。

ということでこの描画の処理をいくつかの単位に分けて、それぞれ終了する度に他に実行する必要のある処理があれば描画を中断するように改良していきます。これは完全ではありませんが [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html) の実装の一部のようなものとなります。

DOM の描画を制御するためのスケジューラーを実装していきます。[React 本体ではフルスクラッチで実装されています](https://github.com/facebook/react/blob/main/packages/scheduler/src/forks/Scheduler.js)が、今回は簡単のために [window.requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) を利用して進めていきます。

`packages/toy-scheduler/src/forks/ToyScheduler.js` を開きましょう。`workLoop` 関数と `scheduleCallback` 関数がありますね。以下のように実装を追加してみましょう。

```js
'use strict';

function workLoop(deadline, commitRoot, performUnitOfWork, internals) {
  let shouldYield = false;
  while (internals.nextUnitOfWork && !shouldYield) {
    internals.nextUnitOfWork = performUnitOfWork(
      internals.nextUnitOfWork,
      internals
    );
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback((deadline) =>
    workLoop(deadline, commitRoot, performUnitOfWork, internals)
  );
}

export function scheduleCallback(commitRoot, performUnitOfWork, internals) {
  requestIdleCallback((deadline) =>
    workLoop(deadline, commitRoot, performUnitOfWork, internals)
  );
}

```

`requestIdleCallback` は渡した callback の引数として [IdleDeadline](https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline) を受け取ることが出来ます。これの `timeRemaining` 関数の返す値が `1 ms` 未満になるまで、つまりメインスレッドが何も処理を行っていない状態(=アイドル状態)のとき、先程の描画の処理を繰り返すようなコードになっています。`workLoop` は `scheduleCallback` を介して呼び出されます。後で `scheduleCallback` を呼び出す処理は追加します。

では一旦スケジューラーは置いておいて次は処理の作業を単位ごとに分け、実行するための関数を作成していきます。

この単位を作成するには fiber というデータ構造を利用します。React の fiber とは更新処理に優先度をつけられるようにするために設定された作業単位を指しています([参考](https://blog.ag-grid.com/inside-fiber-an-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/#from-react-elements-to-fiber-nodes))

それぞれの React 要素ごとに 1 つの fiber が割り当てられており、それが作業単位になります。

では fiber がどのような構造になっているのかを知りつつ実装を行っていきましょう。

## Fiber

ここから fiber の実装が始まります。まず fiber について例を交えて説明していきます。

以下のような React 要素のツリーを `render` で描画するとしましょう。

```js
ToyReact.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container
)
```

`render` ははじめにルートとなる fiber を `container` から作成します。次に `<div>...` について以下3つのことを行いながら fiber を作成・作業をします。

1. 要素を DOM に追加
2. 子要素のための fiber を作成
3. 次の作業単位を選択

fiber は次に作業を行う要素を簡単に見つけるためのデータ構造であると言えます。そのため、それぞれの fiber は最初の子、次の兄弟、親へのリンクを持っています。文字だけだとよくわからないですね、私もそう思います。以下の画像が理解の手助けになるはずです([参考](https://pomb.us/build-your-own-react/))。

![fiber-tree](https://pomb.us/static/c1105e4f7fc7292d91c78caee258d20d/ac667/fiber2.png)

このツリーを探索の際、fiber に子も兄弟もいない場合は「おじ」、つまり親の兄弟に移動します(画像の `<a> → <h2>` の移動がそれです)。また親に兄弟がいない(自身のおじがいない)場合は、兄弟のいる親が見つかるまで、もしくはルートに到達するまで親を探索し続けます。そしてルートとなる fiber に到達すると全ての作業が完了したということになります。

ここまでの話を元に実装を行ってみましょう。

まずは `ToyReactDOM.render` で行っていた処理を `createDom` という別の関数に移します。`packages/toy-react-dom/src/client/ToyReactDOMLegacy.js` の `render` 関数の中身を `packages/toy-react-reconciler/src/ToyReactReconciler.js` の `createDom` 関数に移しましょう。

`packages/toy-react-dom/src/client/ToyReactDOMLegacy.js`

```js
'use strict';

const internals = {
  nextUnitOfWork: null,
  currentRoot: null,
  wipRoot: null,
  deletions: null,
  wipFiber: null,
  hookIndex: null,
};

function isProperty(key) {
  return key !== 'children';
}

export function render(element, container) {
  // TODO: set next unit of work
}

export function useStateImpl(initial) {}

```

`packages/toy-react-reconciler/src/ToyReactReconciler.js`

```js
'use strict';

function isEvent(key) {}
function isStyle(key) {}
function isProperty(key) {
  return key !== 'children';
}
function isNew(prev, next) {}
function isGone(prev, next) {}

export function updateDom(dom, prevProps, nextProps) {}

export function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });

  return dom;
}

```

次に `render` で fiber ツリーのルートを作成するようにしましょう。

`packages/toy-react-dom/src/client/ToyReactDOMLegacy.js`

```js
'use strict';

const internals = {
  nextUnitOfWork: null,
  currentRoot: null,
  wipRoot: null,
  deletions: null,
  wipFiber: null,
  hookIndex: null,
};

export function render(element, container) {
  internals.nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

export function useStateImpl(initial) {}

```

作成したルートは `internals` オブジェクトの `nextUnitOfWork` に代入しておきます。これを先程の `toy-scheduler` の実装で行っていたように `performUnitOfWork` の結果で更新することで fiber ツリーの探索・それぞれの処理を進めていきます。

では `performUnitOfWork` 関数を実装しましょう。また `ToyScheduler.scheduleCallback` を呼び出すような処理も追加します。

`packages/toy-react-reconciler/src/ToyReactFiberWorkLoop.js`　を開き、`performUnitOfWork` に以下の順で処理を追加してください。

まずは `fiber.dom` プロパティから DOM ノードを追跡します。

```js
'use strict';

import { createDom } from './ToyReactFiberReconciler';

function performUnitOfWork(fiber, internals) {
  // add
  if (!fiber.dom) {
    fiber.dom = createDom();
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
}

// ~~~

```

次に、子要素ごとに新たな fiber を作成するようにします。

```js
'use strict';

import { createDom } from './ToyReactFiberReconciler';

function performUnitOfWork(fiber, internals) {
  if (!fiber.dom) {
    fiber.dom = createDom();
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // add
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };
  }
}

// ~~~

```

そして、最初の子要素であるかどうかに応じて、子または兄弟として設定する fiber をツリーに追加します。

```js
'use strict';

import { createDom } from './ToyReactFiberReconciler';

function performUnitOfWork(fiber, internals) {
  if (!fiber.dom) {
    fiber.dom = createDom();
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // add
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

// ~~~

```

最後に次の作業単位を探索するような処理を追加します。子要素、兄弟、おじという順で調べていきます。

```js
'use strict';

import { createDom } from './ToyReactFiberReconciler';

function performUnitOfWork(fiber, internals) {
  if (!fiber.dom) {
    fiber.dom = createDom();
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  // add
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

// ~~~

```

`packages/toy-react-reconciler/src/ToyReactFiberWorkLoop.js`　の完成形は以下のとおりです(スケジューラーを呼び出すための `flushSync` 関数も実装しましょう)。

```js
'use strict';

import { scheduleCallback } from './ToyScheduler';
import { createDom } from './ToyReactFiberReconciler';

function performUnitOfWork(fiber, internals) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function commitRoot(internals) {}

export function flushSync(internals) {
  scheduleCallback(commitRoot, performUnitOfWork, internals);
}

```

あとは `render` で `flushSync` を呼び出すように変更しておきます。

`packages/toy-react-dom/src/client/ToyReactDOMLegacy.js`

```js
'use strict';

import { flushSync } from 'toy-react-reconciler/src/ToyReactFiberWorkLoop';

const internals = {
  nextUnitOfWork: null,
  currentRoot: null,
  wipRoot: null,
  deletions: null,
  wipFiber: null,
  hookIndex: null,
};

export function render(element, container) {
  internals.nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };

  flushSync(internals);
}

export function useStateImpl(initial) {}

```

念の為ビルドを行ってサーバーを立ち上げ、「This is ToyReact!」がちゃんと表示されているか確認してみましょう。

ここまでで一旦前半終了です！引き続いて DOM の更新や削除が出来るようにしてカウンターが動く状態にしていきます。

なおここまでの実装はこちらのブランチに用意してあるので、エラーなどで困っている場合は参考にしてください: https://github.com/shuta13/react-deep-dive/tree/feat/render-dom

`yarn create toy-react-app render-dom <my-app>` で手元にダウンロード出来ます。

---

[差分検出処理を実装する](./差分検出処理を実装する.md) へ続く
