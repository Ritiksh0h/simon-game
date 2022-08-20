var userClickPattern = [];
var gamePatten = [];
var buttonColours = ["red", "blue", "green" , "yellow"];
var level = 0 ;
var started = false;

// for tacking of key press
$(document).keydown(function(){
    if(!started){
        $("h1").text( "Level " + level);
        nextSequence();
        started = true;
    }
});

// for tacking of click of mouse button
$("button").click(function(){
	var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAns(userClickPattern.length-1);
});

// function for next sequence in game
function nextSequence() {
    
    userClickPattern = [];

    var randomNumber = Math.floor( Math.random() * buttonColours.length );
    var randomChosenColor = buttonColours[randomNumber];
    gamePatten.push(randomChosenColor);
    
    level++;
    
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("h1").text( "Level " + level);
}

// function for playing sound of button
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// function for animation press of button
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// function for checking ans
function checkAns(currentLevel) {

    if(userClickPattern[currentLevel] === gamePatten[currentLevel]){

        if (userClickPattern.length === gamePatten.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    }
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $(".heading").text("Game Over, Press Any Key to Restart");
        
        $("body").addClass("game-over");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
    
}

// function for starting over the game
function startOver() {

    level = 0;

    gamePatten = [];

    started = false;
}