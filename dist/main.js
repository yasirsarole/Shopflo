/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  // fetch colors\n  var getColors = fetch('https://random-flat-colors.vercel.app/api/random?count=5');\n  var colorsContainer = document.querySelectorAll('.colors-container');\n  getColors.then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    var colorsHtml = '';\n    data.colors.map(function (color) {\n      colorsHtml += \"<li class=\\\"filter__list__color\\\" style=\\\"background-color:\".concat(color, \";\\\"></li>\");\n    });\n    colorsContainer.forEach(function (colorNode) {\n      colorNode.innerHTML = colorsHtml;\n    });\n  })[\"catch\"](function () {\n    confirm(\"Colors API failed to load\");\n    location.reload();\n  });\n\n  // open sidebar\n  var addCreativeButton = document.querySelector('.creatives__add');\n  var sidebar = document.querySelector('.sidebar');\n  var sideBarForm = document.getElementById('sidebarForm');\n  var error = document.querySelector('.error-message');\n  addCreativeButton.addEventListener('click', function (e) {\n    // reset filters\n    document.querySelectorAll('li').forEach(function (list) {\n      list.classList.remove('selected');\n    });\n    document.querySelector('.hidden-color').value = '';\n    error.textContent = 'Please fill all the fields.';\n    sideBarForm.reset();\n    e.target.classList.add('disable');\n    sidebar.classList.remove('hide');\n    error.classList.add('hide');\n  });\n\n  // close sidebar\n  var sideBarClose = document.querySelector('.sidebar__header__close');\n  sideBarClose.addEventListener('click', function (e) {\n    addCreativeButton.classList.remove('disable');\n    sidebar.classList.add('hide');\n  });\n\n  // create tiles\n  var containerTiles = document.querySelector('.container__tiles');\n  var rangeCounter = document.querySelector('.range-container__counter');\n  sideBarForm.onsubmit = function (e) {\n    e.preventDefault();\n    var formData = new FormData(e.target);\n    var color = formData.get('color');\n    var title = formData.get('title');\n    var subTitle = formData.get('subtitle');\n    var count = parseInt(rangeCounter.textContent);\n    if (title && subTitle && count < 5) {\n      containerTiles.innerHTML += \"<div class=\\\"tile\\\" data-content=\\\"\".concat(title + ' ' + subTitle, \"\\\" style=\\\"background-color:\").concat(color, \";\\\"><span class=\\\"title\\\">\").concat(title, \"</span><span class=\\\"subtitle\\\">\").concat(subTitle, \"</span></div>\");\n      rangeCounter.textContent = count + 1;\n      document.querySelector(\".range-container__range\").style.background = \"linear-gradient(to right, #000 \".concat((count + 1) * 20, \"%,#ffffff \").concat((count + 1) * 20, \"%)\");\n    } else {\n      if (count === 5) {\n        error.textContent = 'Limit Reached!';\n      }\n      error.classList.remove('hide');\n    }\n  };\n\n  // set color\n  var sideBarFilterList = document.querySelector('.sidebar__filter__list');\n  sideBarFilterList.addEventListener('click', function (e) {\n    document.querySelectorAll('li').forEach(function (list) {\n      list.classList.remove('selected');\n    });\n    if (e.target.nodeName === 'LI') {\n      e.target.classList.add('selected');\n      document.querySelector('.hidden-color').value = e.target.style['background-color'];\n    }\n  });\n\n  // filter by color\n  var containerFilterList = document.querySelector('.container__filter__list');\n  var tiles = document.querySelectorAll('.tile');\n  containerFilterList.addEventListener('click', function (e) {\n    if (e.target.nodeName === 'LI') {\n      var color = e.target.style['background-color'];\n      if (e.target.classList.contains('selected')) {\n        e.target.classList.remove('selected');\n        tiles.forEach(function (tile) {\n          tile.classList.remove('hide');\n        });\n      } else {\n        e.target.classList.add('selected');\n        tiles.forEach(function (tile) {\n          if (tile.style['background-color'] !== color) {\n            tile.classList.add('hide');\n          }\n        });\n      }\n    }\n  });\n\n  // filter by text\n  var debounce = function debounce(fn, delay) {\n    var timer;\n    return function () {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n      if (timer) clearTimeout(timer);\n      timer = setTimeout(function () {\n        fn.apply(void 0, args);\n      }, delay);\n    };\n  };\n  var filteredText = document.querySelector('.container__filter__search');\n  filteredText.addEventListener('input', debounce(function (e) {\n    var value = e.target.value;\n    document.querySelectorAll('.tile').forEach(function (tile) {\n      tile.classList.remove('hide');\n      if (!tile.dataset.content.includes(value)) {\n        tile.classList.add('hide');\n      } else {\n        tile.classList.remove('hide');\n      }\n    });\n  }, 1000));\n});\n\n//# sourceURL=webpack://my-webpack-project/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;