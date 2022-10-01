import _ from 'lodash';
import './style.css';
import timer from './timer.js';




const clock = function(pomo, shortbreak, longbreak) {
    let on = false;
    let elapsedTime = 0;
    let lap = 1;
    let currentLength = pomo;
    let currentMode = 'pomo';
    let remainingTime = pomo;


    const isOn = () => on;
    const getElapsedTime = () => elapsedTime;
    const getRemainingTime = () => remainingTime;
    const getMode = () => currentMode;


    const elapse = () => {
        elapsedTime++;
        if (remainingTime != 0) {
            remainingTime--;
        };
    };
    const start = () => {
        on = true;
    };
    const stop = () => {
        on = false;
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
        };
        console.log(lap);
        console.log(currentMode);
    };

    const setMode = (mode, override=false) =>  { //override lap system for manual break length
        if (mode == 'pomo'){
            currentMode = mode;
            currentLength = pomo;
            if (override) {
                lap = 1;
            };
        } else if (mode == 'shortbreak') {
            currentMode = mode;
            currentLength = shortbreak
            if (override) {
                lap = 2;
            };
        } else if (mode == 'longbreak') {
            currentMode = mode;
            currentLength = longbreak;
            if (override) {
                lap = 0;
            };
        };
        reset();
        console.log(mode);
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
        remainingTime = currentLength;
    };

    const save = () => {
        console.log('save func')
    };

    return {getMode, setMode, isOn, getElapsedTime, getRemainingTime, elapse, start, stop, next, finished, reset, save};
};

const ui = (() => {
    let primaryClock = document.querySelector('.primaryclock');
    let secondaryClock = document.querySelector('.secondaryclock');
    let body = document.querySelector('body');
    let ToggleBtn = document.querySelector('.toggle');

    const refreshClock = (clockObj) => {
        primaryClock.textContent = parseTime(clockObj.getRemainingTime());
        secondaryClock.textContent = parseTime(clockObj.getElapsedTime());
        if (clockObj.finished()) {
            body.classList.add('finished')

        } else {
            body.classList.remove('finished')
        };

        if (clockObj.isOn()) {
            body.classList.add('active');
            ToggleBtn.textContent = 'STOP';
        } else {
            body.classList.remove('active');
            ToggleBtn.textContent = 'START';
        };
    };
    const refreshColor = (clockObj) => {
        body.classList.remove('pomo', 'shortbreak', 'longbreak');
        body.classList.add(clockObj.getMode());
    };
    

    return {refreshClock, refreshColor};
})();

let ToggleBtn = document.querySelector('.toggle');
ToggleBtn.addEventListener('click', function(){
    if (!session.isOn()) {
        session.start();
        console.log('newtick');
        tick();
    } else {
        session.stop();
    }
    ui.refreshClock(session);

});

let resetBtn = document.querySelector('.reset');
resetBtn.addEventListener('click', function(){
    session.reset();
    ui.refreshClock(session);
    ui.refreshColor(session);
});

let NextBtn = document.querySelector('.skip');
NextBtn.addEventListener('click', function(){
    session.next();
    session.reset();
    ui.refreshClock(session);
    ui.refreshColor(session);
});

let ModeBtns = document.querySelectorAll('.modes *')
ModeBtns.forEach((btn)=> {
btn.addEventListener('click', () => {
    session.setMode(btn.id, true);
    ui.refreshClock(session);
    ui.refreshColor(session);
});
});

let timerId = 'tik'; //must be declared so function can reference timer ID
const tick = () => {
    clearTimeout(timerId);
    timerId = setTimeout(function() {
        if (session.isOn()) {
            session.elapse();
            ui.refreshClock(session);
            tick();
        };
    }, 1000);
};

const parseTime = (seconds) => {
    let hr = Math.floor(seconds / 3600);
    let hrRemainder = seconds % 3600;
    let min = Math.floor(hrRemainder / 60);
    let sec = hrRemainder % 60;

    // if 0 hours, don't display any numbers
    let strHr = (hr > 0) ? `${hr}:` : ''

    let strMin = (min > 9) ? min : `0${min}`
    let strSec = (sec > 9) ? sec : `0${sec}`

    return (`${strHr}${strMin}:${strSec}`)
};


let session = clock((25*60), (5*60), (10*60));


ui.refreshClock(session);