window.onload = function() {
    if (navigator.share) {
        document.getElementById("game-share-button").classList.remove("hidden");
    }
};

const COMPLETED_AT_TIME = new Date();

function gameNumber() {
    const day0 = new Date("04/11/2022");
    let today = new Date();
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    const difference = today.getTime() - day0.getTime();
    const days = difference / (24 * 60 * 60 * 1000);
    return Math.round(days);
}


const WATCH = String.fromCodePoint(0x23F1, 0xFE0F);

function gameTime() {
    const loadTimeCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('loadtime='));
    if (loadTimeCookie === undefined) {
        return '';
    }

    const loadTime = new Date(loadTimeCookie.split('=')[1]);
    const puzzleTimeMillis = COMPLETED_AT_TIME - loadTime;

    return `\n${WATCH} ` + friendlyTime(puzzleTimeMillis);
}


function friendlyTime(millis) {
    const totalSeconds = Math.ceil(millis / 1000);

    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / (60 * 60)) % (60 * 60);

    return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
}


function zeroPad(n) {
    return n.toString().padStart(2, '0');
}


function gameText() {
    return `Zerodle ${gameNumber()} 0/6${gameTime()}\n\nzerodle.com\n#zerodle`;
}

function shareGame() {
    const text = gameText();
    navigator.share({
        text: text
    }); // not doing anything with returned promise
}

function copyGame() {
    const text = gameText();
    navigator.clipboard.writeText(text).then(
        textCopied,
        function() {
            // clipboard write failed :(
        });
}

let timeout = null;
function textCopied() {
    button = document.getElementById("game-copy-button");
    button.innerText = "Game copied!";
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        button.innerText = "Copy";
    }, 3000);
}
