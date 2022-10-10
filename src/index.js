import _, { after } from 'lodash';
import './style.css';
import './fontstyle.css';
import alarm from './alarm.wav';
import clock from './clock.js';

const ui = (() => {
    let primaryClock = document.querySelector('.primaryclock');
    let secondaryClock = document.querySelector('.secondaryclock');
    let body = document.querySelector('body');
    let ToggleBtn = document.querySelector('.toggle');
    let ringer = false;
    let bell = new Audio(alarm);


    const refreshClock = (clockObj) => {
        document.title = parseTime(clockObj.getRemainingTime());
        primaryClock.textContent = parseTime(clockObj.getRemainingTime());
        secondaryClock.textContent = parseTime(clockObj.getElapsedTime());
        if (clockObj.finished()) {
            body.classList.add('finished')
            if (ringer == false) {
                //only play bell once
                bell.play();
                ringer = true;
            }

        } else {
            body.classList.remove('finished')
            ringer = false;
        }

        if (clockObj.isOn()) {
            body.classList.add('active');
            ToggleBtn.textContent = 'STOP';
        } else {
            body.classList.remove('active');
            ToggleBtn.textContent = 'START';
        }
    };
    const refreshColor = (clockObj) => {
        body.classList.remove('pomo', 'shortbreak', 'longbreak');
        body.classList.add(clockObj.getMode());
    };

    const toggleSettings = () => {
        if (document.querySelector('body').classList.contains('settingsmenu')) {
        document.querySelector('body').classList.remove('settingsmenu')
    } else {
        document.querySelector('body').classList.add('settingsmenu')
    }
    }
    

    return {refreshClock, refreshColor, toggleSettings};
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

let settingsBtn = document.querySelector('.settingsbtn')
settingsBtn.addEventListener('click', function () {
    ui.toggleSettings();
    
});

//close settings menu when user clicks elsewhere
document.addEventListener('click', (e) => {
    if (document.querySelector('body').classList.contains('settingsmenu')) {
        if (!e.target.closest('.settings') && !e.target.closest('.settingsbtn')) {
            console.log('nice');
            ui.toggleSettings();
        }
    }
});


let pomolengthslider = document.querySelector('#pomolength');
pomolengthslider.oninput = function() {
    session.setPomoTime(this.value * 60);
    ui.refreshClock(session);
    pomolengthslider.nextSibling.textContent = this.value;
};

let shortbreaklengthslider = document.querySelector('#shortbreaklength');
shortbreaklengthslider.oninput = function() {
    session.setShortBreakTime(this.value * 60);
    ui.refreshClock(session);
    shortbreaklengthslider.nextSibling.textContent = this.value;
};

let longbreaklengthslider = document.querySelector('#longbreaklength');
longbreaklengthslider.oninput = function() {
    session.setLongBreakTime(this.value * 60);
    ui.refreshClock(session);
    longbreaklengthslider.nextSibling.textContent = this.value;
};

let timerId = 'tik'; //must be declared so function can reference timer ID
const tick = () => {
    clearTimeout(timerId);
    timerId = setTimeout(function() {
        if (session.isOn()) {
            session.elapse();
            ui.refreshClock(session);
            tick();
        }
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