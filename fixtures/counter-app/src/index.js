'use strict';

const ToyReact = require('toy-react');
const ToyReactDOM = require('toy-react-dom');

// const { App } = require('./components/App');

// ToyReactDOM.render(<App />, document.getElementById('root'));

const container = document.getElementById('root');

const updateValue = (e) => {
  rerender(e.target.value);
};

const rerender = (value) => {
  const element = (
    <div>
      <input onInput={updateValue} value={value} />
      <h2>This is {value}!</h2>
    </div>
  );

  ToyReactDOM.render(element, container);
};

rerender('ToyReact');
