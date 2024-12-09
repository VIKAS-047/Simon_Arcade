var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Handle Play and Quit buttons
$("#play-btn").click(function () {
  startGame();
});

$("#quit-btn").click(function () {
  quitGame();
})

// Handle keyboard input
$(document).keypress(function (event) {
  var key = event.key.toLowerCase();
  if (key === "o") startGame();
  else if (key === "x") quitGame();
  else tap(key);
});

// Function to start the game
function startGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

// Function to quit the game
function quitGame() {
  startOver();
  $("#level-title").text("Game Over. Press O to Start Again");
}

// Handle button clicks
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Function to handle key taps
function tap(key) {
  var button = $(`.btn[data-key="${key}"]`); // Match the key to the button
  if (button.length > 0) {
    button.click(); 
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press O to Restart");
    
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    
    startOver();
  }
}

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over. Press O to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


// Generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

// Animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
