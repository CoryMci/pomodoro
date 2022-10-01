import _ from 'lodash';
import './style.css';
import timer from './timer.js';




const clock = function(type, length) {
    let on = false;
    let elapsedTime = 0;
    let remainingTime = length;

    const isOn = () => on;
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

    return {type, length, isOn, getElapsedTime, getRemainingTime, elapse, start, stop, finished, reset};
};

const ui = (() => {
    let clockDom = document.querySelector('.clock');
    let body = document.querySelector('body');
    let ToggleBtn = document.querySelector('.toggle');

    const refresh = (clockObj) => {
        clockDom.textContent = parseTime(clockObj.getRemainingTime());

        if (clockObj.finished()) {
            body.classList.add('finished')
        } else {
            body.classList.remove('finished')
        };

        if (clockObj.isOn()) {
            body.classList.add('active');
        } else {
            body.classList.remove('active');
        };
    };

    return {refresh};
})();

let ToggleBtn = document.querySelector('.toggle');
ToggleBtn.addEventListener('click', function(){
    if (!session.isOn()) {
        session.start();
        tick();
    } else {
        session.stop();
    }
    ui.refresh(session);

});

const tick = () => {
    setTimeout(() => {
        if (session.isOn()) {
            session.elapse();
            ui.refresh(session);
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


let session = clock('Pomo', 5);


ui.refresh(session);