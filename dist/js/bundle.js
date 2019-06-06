/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/base */ \"./src/js/views/base.js\");\n/* harmony import */ var _models_pwa_install__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/pwa-install */ \"./src/js/models/pwa-install.js\");\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/pwa-install.js":
/*!**************************************!*\
  !*** ./src/js/models/pwa-install.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/base */ \"./src/js/views/base.js\");\n\nvar deferredPrompt;\n//check if there is no service worker install one\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker\n    .register('sw.js')\n    .then(function() {\n      console.log('Service worker registered!');\n    });\n}\n// prevent browser from triggering automatic save app and save that event in a var\nwindow.addEventListener('beforeinstallprompt', function(event) {\n  console.log('beforeinstallprompt fired');\n  event.preventDefault();\n  deferredPrompt = event;\n  //it shows our install button for devices except Apple's\n  if (deferredPrompt) {\n    _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].PWABtn.style.display = \"inline-block\";\n  }\n  return false;\n});\n// triggers the save app banner and console log the result\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].PWABtn.addEventListener(\"click\",() => {\n    if (deferredPrompt) {\n        \n        deferredPrompt.prompt();\n    \n        deferredPrompt.userChoice.then(function(choiceResult) {\n          console.log(choiceResult.outcome);\n    \n          if (choiceResult.outcome === 'dismissed') {\n            console.log('User cancelled installation');\n          } else {\n            console.log('User added to home screen');\n          }\n        });\n    \n        deferredPrompt = null;\n    }\n  })\n\n//detects whether the phone is apple and show the save app message\nif(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) &&\n!window.matchMedia('(display-mode: standalone)').matches){\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].iosAlert.style.display = \"block\";\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainContent.style.display = \"none\";\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].footer.style.display = \"none\";\n};\n_views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].PWACloseAlertBtn.addEventListener(\"click\",() => {\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].iosAlert.style.display = \"none\";\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainContent.style.display = \"initial\";\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].footer.style.display = \"initial\";\n  _views_base__WEBPACK_IMPORTED_MODULE_0__[\"elements\"].mainContent.style.transition = \"1s\";\n}) \n\n//when application runs (not app on browser)\nif (window.matchMedia('(display-mode: standalone)').matches) {\n  \n  //by using this localstorage method we execute code once \n  var alerted = localStorage.getItem('alerted') || '';\n  if (alerted != 'yes') {\n   alert(\" we are on mobile app\");\n   localStorage.setItem('alerted','yes');\n  }\n  \n}  \n\n//# sourceURL=webpack:///./src/js/models/pwa-install.js?");

/***/ }),

/***/ "./src/js/views/base.js":
/*!******************************!*\
  !*** ./src/js/views/base.js ***!
  \******************************/
/*! exports provided: elements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elements\", function() { return elements; });\nconst elements = {\n    PWABtn: document.querySelector('.PWA-btn'),\n    iosAlert: document.querySelector('.ios-pwa-alert'),\n    mainContent: document.querySelector('.main__content'),\n    footer: document.querySelector('footer'),\n    PWACloseAlertBtn: document.querySelector('.PWA__ios-alert--close'),\n}\n\n//# sourceURL=webpack:///./src/js/views/base.js?");

/***/ })

/******/ });