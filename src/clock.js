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

export default clock;