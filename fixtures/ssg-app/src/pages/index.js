'use strict';

const ToyReact = require('toy-react');
const ToyReactDOM = require('toy-react-dom');

require('../assets/styles/global.css');

const { App } = require('../components/App');

ToyReactDOM.hydrate(<App />, document.getElementById('root'));
