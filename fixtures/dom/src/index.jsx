'use strict';

const ToyReact = require('toy-react');
const ToyReactDOM = require('toy-react-dom');

const App = () => {
  return (
    <div>
      <h1>This is Toy React!</h1>
    </div>
  );
};

ToyReactDOM.render(<App />, document.getElementById('root'));
