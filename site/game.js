window.onload = function() {
    if (navigator.share) {
        document.getElementById("game-share-button").classList.remove("hidden");
    }
};


function gameNumber() {
    // TODO
    return 7;
}

function gameText() {
    // TODO
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
