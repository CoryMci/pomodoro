import _ from 'lodash';
import './style.css';
import timer from './timer.js';




const clock = function(type, length) {
    let on = false;
    let elapsedTime = 0;
    let remainingTime = length;

    const getOn = () => on;
    const getElapsedTime = () => elapsedTime;
    const getRemainingTime = () => remainingTime;

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
        remainingTime = length;
    }

    return {type, length, getOn, getElapsedTime, getRemainingTime, elapse, start, stop, finished, reset};
};


const tick = () => {
    setTimeout(() => {
        if (session.getOn()) {
            session.elapse();
            refresh();
            tick();
        };
    }, 1000);
};

let session = clock('Pomo', 5);

const refresh = () => {
    let clockDom = document.querySelector('.clock');
    clockDom.textContent = session.getRemainingTime();
};

let ToggleBtn = document.querySelector('.toggle');
ToggleBtn.addEventListener('click', function(){
    session.start();
    tick();
});