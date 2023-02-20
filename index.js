//adding paragraph....
let sentance = "This is My Typing website, I made It with the help of HTML, CSS and Javascript, It took me around two days to make this website, Now I really glad That I completed this website ,I frequently upSkill Myself and I learn new things everyday.. You can check out my GitHub Profile in which I Made Tons of awesome website Projects. It is all about My Journey in web devlopment...., Thank You!";
sentance = sentance.split("");

for (let j = 0; j < sentance.length; j++) {
    let span1 = document.createElement("span");
    let node = document.createTextNode(sentance[j]);
    span1.appendChild(node);
    let element = document.querySelector(".sentance");
    element.appendChild(span1);
}

// defing all important variables 
let a = document.querySelectorAll(".sentance>span");
let i = 0;
let correctChar = 0;
let minutes;
let seconds;

let winningMusic = new Audio("sounds/winningMusic.wav");
let losingMusic = new Audio("sounds/losingMusic.wav");

// setInterval timer...
let timer = setInterval(mytime, 1000);
let accuracy = 0;
let speed = 0;
function mytime() {
    if (i >= 1) {
        time++;
        seconds = time % 60;
        minutes = Math.floor(time / 60)

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        let correctWords = correctChar / 5;
        let words = i / 5;
        accuracy = (correctChar / i) * 100;
        speed = Math.abs((correctWords / time) * 60);
        if (accuracy < 0) {
            accuracy = 0;
        }
        if (accuracy > 100) {
            accuracy = 100;
        }
        document.querySelector(".accuracy").innerHTML = `ACCURACY : ${Math.round(accuracy)}%`
        document.querySelector(".speed").innerHTML = `SPEED : ${Math.round(speed)}WPM`
        document.querySelector(".timer").innerHTML = `TIME : ${minutes}:${seconds}`;

        if (accuracy > 90 && speed > 20) {
            document.querySelector("#score").style.color = "green";
        }
        if (accuracy < 90 && speed < 20) {
            document.querySelector("#score").style.color = "red";
        }
        if (accuracy > 90) {
            document.querySelectorAll(".score>p")[0].style.color = "green";
        }
        else {
            document.querySelectorAll(".score>p")[0].style.color = "red";
        }
        if (speed > 20) {
            document.querySelectorAll(".score>p")[1].style.color = "green";
        }
        else {
            document.querySelectorAll(".score>p")[1].style.color = "red";
        }
    }
    if (i == a.length) {
        clearInterval(timer);
        document.querySelector(".timer").innerHTML = `TIME TAKEN: ${minutes}:${seconds}`;
    }
};
let time = 0;



// style change and dinamic program
document.addEventListener("keydown", function (event) {
    if (i < 0) {
        i = 0;
    }
    let correctsound = new Audio("sounds/snare.wav");
    let wrongsound = new Audio("sounds/crash.wav");
    let b = a[i].innerHTML;
    if (b == "&nbsp;" || b == " ") {
        b = "Space"
    }
    if (b == "⏎" || b == "↩") {
        b = "Enter"
    }

    // backspace 
    if (event.code == "Backspace") {
        if (i >= 1) {
            i--;
        }
        else {
            i = 0;
        }
        a[i].style.color = "black";
        a[i].style.backgroundColor = "transparent";
    }


    // correct character check
    else if (event.key == b || event.code == b) {
        a[i].style.color = "green";
        a[i].style.backgroundColor = "rgb(168 255 168 / 27%)";
        correctsound.play();
        i++;
        correctChar++;
        document.querySelector("p").innerText = "Typing in Progress..."
    }


    // wrong character check
    else if (event.key != b && event.code != b && (event.key != "AudioVolumeUp") && (event.key != "AudioVolumeDown") && (event.key != "Shift")) {
        a[i].style.color = "rgb(255 10 20)";
        a[i].style.backgroundColor = "rgb(255 20 0 / 14%)";
        a[i].classList.add("wrongHover");
        wrongsound.play();
        i++;
        correctChar--;
    }
    if (i == a.length) {
        if (accuracy > 90 && speed > 20) {
            winningMusic.play();
        }
        else {
            losingMusic.play();
        }
    }
});
