'use strict';

const ToyReact = require('toy-react');
const ReactDOM = require('react-dom');
const ToyReactDOM = require('toy-react-dom');

const { App } = require('./components/App');

ToyReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
