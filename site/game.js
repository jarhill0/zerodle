window.onload = function() {
    if (navigator.share) {
        document.getElementById("game-share-button").classList.remove("hidden");
    }
};


function gameNumber() {
    const day0 = new Date("04/11/2022");
    let today = new Date();
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    const difference = today.getTime() - day0.getTime();
    return Math.round(difference);
}

function gameText() {
    return `Zerodle ${gameNumber()} 0/6\n\nzerodle.com\n#zerodle`;
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
