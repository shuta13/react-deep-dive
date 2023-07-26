'use strict';

function isEvent(key) {
  return key.startsWith('on');
}
function isStyle(key) {
  return key === 'style';
}
function isProperty(key) {
  return key !== 'children' && !isEvent(key) && !isStyle(key);
}

class ToyReactDOMServerRenderer {
  constructor(children, options) {
    this.stack = children;
    this.options = options;
    this.exhausted = false;
  }

  destroy() {
    if (!this.exhausted) {
      this.exhausted = true;
    }
  }

  read() {
    if (this.exhausted) {
      return null;
    }

    return this.renderElement(this.stack);
  }

  renderElement(element) {
    if (element.type === 'TEXT_ELEMENT') {
      return element.props.nodeValue;
    }

    if (element.type instanceof Function) {
      const component = element.type(element.props);
      const child = component.render ? component.render() : component;
      return this.renderElement(child);
    }

    // TODO: 試しにdocument.createElementを使ってもらう
    // もちろん、サーバーサイドなのでdocumentが使えない
    // → hydration が必要
    const props = element.props || {};
    const attributes = Object.keys(props)
      .filter(isProperty)
      .map((key) => `${key}="${props[key]}"`)
      .join(' ');
    const children = (props.children || [])
      .map((child) => this.renderElement(child))
      .join('');

    return `<${element.type} ${attributes}>${children}</${element.type}>`;
  }
}

export default ToyReactDOMServerRenderer;
