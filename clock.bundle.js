"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["clock"],{

/***/ "./src/clock.js":
/*!**********************!*\
  !*** ./src/clock.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const clock = function(pomo, shortbreak, longbreak) {
    let on = false;
    let elapsedTime = 0;
    let clockStart = Math.round(Date.now() / 1000);
    let carryTime = 0;
    let lap = 1;
    let currentLength = pomo;
    let currentMode = 'pomo';
    let remainingTime = pomo;



    const isOn = () => on;
    const getElapsedTime = () => elapsedTime;
    const getRemainingTime = () => remainingTime;
    const getMode = () => currentMode;


    const elapse = () => {
        elapsedTime = carryTime + Math.round(Date.now() / 1000) - clockStart;
        if (remainingTime >= 1) {
            remainingTime = currentLength - elapsedTime;
            if (remainingTime < 0) {
                //prevents displaying negative remaining time due to browser lag
                remainingTime = 0;
            }
        }
    };
    const start = () => {
        on = true;
        clockStart = Math.round(Date.now() / 1000);
    };
    const stop = () => {
        on = false;
        carryTime = elapsedTime;
    };


    const next = () => { //lap system used to automatically choose long break
        lap++;
        if (lap == 6) {
            setMode('longbreak')
            lap = 0;
        } else if (currentMode == 'pomo') {
            setMode('shortbreak');
        } else {
            setMode('pomo');
        }
    };

    const setMode = (mode, override=false) =>  { //override lap system for manual break length
        if (mode == 'pomo'){
            currentMode = mode;
            currentLength = pomo;
            if (override) {
                lap = 1;
            }
        } else if (mode == 'shortbreak') {
            currentMode = mode;
            currentLength = shortbreak
            if (override) {
                lap = 2;
            }
        } else if (mode == 'longbreak') {
            currentMode = mode;
            currentLength = longbreak;
            if (override) {
                lap = 0;
            }
        }
        reset();
        console.log(mode);
    };
    
    const setPomoTime = (num) => {
        pomo = num;
        if (currentMode == 'pomo') {
            if (pomo >= elapsedTime) {
                currentLength = pomo
                remainingTime = currentLength - elapsedTime
            } else {
                remainingTime = 0
            }
        }
    };

    const setShortBreakTime = (num) => {
        shortbreak = num;
        if (currentMode == 'shortbreak') {
            if (shortbreak >= elapsedTime) {
                currentLength = shortbreak;
                remainingTime = currentLength - elapsedTime;
            } else {
                remainingTime = 0
            }
        }
    }; 
    
    const setLongBreakTime = (num) => {
        longbreak = num;
        if (currentMode == 'longbreak') {
            if (longbreak >= elapsedTime) {
                currentLength = longbreak;
                remainingTime = currentLength - elapsedTime;
            } else {
                remainingTime = 0
            }
        }
    };

    const finished = () => {
        if (remainingTime == 0) {
            return true;
        } else {
            return false;
        }
    };

    const reset = () => {
        on = false;
        elapsedTime = 0;
        carryTime = 0;
        remainingTime = currentLength;
    };

    const save = () => {
        console.log('save func')
    };

    return {getMode, setMode, setPomoTime, setShortBreakTime, setLongBreakTime, isOn, getElapsedTime, getRemainingTime, elapse, start, stop, next, finished, reset, save};
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clock);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/clock.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBLGlFQUFlLEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvY2xvY2suanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY2xvY2sgPSBmdW5jdGlvbihwb21vLCBzaG9ydGJyZWFrLCBsb25nYnJlYWspIHtcbiAgICBsZXQgb24gPSBmYWxzZTtcbiAgICBsZXQgZWxhcHNlZFRpbWUgPSAwO1xuICAgIGxldCBjbG9ja1N0YXJ0ID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgbGV0IGNhcnJ5VGltZSA9IDA7XG4gICAgbGV0IGxhcCA9IDE7XG4gICAgbGV0IGN1cnJlbnRMZW5ndGggPSBwb21vO1xuICAgIGxldCBjdXJyZW50TW9kZSA9ICdwb21vJztcbiAgICBsZXQgcmVtYWluaW5nVGltZSA9IHBvbW87XG5cblxuXG4gICAgY29uc3QgaXNPbiA9ICgpID0+IG9uO1xuICAgIGNvbnN0IGdldEVsYXBzZWRUaW1lID0gKCkgPT4gZWxhcHNlZFRpbWU7XG4gICAgY29uc3QgZ2V0UmVtYWluaW5nVGltZSA9ICgpID0+IHJlbWFpbmluZ1RpbWU7XG4gICAgY29uc3QgZ2V0TW9kZSA9ICgpID0+IGN1cnJlbnRNb2RlO1xuXG5cbiAgICBjb25zdCBlbGFwc2UgPSAoKSA9PiB7XG4gICAgICAgIGVsYXBzZWRUaW1lID0gY2FycnlUaW1lICsgTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCkgLSBjbG9ja1N0YXJ0O1xuICAgICAgICBpZiAocmVtYWluaW5nVGltZSA+PSAxKSB7XG4gICAgICAgICAgICByZW1haW5pbmdUaW1lID0gY3VycmVudExlbmd0aCAtIGVsYXBzZWRUaW1lO1xuICAgICAgICAgICAgaWYgKHJlbWFpbmluZ1RpbWUgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy9wcmV2ZW50cyBkaXNwbGF5aW5nIG5lZ2F0aXZlIHJlbWFpbmluZyB0aW1lIGR1ZSB0byBicm93c2VyIGxhZ1xuICAgICAgICAgICAgICAgIHJlbWFpbmluZ1RpbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgb24gPSB0cnVlO1xuICAgICAgICBjbG9ja1N0YXJ0ID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgfTtcbiAgICBjb25zdCBzdG9wID0gKCkgPT4ge1xuICAgICAgICBvbiA9IGZhbHNlO1xuICAgICAgICBjYXJyeVRpbWUgPSBlbGFwc2VkVGltZTtcbiAgICB9O1xuXG5cbiAgICBjb25zdCBuZXh0ID0gKCkgPT4geyAvL2xhcCBzeXN0ZW0gdXNlZCB0byBhdXRvbWF0aWNhbGx5IGNob29zZSBsb25nIGJyZWFrXG4gICAgICAgIGxhcCsrO1xuICAgICAgICBpZiAobGFwID09IDYpIHtcbiAgICAgICAgICAgIHNldE1vZGUoJ2xvbmdicmVhaycpXG4gICAgICAgICAgICBsYXAgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRNb2RlID09ICdwb21vJykge1xuICAgICAgICAgICAgc2V0TW9kZSgnc2hvcnRicmVhaycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0TW9kZSgncG9tbycpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldE1vZGUgPSAobW9kZSwgb3ZlcnJpZGU9ZmFsc2UpID0+ICB7IC8vb3ZlcnJpZGUgbGFwIHN5c3RlbSBmb3IgbWFudWFsIGJyZWFrIGxlbmd0aFxuICAgICAgICBpZiAobW9kZSA9PSAncG9tbycpe1xuICAgICAgICAgICAgY3VycmVudE1vZGUgPSBtb2RlO1xuICAgICAgICAgICAgY3VycmVudExlbmd0aCA9IHBvbW87XG4gICAgICAgICAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgICAgICBsYXAgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ3Nob3J0YnJlYWsnKSB7XG4gICAgICAgICAgICBjdXJyZW50TW9kZSA9IG1vZGU7XG4gICAgICAgICAgICBjdXJyZW50TGVuZ3RoID0gc2hvcnRicmVha1xuICAgICAgICAgICAgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgICAgICAgICAgbGFwID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdsb25nYnJlYWsnKSB7XG4gICAgICAgICAgICBjdXJyZW50TW9kZSA9IG1vZGU7XG4gICAgICAgICAgICBjdXJyZW50TGVuZ3RoID0gbG9uZ2JyZWFrO1xuICAgICAgICAgICAgaWYgKG92ZXJyaWRlKSB7XG4gICAgICAgICAgICAgICAgbGFwID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXNldCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhtb2RlKTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IHNldFBvbW9UaW1lID0gKG51bSkgPT4ge1xuICAgICAgICBwb21vID0gbnVtO1xuICAgICAgICBpZiAoY3VycmVudE1vZGUgPT0gJ3BvbW8nKSB7XG4gICAgICAgICAgICBpZiAocG9tbyA+PSBlbGFwc2VkVGltZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMZW5ndGggPSBwb21vXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGltZSA9IGN1cnJlbnRMZW5ndGggLSBlbGFwc2VkVGltZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1haW5pbmdUaW1lID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldFNob3J0QnJlYWtUaW1lID0gKG51bSkgPT4ge1xuICAgICAgICBzaG9ydGJyZWFrID0gbnVtO1xuICAgICAgICBpZiAoY3VycmVudE1vZGUgPT0gJ3Nob3J0YnJlYWsnKSB7XG4gICAgICAgICAgICBpZiAoc2hvcnRicmVhayA+PSBlbGFwc2VkVGltZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMZW5ndGggPSBzaG9ydGJyZWFrO1xuICAgICAgICAgICAgICAgIHJlbWFpbmluZ1RpbWUgPSBjdXJyZW50TGVuZ3RoIC0gZWxhcHNlZFRpbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbWFpbmluZ1RpbWUgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9OyBcbiAgICBcbiAgICBjb25zdCBzZXRMb25nQnJlYWtUaW1lID0gKG51bSkgPT4ge1xuICAgICAgICBsb25nYnJlYWsgPSBudW07XG4gICAgICAgIGlmIChjdXJyZW50TW9kZSA9PSAnbG9uZ2JyZWFrJykge1xuICAgICAgICAgICAgaWYgKGxvbmdicmVhayA+PSBlbGFwc2VkVGltZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMZW5ndGggPSBsb25nYnJlYWs7XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGltZSA9IGN1cnJlbnRMZW5ndGggLSBlbGFwc2VkVGltZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nVGltZSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBmaW5pc2hlZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlbWFpbmluZ1RpbWUgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgICAgIG9uID0gZmFsc2U7XG4gICAgICAgIGVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgY2FycnlUaW1lID0gMDtcbiAgICAgICAgcmVtYWluaW5nVGltZSA9IGN1cnJlbnRMZW5ndGg7XG4gICAgfTtcblxuICAgIGNvbnN0IHNhdmUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzYXZlIGZ1bmMnKVxuICAgIH07XG5cbiAgICByZXR1cm4ge2dldE1vZGUsIHNldE1vZGUsIHNldFBvbW9UaW1lLCBzZXRTaG9ydEJyZWFrVGltZSwgc2V0TG9uZ0JyZWFrVGltZSwgaXNPbiwgZ2V0RWxhcHNlZFRpbWUsIGdldFJlbWFpbmluZ1RpbWUsIGVsYXBzZSwgc3RhcnQsIHN0b3AsIG5leHQsIGZpbmlzaGVkLCByZXNldCwgc2F2ZX07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbG9jazsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=