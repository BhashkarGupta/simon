function cubeSelector(){
    var ranNumber = (Math.random()*4) + 1;
    return Math.floor(ranNumber);
}

function playSound(boxID){
    var audio = new Audio("./sounds/" + boxID + ".mp3");
    audio.play();
    console.log("triggered");
}

function triggerBox(boxID) {
    document.querySelector("#box-" + boxID).classList.add("box-" + boxID + "-glow");
    playSound(boxID);
    setTimeout(function(){
        document.querySelector("#box-" + boxID).classList.remove("box-" + boxID + "-glow");
    }, 600);
}

function getClickedBox() {
    document.querySelectorAll(".box").forEach(function (box) {
        box.addEventListener("click", function (event) {
            var resut = event.target.id.replace("box-", "");
            return resut;
        });
    });
}

function reset() {
    location.reload();
}

function game() {
    var cubeSequence = [];
    var level = 1;
    var counter = 0;
    var heading = document.querySelector("h1#gameTitle");
    var button = document.querySelector("button");

    function boxClickHandler(event) {
        var result = event.target.id.replace("box-", "");
        console.log(result, cubeSequence[counter]);

        if (result == cubeSequence[counter]) {
            console.log("correct");
            counter++;
            console.log(counter, level);

            if (counter == level) {
                cubeSequence.push(cubeSelector());
                triggerBox(cubeSequence[level]);
                level++;
                heading.innerHTML = "Level: " + level;
                console.log("level:" + level);
                console.log(cubeSequence);
                counter = 0;
            }
        } else {
            console.log("game over");
            playSound("wrong");
            heading.style.color = "red";
            heading.innerHTML = "Game Over! </ br>Your Score:" + (level - 1);
            button.innerHTML = "Reset";
            button.classList.add("reset");
            button.classList.remove("button");
            button.setAttribute("onclick", "reset()");
            document.querySelectorAll(".box").forEach(function (box) {
                box.removeEventListener("click", boxClickHandler);
            });
        }
    }

    cubeSequence.push(cubeSelector());
    triggerBox(cubeSequence[0]);

    document.querySelectorAll(".box").forEach(function (box) {
        box.addEventListener("click", boxClickHandler);
    });
}

