/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Foo.js":
/*!*******************************!*\
  !*** ./src/components/Foo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   App: () => (/* binding */ App)\n/* harmony export */ });\n\n\n__webpack_require__(/*! ../assets/styles/global.css */ \"./src/assets/styles/global.css\");\nconst ToyReact = __webpack_require__(/*! toy-react */ \"../../packages/toy-react/index.js\");\nconst styles = {\n  wrapper: {\n    maxWidth: '768px',\n    width: '100%',\n    height: '100%',\n    margin: 'auto',\n    background: 'palegoldenrod',\n    display: 'flex',\n    placeContent: 'center',\n    placeItems: 'center'\n  },\n  header: {\n    color: 'white',\n    padding: '1rem',\n    margin: 0\n  }\n};\nconst App = () => {\n  return /*#__PURE__*/ToyReact.createElement(\"main\", {\n    style: styles.wrapper\n  }, /*#__PURE__*/ToyReact.createElement(\"header\", null, /*#__PURE__*/ToyReact.createElement(\"h1\", {\n    style: styles.header\n  }, \"This is ToyReact(with SSG)!\")), /*#__PURE__*/ToyReact.createElement(\"div\", null, \"Foo Page\"));\n};\n\n//# sourceURL=webpack://ssg-app/./src/components/Foo.js?");

/***/ }),

/***/ "./src/pages/foo.js":
/*!**************************!*\
  !*** ./src/pages/foo.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst ToyReact = __webpack_require__(/*! toy-react */ \"../../packages/toy-react/index.js\");\nconst ToyReactDOM = __webpack_require__(/*! toy-react-dom */ \"../../packages/toy-react-dom/index.js\");\nconst {\n  Foo\n} = __webpack_require__(/*! ../components/Foo */ \"./src/components/Foo.js\");\nToyReactDOM.hydrate( /*#__PURE__*/ToyReact.createElement(Foo, null), document.getElementById('root'));\n\n//# sourceURL=webpack://ssg-app/./src/pages/foo.js?");

/***/ }),

/***/ "../../packages/toy-react-dom/index.js":
/*!*********************************************!*\
  !*** ../../packages/toy-react-dom/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hydrate: () => (/* reexport safe */ _src_client_ToyReactDOM__WEBPACK_IMPORTED_MODULE_0__.hydrate),\n/* harmony export */   render: () => (/* reexport safe */ _src_client_ToyReactDOM__WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   useStateImpl: () => (/* reexport safe */ _src_client_ToyReactDOM__WEBPACK_IMPORTED_MODULE_0__.useStateImpl)\n/* harmony export */ });\n/* harmony import */ var _src_client_ToyReactDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/client/ToyReactDOM */ \"../../packages/toy-react-dom/src/client/ToyReactDOM.js\");\n\n\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-dom/index.js?");

/***/ }),

/***/ "../../packages/toy-react-dom/src/client/ToyReactDOM.js":
/*!**************************************************************!*\
  !*** ../../packages/toy-react-dom/src/client/ToyReactDOM.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hydrate: () => (/* reexport safe */ _ToyReactDOMLegacy__WEBPACK_IMPORTED_MODULE_0__.hydrate),\n/* harmony export */   render: () => (/* reexport safe */ _ToyReactDOMLegacy__WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   useStateImpl: () => (/* reexport safe */ _ToyReactDOMLegacy__WEBPACK_IMPORTED_MODULE_0__.useStateImpl)\n/* harmony export */ });\n/* harmony import */ var _ToyReactDOMLegacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToyReactDOMLegacy */ \"../../packages/toy-react-dom/src/client/ToyReactDOMLegacy.js\");\n\n\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-dom/src/client/ToyReactDOM.js?");

/***/ }),

/***/ "../../packages/toy-react-dom/src/client/ToyReactDOMLegacy.js":
/*!********************************************************************!*\
  !*** ../../packages/toy-react-dom/src/client/ToyReactDOMLegacy.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hydrate: () => (/* binding */ hydrate),\n/* harmony export */   render: () => (/* binding */ render),\n/* harmony export */   useStateImpl: () => (/* binding */ useStateImpl)\n/* harmony export */ });\n/* harmony import */ var toy_react_reconciler_src_ToyReactFiberReconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toy-react-reconciler/src/ToyReactFiberReconciler */ \"../../packages/toy-react-reconciler/src/ToyReactFiberReconciler.js\");\n\n\n\nconst internals = {\n  nextUnitOfWork: null,\n  currentRoot: null,\n  wipRoot: null,\n  deletions: null,\n  wipFiber: null,\n  hookIndex: null\n};\nfunction render(element, container) {\n  internals.wipRoot = {\n    dom: container,\n    props: {\n      children: [element]\n    },\n    alternate: internals.currentRoot\n  };\n  internals.deletions = [];\n  internals.nextUnitOfWork = internals.wipRoot;\n  (0,toy_react_reconciler_src_ToyReactFiberReconciler__WEBPACK_IMPORTED_MODULE_0__.flushSync)(internals);\n}\nfunction isEvent(key) {\n  return key.startsWith('on');\n}\nfunction isStyle(key) {\n  return key === 'style';\n}\nfunction isChildren(key) {\n  return key === 'children';\n}\nfunction isProperty(key) {\n  return !isChildren() && !isEvent(key) && !isStyle(key);\n}\nfunction hydrate(element, container) {\n  const prevChildren = Array.from(container.childNodes);\n  const nextChildren = Array.isArray(element) ? element : [element];\n  nextChildren.forEach((nextChild, index) => {\n    const prevChild = prevChildren[index];\n    if (prevChild) {\n      if (nextChild.type === 'TEXT_ELEMENT') {\n        prevChildren.textContent = nextChild.props.nodeValue;\n      } else if (nextChild.type instanceof Function) {\n        const component = nextChild.type(nextChild.props);\n        const child = component.render ? component.render() : component;\n        for (const prop in child.props) {\n          if (isChildren(prop)) {\n            continue;\n          }\n          if (isStyle(prop)) {\n            const styles = Object.entries(child.props[prop]);\n            styles.forEach(_ref => {\n              let [key, value] = _ref;\n              prevChild[prop][key] = value;\n            });\n          }\n          if (isProperty(prop)) {\n            prevChild[prop] = nextChild.props[prop];\n          }\n          if (isEvent(prop)) {\n            const eventType = prop.toLowerCase().substring(2);\n            prevChild.addEventListener(eventType, nextChild.props[prop]);\n          }\n        }\n        hydrate(child.props.children, prevChild);\n      } else {\n        hydrate(nextChild.props.children, prevChild);\n        for (const prop in nextChild.props) {\n          if (isChildren(prop)) {\n            continue;\n          }\n          if (isStyle(prop)) {\n            const styles = Object.entries(nextChild.props[prop]);\n            styles.forEach(_ref2 => {\n              let [key, value] = _ref2;\n              prevChild[prop][key] = value;\n            });\n          }\n          if (isProperty(prop)) {\n            prevChild[prop] = nextChild.props[prop];\n          }\n          if (isEvent(prop)) {\n            const eventType = prop.toLowerCase().substring(2);\n            prevChild.addEventListener(eventType, nextChild.props[prop]);\n          }\n        }\n      }\n    } else {\n      container.appendChild(createDom(nextChild));\n    }\n  });\n  while (prevChildren.length > nextChildren.length) {\n    container.removeChild(prevChildren.pop());\n  }\n  function createDom(element) {\n    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode(element.props.nodeValue) : document.createElement(element.type);\n    Object.keys(element.props).forEach(key => {\n      if (isChildren(key)) {\n        element.props[key].forEach(child => {\n          dom.appendChild(createDom(child));\n        });\n      }\n      if (isStyle(key)) {\n        dom.style[key] = element.props[key];\n      }\n      if (isProperty(key)) {\n        dom[key] = element.props[key];\n      }\n      if (isEvent(key)) {\n        const eventType = key.toLowerCase().substring(2);\n        dom.addEventListener(eventType, dom.props[key]);\n      }\n    });\n    return dom;\n  }\n}\nfunction useStateImpl(initial) {\n  const oldHook = internals.wipFiber.alternate && internals.wipFiber.alternate.hooks && internals.wipFiber.alternate.hooks[internals.hookIndex];\n  const hook = {\n    state: oldHook ? oldHook.state : initial,\n    queue: []\n  };\n  const actions = oldHook ? oldHook.queue : [];\n  actions.forEach(action => {\n    hook.state = action(hook.state);\n  });\n  const setState = action => {\n    hook.queue.push(action);\n    internals.wipRoot = {\n      dom: internals.currentRoot.dom,\n      props: internals.currentRoot.props,\n      alternate: internals.currentRoot\n    };\n    internals.nextUnitOfWork = internals.wipRoot;\n    internals.deletions = [];\n  };\n  internals.wipFiber.hooks.push(hook);\n  internals.hookIndex++;\n  return [hook.state, setState];\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-dom/src/client/ToyReactDOMLegacy.js?");

/***/ }),

/***/ "../../packages/toy-react-reconciler/src/ToyReactFiberBeginWork.js":
/*!*************************************************************************!*\
  !*** ../../packages/toy-react-reconciler/src/ToyReactFiberBeginWork.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateFunctionComponent: () => (/* binding */ updateFunctionComponent),\n/* harmony export */   updateHostComponent: () => (/* binding */ updateHostComponent)\n/* harmony export */ });\n/* harmony import */ var _ToyReactFiberReconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToyReactFiberReconciler */ \"../../packages/toy-react-reconciler/src/ToyReactFiberReconciler.js\");\n\n\n\nfunction reconcileChildren(wipFiber, elements, internals) {\n  let index = 0;\n  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;\n  let prevSibling = null;\n  while (index < elements.length || oldFiber != null) {\n    const element = elements[index];\n    let newFiber = null;\n    const sameType = oldFiber && element && element.type == oldFiber.type;\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: 'UPDATE'\n      };\n    }\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: 'PLACEMENT'\n      };\n    }\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = 'DELETION';\n      internals.deletions.push(oldFiber);\n    }\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    }\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else if (element) {\n      prevSibling.sibling = newFiber;\n    }\n    prevSibling = newFiber;\n    index++;\n  }\n}\nfunction updateFunctionComponent(fiber, internals) {\n  internals.wipFiber = fiber;\n  internals.hookIndex = 0;\n  internals.wipFiber.hooks = [];\n  const children = [fiber.type(fiber.props)];\n  reconcileChildren(fiber, children, internals);\n}\nfunction updateHostComponent(fiber, internals) {\n  if (!fiber.dom) {\n    fiber.dom = (0,_ToyReactFiberReconciler__WEBPACK_IMPORTED_MODULE_0__.createDom)(fiber);\n  }\n  reconcileChildren(fiber, fiber.props.children, internals);\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-reconciler/src/ToyReactFiberBeginWork.js?");

/***/ }),

/***/ "../../packages/toy-react-reconciler/src/ToyReactFiberCommitWork.js":
/*!**************************************************************************!*\
  !*** ../../packages/toy-react-reconciler/src/ToyReactFiberCommitWork.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   commitWork: () => (/* binding */ commitWork)\n/* harmony export */ });\n/* harmony import */ var _ToyReactFiberReconciler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToyReactFiberReconciler */ \"../../packages/toy-react-reconciler/src/ToyReactFiberReconciler.js\");\n\n\n\nfunction commitDeletion(fiber, domParent) {\n  if (fiber.dom) {\n    domParent.removeChild(fiber.dom);\n  } else {\n    commitDeletion(fiber.child, domParent);\n  }\n}\nfunction commitWork(fiber) {\n  if (!fiber) {\n    return;\n  }\n  let domParentFiber = fiber.parent;\n  while (!domParentFiber.dom) {\n    domParentFiber = domParentFiber.parent;\n  }\n  const domParent = domParentFiber.dom;\n  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {\n    (0,_ToyReactFiberReconciler__WEBPACK_IMPORTED_MODULE_0__.updateDom)(fiber.dom, fiber.alternate.props, fiber.props);\n  } else if (fiber.effectTag === 'DELETION') {\n    commitDeletion(fiber, domParent);\n  }\n  commitWork(fiber.child);\n  commitWork(fiber.sibling);\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-reconciler/src/ToyReactFiberCommitWork.js?");

/***/ }),

/***/ "../../packages/toy-react-reconciler/src/ToyReactFiberReconciler.js":
/*!**************************************************************************!*\
  !*** ../../packages/toy-react-reconciler/src/ToyReactFiberReconciler.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createDom: () => (/* binding */ createDom),\n/* harmony export */   flushSync: () => (/* reexport safe */ _ToyReactFiberWorkLoop__WEBPACK_IMPORTED_MODULE_0__.flushSync),\n/* harmony export */   updateDom: () => (/* binding */ updateDom)\n/* harmony export */ });\n/* harmony import */ var _ToyReactFiberWorkLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToyReactFiberWorkLoop */ \"../../packages/toy-react-reconciler/src/ToyReactFiberWorkLoop.js\");\n\n\n\nfunction isEvent(key) {\n  return key.startsWith('on');\n}\nfunction isStyle(key) {\n  return key === 'style';\n}\nfunction isProperty(key) {\n  return key !== 'children' && !isEvent(key) && !isStyle(key);\n}\nfunction isNew(prev, next) {\n  return function (key) {\n    return prev[key] !== next[key];\n  };\n}\nfunction isGone(prev, next) {\n  return function (key) {\n    return !(key in next);\n  };\n}\nfunction updateDom(dom, prevProps, nextProps) {\n  //Remove old or changed event listeners\n  Object.keys(prevProps).filter(isEvent).filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  });\n\n  // Remove old properties\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(name => {\n    dom[name] = '';\n  });\n\n  // Remove old styles\n  const prevStyles = prevProps.style || {};\n  const nextStyles = nextProps.style || {};\n  Object.keys(prevStyles).filter(isGone(prevStyles, nextStyles)).forEach(name => {\n    dom.style[name] = '';\n  });\n\n  // Set new or changed styles\n  Object.keys(nextStyles).filter(isNew(prevStyles, nextStyles)).forEach(name => {\n    dom.style[name] = nextStyles[name];\n  });\n\n  // Set new or changed properties\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(name => {\n    dom[name] = nextProps[name];\n  });\n\n  // Add event listeners\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(name => {\n    const eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\nfunction createDom(fiber) {\n  if (!fiber) {\n    return;\n  }\n  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type);\n  updateDom(dom, {}, fiber.props);\n  return dom;\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-reconciler/src/ToyReactFiberReconciler.js?");

/***/ }),

/***/ "../../packages/toy-react-reconciler/src/ToyReactFiberWorkLoop.js":
/*!************************************************************************!*\
  !*** ../../packages/toy-react-reconciler/src/ToyReactFiberWorkLoop.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   flushSync: () => (/* binding */ flushSync)\n/* harmony export */ });\n/* harmony import */ var _ToyScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToyScheduler */ \"../../packages/toy-react-reconciler/src/ToyScheduler.js\");\n/* harmony import */ var _ToyReactFiberBeginWork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToyReactFiberBeginWork */ \"../../packages/toy-react-reconciler/src/ToyReactFiberBeginWork.js\");\n/* harmony import */ var _ToyReactFiberCommitWork__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToyReactFiberCommitWork */ \"../../packages/toy-react-reconciler/src/ToyReactFiberCommitWork.js\");\n\n\n\n\n\nfunction performUnitOfWork(fiber, internals) {\n  const isFunctionComponent = fiber.type instanceof Function;\n  if (isFunctionComponent) {\n    (0,_ToyReactFiberBeginWork__WEBPACK_IMPORTED_MODULE_1__.updateFunctionComponent)(fiber, internals);\n  } else {\n    (0,_ToyReactFiberBeginWork__WEBPACK_IMPORTED_MODULE_1__.updateHostComponent)(fiber, internals);\n  }\n  if (fiber.child) {\n    return fiber.child;\n  }\n  let nextFiber = fiber;\n  while (nextFiber) {\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    }\n    nextFiber = nextFiber.parent;\n  }\n}\nfunction commitRoot(internals) {\n  internals.deletions.forEach(_ToyReactFiberCommitWork__WEBPACK_IMPORTED_MODULE_2__.commitWork);\n  (0,_ToyReactFiberCommitWork__WEBPACK_IMPORTED_MODULE_2__.commitWork)(internals.wipRoot.child);\n  internals.currentRoot = internals.wipRoot;\n  internals.wipRoot = null;\n}\nfunction flushSync(internals) {\n  (0,_ToyScheduler__WEBPACK_IMPORTED_MODULE_0__.scheduleCallback)(commitRoot, performUnitOfWork, internals);\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-reconciler/src/ToyReactFiberWorkLoop.js?");

/***/ }),

/***/ "../../packages/toy-react-reconciler/src/ToyScheduler.js":
/*!***************************************************************!*\
  !*** ../../packages/toy-react-reconciler/src/ToyScheduler.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scheduleCallback: () => (/* reexport safe */ toy_scheduler__WEBPACK_IMPORTED_MODULE_0__.scheduleCallback)\n/* harmony export */ });\n/* harmony import */ var toy_scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toy-scheduler */ \"../../packages/toy-scheduler/index.js\");\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react-reconciler/src/ToyScheduler.js?");

/***/ }),

/***/ "../../packages/toy-react/index.js":
/*!*****************************************!*\
  !*** ../../packages/toy-react/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createElement: () => (/* reexport safe */ _src_ToyReact__WEBPACK_IMPORTED_MODULE_0__.createElement),\n/* harmony export */   useState: () => (/* reexport safe */ _src_ToyReact__WEBPACK_IMPORTED_MODULE_0__.useState)\n/* harmony export */ });\n/* harmony import */ var _src_ToyReact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ToyReact */ \"../../packages/toy-react/src/ToyReact.js\");\n\n\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react/index.js?");

/***/ }),

/***/ "../../packages/toy-react/src/ToyReact.js":
/*!************************************************!*\
  !*** ../../packages/toy-react/src/ToyReact.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createElement: () => (/* reexport safe */ _ToyReactElement__WEBPACK_IMPORTED_MODULE_0__.createElement),\n/* harmony export */   useState: () => (/* reexport safe */ _ToyReactHooks__WEBPACK_IMPORTED_MODULE_1__.useState)\n/* harmony export */ });\n/* harmony import */ var _ToyReactElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToyReactElement */ \"../../packages/toy-react/src/ToyReactElement.js\");\n/* harmony import */ var _ToyReactHooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToyReactHooks */ \"../../packages/toy-react/src/ToyReactHooks.js\");\n\n\n\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react/src/ToyReact.js?");

/***/ }),

/***/ "../../packages/toy-react/src/ToyReactElement.js":
/*!*******************************************************!*\
  !*** ../../packages/toy-react/src/ToyReactElement.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createElement: () => (/* binding */ createElement)\n/* harmony export */ });\n\n\nfunction createTextElement(node) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: node,\n      children: []\n    }\n  };\n}\nfunction createElement(type, config) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n  const props = {\n    ...config,\n    children: children.map(child => typeof child === 'object' ? child : createTextElement(child))\n  };\n  return {\n    type,\n    props\n  };\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react/src/ToyReactElement.js?");

/***/ }),

/***/ "../../packages/toy-react/src/ToyReactHooks.js":
/*!*****************************************************!*\
  !*** ../../packages/toy-react/src/ToyReactHooks.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useState: () => (/* reexport safe */ toy_react_dom_src_client_ToyReactDOMLegacy__WEBPACK_IMPORTED_MODULE_0__.useStateImpl)\n/* harmony export */ });\n/* harmony import */ var toy_react_dom_src_client_ToyReactDOMLegacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toy-react-dom/src/client/ToyReactDOMLegacy */ \"../../packages/toy-react-dom/src/client/ToyReactDOMLegacy.js\");\n\n\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-react/src/ToyReactHooks.js?");

/***/ }),

/***/ "../../packages/toy-scheduler/index.js":
/*!*********************************************!*\
  !*** ../../packages/toy-scheduler/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scheduleCallback: () => (/* reexport safe */ _src_forks_ToyScheduler__WEBPACK_IMPORTED_MODULE_0__.scheduleCallback)\n/* harmony export */ });\n/* harmony import */ var _src_forks_ToyScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forks/ToyScheduler */ \"../../packages/toy-scheduler/src/forks/ToyScheduler.js\");\n\n\n\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-scheduler/index.js?");

/***/ }),

/***/ "../../packages/toy-scheduler/src/forks/ToyScheduler.js":
/*!**************************************************************!*\
  !*** ../../packages/toy-scheduler/src/forks/ToyScheduler.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   scheduleCallback: () => (/* binding */ scheduleCallback)\n/* harmony export */ });\n\n\nfunction workLoop(deadline, commitRoot, performUnitOfWork, internals) {\n  let shouldYield = false;\n  while (internals.nextUnitOfWork && !shouldYield) {\n    internals.nextUnitOfWork = performUnitOfWork(internals.nextUnitOfWork, internals);\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n  if (!internals.nextUnitOfWork && internals.wipRoot) {\n    commitRoot(internals);\n  }\n  requestIdleCallback(deadline => workLoop(deadline, commitRoot, performUnitOfWork, internals));\n}\nfunction scheduleCallback(commitRoot, performUnitOfWork, internals) {\n  requestIdleCallback(deadline => workLoop(deadline, commitRoot, performUnitOfWork, internals));\n}\n\n//# sourceURL=webpack://ssg-app/../../packages/toy-scheduler/src/forks/ToyScheduler.js?");

/***/ }),

/***/ "./src/assets/styles/global.css":
/*!**************************************!*\
  !*** ./src/assets/styles/global.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ssg-app/./src/assets/styles/global.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/foo.js");
/******/ 	
/******/ })()
;