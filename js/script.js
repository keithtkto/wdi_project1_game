console.log("TELCOM GO");
console.log("GNC GO");
console.log("EECOM GO");
console.log("SURGEON GO");
console.log("CAPCOM, We're GO for Powered Descent.");


// global var
var redSleeperAgents = 0,
    blueSleeperAgents = 0,
    round = 0,
    winner = '', //'blue' 'red' is a user input, default blue
    currentPlayer = "", //"blueFA", "redSM","redFA" //SM = spymaster FA = field agent
    latestStartingTeam = "red", //vs "red"
    board = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
              {},{},{},{},{},{},{},{}],
    blueFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                '#fff2e5', '#fff2e5', '#fff2e5', '#fff2e5', '#fff2e5', '#fff2e5',
                '#fff2e5', 'black'],
    redFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                '#fff2e5', '#fff2e5', '#fff2e5', '#fff2e5', '#fff2e5', '#fff2e5',
                '#fff2e5', 'black'],

    clueValue,
    indexBlack,
    indexClicked;

// jQuery Variable
/* Model */

/* create game board */
// 1. click to start


/* game operation */
function startGame() {

//adding properties to board[]
setBoard();
setColor();
// adding words in each box
wordInBox();
// blue spymaster start



}; // end of startGame()


// 1. MOVES


function firstMove() {}

function blueSMmove() {
  renderRemainingSA()
  disableSubmit();
  renderSM();
  blueSubmit();

};

function blueFAmove() {
  renderFA();
  clickOnFA();
  clickOffFA();
};
//         break;
//       case "redSM":
//         currentPlayer = "redFA";
//         renderRemainingSA()
//         disableSubmit();
//         renderSM();
//         redSubmit()
//         break;
//       case "redFA":
//         currentPlayer = "blueSM";
//         renderSM()
//         break;
//       default:
//         console.log("error on current player");
// };





// 1. Random word generator and remove the selected words from word list
// 2. change board into arrays of object {color, word}
// 3. add color to board depending on round, even = blue first / odd = red first

// generating the 5x5 board with js (done done)
function drawBoard() {
  for (i= 0; i < 25; i++) {
    var $word_box = $("<div class='word_box'><p class='words'></p></div>");
    $word_box.appendTo('.middlebox');
    $('div>p:last').attr("id", "box" + i)
    $("#box"+i).text("???")
  };
};

drawBoard()

//okay
function setBoard() {

  for ( var i = 0; i < 25; i++ ) {
    var numWord = Math.floor( Math.random() * wordArray.length );
    // console.log(numWord);
    board[i].word = wordArray[numWord];
    // console.log(board[i])
    wordArray.splice( (numWord), 1 );

    board[i].state = false;
  };
};

// generate random state
// board state (true = clicked/false = not clicked)

//okay
function setColor() {
  if (latestStartingTeam === "red") {
    for ( var i = 0; i < 25; i++ ) {
      var numColor = Math.floor( Math.random() * blueFirst.length );
      // console.log(numColor);
      board[i].color = blueFirst[numColor];
      blueFirst.splice( (numColor), 1 );
      blueSleeperAgents = 9;
      redSleeperAgents = 8;
    }
    latestStartingTeam = "blue";
  } else {
    for ( var i = 0; i < 25; i++ ) {
      var numColor = Math.floor( Math.random() * redFirst.length );
      // console.log(numColor);
      board[i].color = redFirst[numColor];
      redFirst.splice( (numColor), 1 );
      redSleeperAgents = 9;
      blueSleeperAgents = 8;
      latestStartingTeam = "red"
    };
  };
}


  // Putting word into correlating boxes
function wordInBox() {
  for (i= 0; i < 25; i++) {
    $("#box"+i).text(board[i].word);
  };
};


/* Behavior */





// win condition

//okay
function win() {}
  if (blueSleeperAgents === 0) {
    winner = 'blue team';
  } else if (redSleeperAgents === 0) {
    winner = 'red team';
  };



//Immediate loss (8-ball) condition and where is teh 8ball
// Where is the 8ball
// for ( var e = 0; 2 < board.length; e++) { if (board[e].color === "black") {console.log(e)}; };
// VM1218:2 11

//okay
function indexBlack() {
    for (var i=0; i < 25; i++) {
        if ( board[i].color === "black") {
            console.log(i)
            indexBlack = i;
            // return blackLocation;
        };
    };
};
// loss condition

// need work (need to connect with click)



//ending a round (activated around each round)
function endRound() {}; //base on each click event by field agent
//1. death by 8ball
  ////need animation for this
eightBall()

function eightBall() {
    if (currentPlayer === "blueFA" && board[blackLocation].state === true) {
      winner = "red team";
      alert("red team wins")
    } else if (currentPlayer === "redFA" && board[blackLocation].state === true) {
      winner = "blue team";
      alert("blue team wins")
  };
};

//2. selecting wrong sleeper agent // if clicked box != same color or white
// prob need to add (THIS) === clicked_word in condition
  //need animation for this
function wrongAgent() {

  if (currentPlayer === "blueFA" && board[indexClicked].color !== "blue" && board[indexClicked].state === true) {
      console.log("blue team round ends", board[indexClicked])
  } else if (currentPlayer === "redFA" && board[indexClicked].color !== "red" && board[indexClicked].state === true) {
      console.log("red team round ends", board[indexClicked])
  };
};

//3. ending by running out of moves
    //need animation for this
function correctAgent() {
  clueValue--

  if (currentPlayer === "blueFA" && board[indexClicked].color === "blue") {
    blueSleeperAgents--
    console.log(clueValue)
    console.log("blue got the correct agent activated")
  } else if (currentPlayer === "redFA" && board[indexClicked].color === "red") {
    redSleeperAgents--
    console.log(clueValue)
    console.log("red got the correct agent activated")
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
    $('.word_box').eq(i).css('background', '#fff2e5')
    if (board[i].state === true) {
      $('.word_box').eq(i).css('background', board[i].color);
      $("#box"+i).text("").css('background', board[i].color);
    }
  };
};


// render for Spymaster

function renderSM() {
  for (var i =0; i < 25; i++) {
    $('.word_box').eq(i).css('background', board[i].color)
    if (board[i].state === true) {
      $("#box"+i).text("").css('background', board[i].color);
    }
  };
};

// render for amount of sleeper agent

function renderRemainingSA() {
  blueSleeperAgents = 0;
  redSleeperAgents = 0;
  for (var i =0; i < 25; i++) {
    if (board[i].color === "blue" && board[i].state === false) {
      blueSleeperAgents++
    };
    if (board[i].color === "red" && board[i].state === false) {
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
    if (board[i].state === false) {
      $("#box"+i).on("click", activate );
      $('.word_box').eq(i).on("click", activate );
    };
  };
};

//In field agent round, remove event listener if its already been activated (state:true)

function clickOffFA() {
  for (var i =0; i < 25; i++) {
    if (board[i].state === true) {
      $("#box"+i).off()
      $('.word_box').eq(i).off()
    }
  }
};




// turn board state from false to true when clicked
function activate() {
  console.log( $( this ).text() );
  for (var i = 0; i <25 ; i++) {
    if ( board[i].word === $(this).text() ) {
        indexClicked = i;
        board[i].state = true;
    };
    if ($(this).text() === $(".words").eq(i).text() && board[i].word === $(this).text() ) {
        board[i].state = true;
    };
    console.log(board[i].word, board[i].state, board[i].color);
  };
  console.log("activated")
  renderFA()
  renderRemainingSA()
};

// SPYMASTER CONTROL

// remove event listener during spy master round

function eventOffSM() {
  for (var i =0; i < 25; i++) {
    $("#box"+i).off()
    console.log(SMeventOff)
  };
};

// submit no refresh

function blueSubmit() {
  currentPlayer = "blueSM"
  $("#send-buttonB").attr("disabled", false);
  $("select").eq(0).attr("disabled", false);
  $("#textareaB").attr("disabled", false);
  $("#textareaB").attr("placeholder", "Uplink enabled...Enter your single word clue here")
  $("#send-buttonB").attr('value', 'TRANSMIT');
  $( "#send-buttonB" ).click( function( evt ) {
    evt.preventDefault();
    clueValue = $('select')[0].value
    var newClue = $('#textareaB').val() + ' ' + clueValue;
    $li = $("<li id='clueB'>").text(newClue);
    $( "#clueBlue" ).append( $li );

    currentPlayer = "blueFA"
    blueFAmove()

    });
};


function redSubmit() {
  currentPlayer = "redSM"
  $("#send-buttonR").attr("disabled", false);
  $("select").eq(1).attr("disabled", false);
  $("#textareaR").attr("disabled", false);
  $("#textareaR").attr("placeholder", "Uplink enabled...Enter your single word clue here")
  $("#send-buttonR").attr('value', 'TRANSMIT');
  $( "#send-buttonR" ).click(function( evt ) {
    evt.preventDefault();
    clueValue = $('select')[1].value
    var newClue = $('#textareaR').val() + ' ' + clueValue;
    $li = $("<li id='clueR'>").text(newClue);
    $( "#clueRed" ).append( $li );

    currentPlayer = "redFA"
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


// preventing opposite team to submit





