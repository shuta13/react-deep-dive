'use strict';

const ToyReact = require('toy-react');
const ToyReactDOM = require('toy-react-dom');

const element = ToyReact.createElement('h1');

ToyReactDOM.render(element, document.getElementById('root'));
