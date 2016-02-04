console.log("TELCOM GO");
console.log("GNC GO");
console.log("EECOM GO");
console.log("SURGEON GO");
console.log("CAPCOM, We're GO for Powered Descent.");

//Timer
var display = $('#time');

var startTimer = function(display) {
    // var timer = duration;
    setInterval(function () {
        var minutes = parseInt(duration / 60, 10),
            seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--duration < 0) {
            display.text("HURRY!!");;
        }
    }, 1000);
}



// global var
var redSleeperAgents  = 0,
    blueSleeperAgents = 0,
    mission           = 1,
    day               = 0,
    redScore          = 0,
    blueScore         = 0,
    duration          = 180,
    winner            = "", //'blue' 'red' is a user input, default blue
    currentPlayer     = "", //"blueFA", "redSM","redFA" //SM = spymaster FA = field agent
    currentTeam       = "", // blue" or "red"
    startingTeam      = "", //"blue" or "red"
    board             = [
      {},{},{},{},{},
      {},{},{},{},{},
      {},{},{},{},{},
      {},{},{},{},{},
      {},{},{},{},{}
    ],
    blueFirst,
    redFirst,
    blueStock,
    redStock,
    clueValue,
    indexBlack,
    indexClicked;

blueStock = Array(25).fill("blue", 0, 9)
                     .fill("red", 9, 17)
                     .fill("#fff2e5", 17, 24)
                     .fill("black", 24, 25);
redStock  = Array(25).fill("red", 0, 9)
                     .fill("blue", 9, 17)
                     .fill("#fff2e5", 17, 24)
                     .fill("black", 24, 25);

// jQuery Variable
/* Model */

/* create game board */
// 1. click to start
startTimer(display);

/* game operation */
function startGame() {
  //adding properties to board[]
  setBoard();
  setColor();
  renderFA();
  // adding words in each box
  wordInBox();
  disableSubmit()
  pass()
  // blue spymaster start
}; // end of startGame()


// 1. MOVES

function blueSMmove() {
  duration = 180;
  renderRemainingSA();
  disableSubmit();
  renderSM();
  eventOffSM()
  // startTimer(threeMinutes, display);
  playerSubmit(currentTeam);
};

function blueFAmove() {
  transitionSMsubmit()
  disableSubmit()
  renderFA();
  clickOnFA();
  clickOffFA();
};

function redSMmove() {
  duration = 180;
  renderRemainingSA()
  disableSubmit();
  renderSM();
  eventOffSM();
  // startTimer(threeMinutes, display);
  playerSubmit(currentTeam);
};

function redFAmove() {
  transitionSMsubmit()
  disableSubmit()
  renderFA();
  clickOnFA();
  clickOffFA();
};

// 1. Random word generator and remove the selected words from word list
// 2. change board into arrays of object {color, word}
// 3. add color to board depending on round, even = blue first / odd = red first

// generating the 5x5 board with js (done done)
function drawBoard() {
  for (i= 0; i < 25; i++) {
    var $word_box = $("<div class='word_box'><p class='words'></p></div>");
    $word_box.appendTo('.middlebox');
    $('div > p:last').attr("id", "box" + i);
    $("#box"+i).text("???");
  }
}

drawBoard()

//okay
function setBoard() {
  for (var i = 0; i < 25; i++) {
    var numWord = Math.floor( Math.random() * wordArray.length );

    board[i].word    = wordArray.splice(numWord, 1)[0];
    board[i].clicked = false;
  }
}

// generate random state
// board state (true = clicked/false = not clicked)


//okay
function setColor() {
  blueFirst = blueStock.slice(); // COPY the arrays, don't reference them directly
  redFirst  = redStock.slice();

  if (currentTeam === "blue") {
    for (var i = 0; i < 25; i++) {
      var numColor = Math.floor(Math.random() * blueFirst.length);
      board[i].color = blueFirst.splice(numColor, 1)[0];
      if (board[i].color === "black") indexBlack = i;
    }
  } else if (currentTeam === "red") {
    for ( var i = 0; i < 25; i++ ) {
      var numColor = Math.floor(Math.random() * redFirst.length);
      board[i].color = redFirst.splice(numColor, 1)[0];
      if (board[i].color === "black") indexBlack = i;
    }
  }
}

  // Putting word into correlating boxes
function wordInBox() {
  for (i= 0; i < 25; i++) {
    $("#box"+i).text(board[i].word);
  }
}

/* Behavior */

// win condition

//okay
function win(teamColor) {
  if (teamColor === "blue") {
    blueScore += 1;
    console.log("BLUE WINS!");
  } else {
    redScore += 1;
    console.log("RED WINS!");
  }
  day = 0;
  mission += 1;
  $("#day").text("MISSION: " + mission + " DAY: " + day);
  $("#score").text("BLUE " + blueScore + " RED " + redScore);
  // console.log(winner)
  // startGame()
}

//ending a round (activated around each round)
//nested within activate
function endRound() {
  transitionActivate();
  eightBall();
  wrongAgent();
  correctAgent();
}

function eightBall() {
  if (currentPlayer === "blueFA" && board[indexBlack].clicked === true) {
    // winner = "red team";
    win("red");
    console.log("blue team activated assassin")
  } else if (currentPlayer === "redFA" && board[indexBlack].clicked === true) {
    // winner = "blue team";
    console.log("red team activated assassin")
    win("blue");
  }
}

//2. selecting wrong sleeper agent // if clicked box != same color or white
// prob need to add (THIS) === clicked_word in condition
  //need animation for this
function wrongAgent() {
  if (currentPlayer === "blueFA" && board[indexClicked].color !== "blue" && board[indexClicked].clicked === true) {
    console.log("blue team round ends", board[indexClicked])
    redSMmove();
  } else if (currentPlayer === "redFA" && board[indexClicked].color !== "red" && board[indexClicked].clicked === true) {
    console.log("red team round ends", board[indexClicked])
    blueSMmove();
  };
};

//3. ending by running out of moves
    //need animation for this
function correctAgent() {
  clueValue--
  if (clueValue === 0 && currentPlayer === "blueFA") {
    // console.log(clueValue);
    console.log("blue got all the correct agent activated");
    win("blue");
    // redSMmove();
  } else if (clueValue === 0 && currentPlayer === "blueFA") {
    // console.log(clueValue);
    console.log("red got the correct agent activated");
    win("red");
    // blueSMmove();
  };
};

/*
  if (currentPlayer === "blueFA" && #box selected# !== "blue" ) {
    round ends
  } (currentPlayer === "redFA" && #box selected# !== "red" ) {
    round ends
  }

  */
//3. end by player decision (player interaction)



/* Render */

// render for field agent

function renderFA() {
  for (var i =0; i < 25; i++) {
    $('.word_box').eq(i).css('background', '#fff2e5');
    $("#box"+i).css('background', '#fff2e5');
    if (board[i].clicked === true) {
      $('.word_box').eq(i).css('background', board[i].color);
      $("#box"+i).text("UNAVAILABLE").css('background', board[i].color);
    }
  }
}


// render for Spymaster

function renderSM() {
  for (var i =0; i < 25; i++) {
    $('.word_box').eq(i).css('background', board[i].color)
    if (board[i].clicked === true) {
      $("#box"+i).text("UNAVAILABLE").css('background', board[i].color);
    }
  }
}

// render for amount of sleeper agent

function renderRemainingSA() {
  blueSleeperAgents = 0;
  redSleeperAgents = 0;
  for (var i =0; i < 25; i++) {
    if (board[i].color === "blue" && board[i].clicked === false) {
      blueSleeperAgents++
    }
    if (board[i].color === "red" && board[i].clicked === false) {
      redSleeperAgents++
    }
  }

  $('#blueSleeper').text(blueSleeperAgents)
  $('#redSleeper').text(redSleeperAgents)
}

/* Player Interaction */

// adding event listener on the words

function clickOnFA() {
  for (i= 0; i < 25; i++) {
    if (board[i].clicked === false) {
      $("#box"+i).on("click", activate);
      $('.word_box').eq(i).on("click", activate);
    }
  }
}

//In field agent round, remove event listener if its already been activated (state:true)

function clickOffFA() {
  for (var i =0; i < 25; i++) {
    if (board[i].clicked === true) {
      $("#box"+i).off()
      $('.word_box').eq(i).off()
    }
  }
}

// turn board state from false to true when clicked
function activate() {
  console.log( $( this ).text() );
  for (var i = 0; i <25 ; i++) {
    if ( board[i].word === $(this).text() ) {
      indexClicked = i;
      board[i].clicked = true;
    };
    if ($(this).text() === $(".words").eq(i).text() && board[i].word === $(this).text() ) {
      board[i].clicked = true;
    };
    console.log(board[i].word, board[i].clicked, board[i].color);
  };
  console.log("activated")
  renderFA()
  renderRemainingSA()
  endRound()
};

// SPYMASTER CONTROL

// remove event listener during spy master round

function eventOffSM() {
  for (var i =0; i < 25; i++) {
    $("#box"+i).off()
    $('.word_box').eq(i).off()
  }
}

// submit no refresh


function playerSubmit(color) {
  //changing the day
  day += 0.5;
  $("#day").text("MISSION: " + mission + " DAY: " + day);
  //change background color
  color === "blue" ? $("body").css("background-color", "#ccccff") :
                     $("body").css("background-color", "#ffcccc") ;
  //button status change
  currentPlayer = color + "SM";
  $("#send-button-" + color).attr("disabled", false);
  $("#select-" + color).attr("disabled", false);
  $("#textarea-" + color).attr("disabled", false);
  $("#textarea-" + color).attr("placeholder", "UPLINK ENABLE")
  $("#send-button-" + color).attr('value', 'TRANSMIT');
  $("#send-button-" + color).removeClass("disabled");
  $("#textarea-" + color).removeClass("disabled");
  $("#select-" + color).removeClass("disabled")
  $( "#send-button-" + color ).click(function(evt) {
    evt.preventDefault();
    color === "blue" ? clueValue = $('select')[0].value :
                       clueValue = $('select')[1].value ;
    if (clueValue == 11) {
      console.log("selected X")
      $li = $("<li id='clue-'" + color + ">").text($('#textarea-' + color).val() + ' ' + "X");
      $( "#clue-" + color).append( $li );
    } else if (clueValue == 12) {
      console.log("selected INF")
      $li = $("<li id='clue-'" + color + ">").text($('#textarea-' + color).val() + ' ' + "∞");
      $( "#clue-" + color).append( $li );
    } else {
      $li = $("<li id='clue-'" + color + ">").text($('#textarea-' + color).val() + ' ' + (clueValue));
      $( "#clue-" + color).append( $li );
    }

    currentPlayer = color + "FA";
    if (color === "blue") {
      currentTeam = "red";
      blueFAmove();
    } else if (color === "red") {
      currentTeam = "blue";
      redFAmove();
    }
  })
}

// remove submit during spy master round

function disableSubmit() {
  $("input").attr("disabled", true);
  $("select").attr("disabled", true);
  $("textarea").attr("disabled", true);
  $("textarea").attr("placeholder", "UPLINK DISABLE")
  $("input").attr('value', 'DISABLED');
  $(".submit").addClass("disabled");
  $("select").addClass("disabled")
  $("textarea").addClass("disabled");
  $("textarea").val("")
}

function pass() {
  $("#passFA").on("click", function(evt) {
    evt.preventDefault();
    if (currentPlayer === "blueFA") {
      redSMmove()
    } else if (currentPlayer === "redFA") {
      blueSMmove()
    } else {
      console.log("Spymaster can not pass their turn");
    }

  });
}



//bottons functions

$('#bluestart').on('click',function(){
  $("#ss").attr('class', "hidden")
  startingTeam = "blue";
  currentTeam ="blue"
  startGame();
  blueSMmove();
});

$('#redstart').on('click',function(){
  $("#ss").attr('class', "hidden")
  startingTeam = "red";
  currentTeam = "red";
  startGame();
  redSMmove();
});

// restart game
$("#restartGame").on('click', function(){
  startingTeam === "blue" ? startingTeam = "red"  :
                           startingTeam = "blue" ;
  startGame();
  if (currentTeam === "blue") {
    blueSMmove();
  } else if (currentTeam === "red") {
    redSMmove();
  }
});

//refresh color only (provide warning for players)
$("#refreshColor").on('click', function(){
  console.log("refresh color");
  setColor();
  renderSM();
});

//refresh words only (provide warning for players)
$("#refreshWords").on('click', function() {
  event.preventDefault();
  setBoard();
  wordInBox();
});



// Transitional Screen



var $center = $(".center");


// $("<div><h1>BLUE WINS</h1><button>Play Again!</button></div>").css({position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "indianred", color: "white"})
// [
// function for clicking action on word card

function transitionActivate() {
  console.log("transition actived")
  switch (board[indexClicked].color) {
    case "blue":
      $("<div class='activateScreen'><p>BLUE AGENT CONTACTED</p></div>").appendTo($center);
      console.log("blue activated");
      break;
    case "red":
      $("<div class='activateScreen'><p>RED AGENT CONTACTED</p></div>").appendTo($center);
      console.log("red activated")
      break;
    case "#fff2e5":
      $("<div class='activateScreen'><p>MISSION INTERRUPTED BYSTANDER</p></div>").appendTo($center);
      console.log("BYSTANDER activated")
      break;
    case "black":
        $("<div class='activateScreen'><p>MISSION FOILED BY ASSASSIN</p></div>").appendTo($center);
        console.log("black activated")
      }
  $(".activateScreen").fadeOut( 2000 )
}

function transitionSMsubmit() {
  $(".activateScreen").remove();
  $("<div class='activateScreen'><p>CLUE SUBMITTED...<br>INITIATIZING...<br>ENCYPTING...<br>SENT...</p></div>").appendTo($center);
  $(".activateScreen > p").fadeOut( 2000 );
  $("<p>FIELD AGAENT,<br>ARE YOU READY TO RECEIVE?</p><button class='accept' id='accept'>ACCEPT</button>").appendTo($(".activateScreen"))
  $("#accept").on("click", function() {
    duration = 180;
    // $(".activateScreen").fadeOut( 1000 );
    $(".activateScreen").remove();
    });

}



// $(".activateScreen").fadeIn( "slow" )
// how the fuck do u fade in???




