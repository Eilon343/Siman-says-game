
var userClickedPattern = [];

var gamePattern = [];

var level = 0;

var buttonColors = ["red", "blue", "yellow", "green"];

var isLevelFinished = false;

var isGameStarted = false;

var failAudio = new Audio("sounds/wrong.mp3");
failAudio.volume = 0.1;

var allBtns = $(".btn");

if (isGameStarted === false){
    $(".btn").off("click", clickFunction());
}

//start game
$("body").keydown(function(){
    if (isGameStarted === false){
        isGameStarted = true;
        $(".btn").on("click", clickFunction());
        level = 1;
        nextSequence();
    }
});


//levels builder
function nextSequence(){
    $("h1").text("Level " + level)
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++){
        setTimeout(() => {
            $(".btn").off("click", clickFunction());
            var selectedSquare = $("#" + gamePattern[i]);
            selectedSquare.fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
            if (i === gamePattern.length - 1){
                $(".btn").on("click", clickFunction());
            }
        }, 500 * i);
    }
    userClickedPattern = []; 
}



function playSound(name){
    const audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();
    audio.volume = 0.1;
}

function animatePress(currentColor){
    var currentBtn = $("#" + currentColor).addClass("pressed");
    setTimeout(() => {currentBtn.removeClass("pressed")}, 100);
} 
//click squares
function clickFunction(){
    $(".btn").click(function(){
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer();
    });
}

function checkAnswer(){
    if (arraysAreIdentical() === false) {
        allBtns.addClass("pressed");
        setTimeout(() => {
        allBtns.removeClass("pressed")
        }, 100);
        failAudio.play();
        $("h1").text("You failed, press any key to restart")
        $(".btn").unbind("click");
        isGameStarted = false;
        gamePattern = [];
    }
    else if(userClickedPattern.length === gamePattern.length && arraysAreIdentical() === true){
            setTimeout(() => {
            level++;
            nextSequence();
        }, 500);
    }
}
function arraysAreIdentical(){
    for (var i = 0, len = userClickedPattern .length; i < len; i++){
        if (userClickedPattern[i] !== gamePattern[i]){
            return false;
        }
    }
    return true; 
}


