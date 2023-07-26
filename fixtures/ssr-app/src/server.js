'use strict';
const path = require('path');
const fs = require('fs');
const ToyReact = require('toy-react');
const ToyReactDOMServer = require('toy-react-dom/server');
const { App } = require('./components/App');

const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => {
  const content = ToyReactDOMServer.renderToString(<App />);
  const template = fs.readFileSync(
    path.resolve(__dirname, 'public/app.html'),
    'utf-8'
  );
  const html = template.replace('<!-- app -->', content);
  res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
});

app.listen(3001, () => {
  console.log('Start on http://localhost:3001');
});
