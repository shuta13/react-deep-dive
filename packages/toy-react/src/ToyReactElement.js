// @ts-check
'use strict';

import hasOwnProperty from 'shared/hasOwnProperty';
import { TOY_REACT_ELEMENT_TYPE } from 'shared/ToyReactSymbols';
import ToyReactCurrentOwner from './ToyReactCurrentOwner';

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

function hasValidRef(config) {
  return config.ref !== undefined;
}

function hasValidKey(config) {
  return config.key !== undefined;
}

const ReactElement = function (type, key, ref, _self, _source, owner, props) {
  const element = {
    $$typeof: TOY_REACT_ELEMENT_TYPE,

    type,
    key,
    ref,
    props,

    _owner: owner,
  };

  return element;
};

export function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    if (hasValidKey) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__self === undefined ? null : config.__source;

    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  const reactElement = ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ToyReactCurrentOwner.current,
    props
  );

  console.log(reactElement);

  return reactElement;
}
