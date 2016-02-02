console.log("TELCOM GO");
console.log("GNC GO");
console.log("EECOM GO");
console.log("SURGEON GO");
console.log("CAPCOM, We're GO for Powered Descent.");


// global var
var redSleeperAgents  = 0,
    blueSleeperAgents = 0,
    round             = 0,
    winner            = "", //'blue' 'red' is a user input, default blue
    currentPlayer     = "", //"blueFA", "redSM","redFA" //SM = spymaster FA = field agent
    currentTeam       = "", //vs "red"
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
  renderRemainingSA()
  disableSubmit();
  renderSM();
  eventOffSM()
  blueSubmit();
};

function blueFAmove() {
  disableSubmit()
  renderFA();
  clickOnFA();
  clickOffFA();
};

function redSMmove() {
  renderRemainingSA()
  disableSubmit();
  renderSM();
  eventOffSM()
  redSubmit();
};

function redFAmove() {
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
function win() {
  if (blueSleeperAgents === 0) {
    winner = 'blue team';

  } else if (redSleeperAgents === 0) {
    winner = 'red team';
  };
  console.log(winner)
  startGame()
}

//ending a round (activated around each round)
//nested within activate
function endRound() {
  eightBall();
  wrongAgent();
  correctAgent();
}

function eightBall() {
  if (currentPlayer === "blueFA" && board[indexBlack].clicked === true) {
    winner = "red team";
    console.log("red team wins")
  } else if (currentPlayer === "redFA" && board[indexBlack].clicked === true) {
    winner = "blue team";
    console.log("blue team wins")
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
    console.log(clueValue);
    console.log("blue got all the correct agent activated");
    redSMmove();
  } else if (clueValue === 0 && currentPlayer === "blueFA") {
    console.log(clueValue);
    console.log("red got the correct agent activated");
    blueSMmove();
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


// function playerSubmit(color) {
//   var colorInitial = color.charAt(0).toUpperCase();

//   currentPlayer = color + "SM"
//   $("#send-button" + colorInitial).attr("disabled", false);
//   $("select").eq(0).attr("disabled", false);
//   $("#textarea" + colorInitial).attr("disabled", false);
//   $("#textarea" + colorInitial).attr("placeholder", "Uplink enabled...Enter your single word clue here")
//   $("#send-button" + colorInitial).attr('value', 'TRANSMIT');
//   $( "#send-button" + colorInitial ).click(function(evt) {
//     evt.preventDefault();

//     clueValue = $('select')[0].value
//     var newClue = $('#textarea' + colorInitial).val() + ' ' + clueValue;
//     $li = $("<li id='clue'" + colorInitial + ">").text(newClue);
//     $( "#clue" + colorInitial + color.slice(1) ).append( $li );

//     currentPlayer = color + "FA";
//     color === "blue" ? blueFAmove() : redFAmove();
//   });
// };

function blueSubmit() {
  currentPlayer = "blueSM"
  $("#send-buttonB").attr("disabled", false);
  $("select").eq(0).attr("disabled", false);
  $("#textareaB").attr("disabled", false);
  $("#textareaB").attr("placeholder", "Uplink enabled...Enter your single word clue here")
  $("#send-buttonB").attr('value', 'TRANSMIT');
  $( "#send-buttonB" ).click(function(evt) {
    evt.preventDefault();

    clueValue = $('select')[0].value
    var newClue = $('#textareaB').val() + ' ' + clueValue;
    $li = $("<li id='clueB'>").text(newClue);
    $( "#clueBlue" ).append( $li );

    currentPlayer = "blueFA";
    blueFAmove();
  });
};


function redSubmit() {
  currentPlayer = "redSM"
  $("#send-buttonR").attr("disabled", false);
  $("select").eq(1).attr("disabled", false);
  $("#textareaR").attr("disabled", false);
  $("#textareaR").attr("placeholder", "Uplink enabled...Enter your single word clue here")
  $("#send-buttonR").attr('value', 'TRANSMIT');
  $( "#send-buttonR" ).click(function(evt) {
    evt.preventDefault();
    clueValue = $('select')[1].value
    var newClue = $('#textareaR').val() + ' ' + clueValue;
    $li = $("<li id='clueR'>").text(newClue);
    $( "#clueRed" ).append( $li );

    currentPlayer = "redFA";
    redFAmove();
  });
};


// remove submit during spy master round

function disableSubmit() {
  $("input").attr("disabled", true);
  $("select").attr("disabled", true);
  $("textarea").attr("disabled", true);
  $("textarea").attr("placeholder", "Uplink disabled......")
  $("input").attr('value', 'DISABLED')
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
    };

  });
}


//bottons functions

$('#bluestart').on('click',function(){
  $("#ss").attr('class', "hidden")
  currentTeam = "blue";
  startGame();
  blueSMmove();
});

$('#redstart').on('click',function(){
  $("#ss").attr('class', "hidden")
  currentTeam = "red";
  startGame();
  redSMmove();
});

// restart game
$("#restartGame").on('click', startGame)

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
