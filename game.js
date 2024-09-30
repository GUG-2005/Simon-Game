var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClcikedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  flash(randomChosenColor);
  sound(randomChosenColor);
  level += 1;
  $("h1").html("Level "+level);
}

function flash(but)
{
  var button = $("#"+but);
  button.css("background-color", "#011F3F");
  setTimeout(function(){
    button.css("background-color", "");
  }, 100);
}

function sound(name)
{
  var audio = new Audio(+name+".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  var button = $("#"+currentColor);
  $(button).addClass("pressed");
  setTimeout(function(){
    $(button).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  if (userClcikedPattern[currentLevel] == gamePattern[currentLevel])
  {
    console.log("success");
    if (userClcikedPattern.length == gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    console.log("wrong");
    sound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press any key to restart");
    startOver();
  }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  var userChosenColor = this.id; 
  userClcikedPattern.push(userChosenColor);
  sound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClcikedPattern.length-1);
});

$(document).on("keypress", function(){
  if (!started)
  {
    $("h1").html("Level "+level);
    nextSequence();
    started = true;
  }
});

