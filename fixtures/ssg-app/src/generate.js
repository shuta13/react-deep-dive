'use strict';
const path = require('path');
const fs = require('fs');
const ToyReact = require('toy-react');
const ToyReactDOMServer = require('toy-react-dom/server');
const { App } = require('./components/App');

const routes = fs
  .readdirSync(path.resolve(__dirname, './pages'), { withFileTypes: true })
  .filter((dirent) => dirent.name.endsWith('.js'))
  .map((dirent) => dirent.name.replace(/\.js$/, ''));

(() => {
  routes.forEach((route) => {
    const content = ToyReactDOMServer.renderToString(<App />);
    const template = fs.readFileSync(
      path.resolve(__dirname, 'app.html'),
      'utf-8'
    );
    const html = template.replace('<!-- app -->', content);
    if (!fs.existsSync(path.resolve(__dirname, '../out'))) {
      fs.mkdirSync(path.resolve(__dirname, '../out'));
    }
    const outPath = path.resolve(__dirname, `../out/${route}.html`);
    fs.writeFileSync(outPath, html);
    fs.copyFileSync(
      path.resolve(__dirname, `./${route}.css`),
      path.resolve(__dirname, `../out/${route}.css`)
    );
    if (!fs.existsSync(path.resolve(__dirname, '../out/pages'))) {
      fs.mkdirSync(path.resolve(__dirname, '../out/pages'));
    }
    fs.copyFileSync(
      path.resolve(__dirname, `./pages/${route}.js`),
      path.resolve(__dirname, `../out/pages/${route}.js`)
    );
  });
})();
