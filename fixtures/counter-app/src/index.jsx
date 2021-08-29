'use strict';

const ToyReact = require('toy-react');
const ToyReactDOM = require('toy-react-dom');

const App = require('./components/App');

ToyReactDOM.render(
  ToyReact.createElement(App.default),
  document.getElementById('root')
);
