
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

//o jogo só começa quando o usuário clicar no botão de start
$("button").click(function(){
    setTimeout(function() {
        nextSequence();
        $("h1").html("Level 0");
        $("button").hide();
    }, 700);

});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
}); // "this" se refere ao objeto que causou o clique

// verifica se o usuario está seguindo a sequencia correta do jogo
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("it's right");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1200);
        } 
    }
    else {
        console.log("it's wrong");
        var audioWrong = new Audio("./sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300);
        $("h1").html("Game over!");
        $("button").show();
        startOver();
    }
};

function nextSequence() {
    //a cada sequencia o padrao do usuario é zerado
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    // seleciona uma cor na posição aleatoria
    var randomChosenColor = buttonColors[randomNumber];

    // coloca a cor gerada no novo array que é a sequência do jogo
    gamePattern.push(randomChosenColor);

    //seleciona o "botão" com o mesmo id gerado em randomChosenColor
    $("#" + randomChosenColor).fadeOut(80).fadeIn(80);  
    
    playSound(randomChosenColor);

    level += 1;
    $("h1").html("Level " + (level - 1)); //diminuí 1 pq a função já está no próximo level e só depois ela escreve o nível

};

function startOver() {
    level = 0;
    gamePattern = [];
};

function playSound(audioName) {
    var audio = new Audio("./sounds/" + audioName + ".mp3");
    audio.play();
};


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 120);
};

// console.log(gamePattern);
// console.log(userClickedPattern);
