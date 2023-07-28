ここまでは ToyReact という簡易版 React を実装し、React の動作の仕組みを理解してきました。

さて、本章以降では発展的な内容として、ToyReact を用いて SSR と SSG を再現してみます。

## 必要な知識の整理

はじめに、必要な知識を今一度整理します。SSR と SSG についてご存知の方は、読み飛ばして頂いて構いません。

### SSR とは

Server Side Rendering の略です。

サーバーサイドで、React コンポーネントを HTML 文字列に変換し、クライアントサイドで完全な HTML として表示する仕組みです。

この「クライアントサイドで完全な HTML として表示する」とは、どういうことでしょう？

まずは実際にサーバーサイドで生成された HTML 文字列を見てみましょう。以下の React コンポーネントを SSR してみます。

```jsx
const App = () => {
    return (
        <div style={{ backgroundColor: 'olive', color: 'gray' }}>
            <h1>App</h1>
            <button onClick={() => console.log('clicked')}>Click Me!</button>
        </div>
    );
};
```

実際の React では、`react-dom/server` に含まれる、`renderToString` という関数を使用することで、このコンポーネントを文字列に変換します。

```jsx
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(<App />);
```

SSR の処理としては `html` の値を、クライアントサイドに送信するまでを指します。

次に、`html` の値を見てみましょう。

```jsx
<div>
    <h1>App</h1>
    <button>Click Me!</button>
</div>
```

コンポーネントに含まれているはずの、 `style` や `onClick` のプロパティが全て失われてしまいました。失われた値はどのように補えば良いのでしょうか？

この処理はサーバーサイドで行わず、HTML 文字列が送信された先のクライアント(ブラウザ)で行うことになります。これを hydration と呼びます。

では `react-dom` の `hydrate` という関数に、サーバーサイドで文字列に変換したものと同じコンポーネントを渡してみましょう。

```jsx
import ReactDOM from 'react-dom';

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

ビルドした後、ブラウザで見てみると、コンポーネントが完全な HTML として表示されます！

つまり、hydration という処理によって、サーバーサイドで抜け落ちたスタイルや Event Listener をクライアントサイドで適用しているのです。

### SSG とは

Server Side Generation の略です。pre-rendering と呼ばれることもあります。

SSR との違いとして、生成した HTML 文字列をサーバーからクライアントに送信するのではなく、静的ファイル(HTML)として書き出す点が挙げられます。

簡単に実装してみると、`renderToString` した HTML 文字列を `fs` などでファイルに書き込むことで実現できます。

```jsx
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(<App />);
fs.writeFileSync('./dist/index.html', html);
```

`/dist` をクライアントサイドで開くと、hydration が行われ、完全な HTML が表示されます。

ほとんど SSR と仕組みは変わりませんが、リクエストに紐づいてサーバーサイドでデータを取得し、ページを更新するような、更新頻度の多いサイトには不向きです。

その代わりブログやドキュメントなど、更新頻度の少ないサイトでは SSR よりもページの表示速度の向上が見込めるため、向いています。

---

これらを踏まえ、実装を進めてみましょう。

## 実装の準備

これまでと同様に `create-toy-react-app` を用いて、テンプレートのダウンロードができます。

React 自作パートを行っていない方も、このテンプレートを用いれば既に完成した ToyReact を使用することができるので、ご安心ください。

それでは以下を実行して、SSR と SSG のテンプレートを手元に持ってきてください。

```shell
# SSR
# 完成形は ssr-template を ssr-completed に変更するとダウンロードできます。
npx create-toy-react-app 2023 ssr-template <my-app>
```

```shell
# SSG
# 完成形は ssg-template を ssg-completed に変更するとダウンロードできます。
npx create-toy-react-app 2023 ssg-template <my-app>
```

利用可能なコマンドは、それぞれ `npm run -w ssr-app` `npm run -w ssg-app` で確認してください。

---

[SSRを実装する](./SSRを実装する.md)
