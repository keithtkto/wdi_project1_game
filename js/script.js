
// global var
var redTeam = 0,
    blueTeam = 0,
    round = 0,
    currentPlayer = "blueSM" //"blueFA", "redSM","redFA" //SM = spymaster FA = field agent
    board = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    blueFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red',
                'white', 'white', 'white', 'white', 'white', 'white',
                'white', 'white', 'black'],
    redFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                'white', 'white', 'white', 'white', 'white', 'white',
                'white', 'white', 'black'];




/* Model */

/* create game board */



// 1. Random word generator and remove the selected words from word list
// 2. change board into arrays of object {color, state, word}
// 3. add board state (true = clicked/false = not clicked)
// 4. add color to board depending on round, even = blue first / odd = red first

function setBoard() {}

for ( var i = 0; i < 25; i++ ) {
  var numWord = Math.floor( Math.random() * wordArray.length ),
      numColor = Math.floor( Math.random() * blueFirst.length );

  board[i].word = wordArray[numWord];
  wordArray.splice( (numWord), 1 );

  board[i].state = false;

  if (round % 2 === 0) {
    board[i].color = blueFirst[numColor];
    blueFirst.splice( (numColor), 1 );
    blueTeam = 9;
    redTeam = 8;
  } else {
    board[i].color = redFirst[numColor];
    redFirst.splice( (numColor), 1 );
    redTeam = 9;
    blueTeam = 8;
  };

};

/* Behavior */

// 1. turns of the game  (day1)blueSM --> blueFA --> redSM -->redFA -->(day2) blueSM

switch(currentPlayer) {
    case "blueSM":
      currentPlayer = "blueFA";
      break;
    case "blueFA":
      currentPlayer = "redSM";
      break;
    case "redSM":
      currentPlayer = "redFA";
      break;
    case "redFA":
      currentPlayer = "blueSM";
      break;
    default:
      console.log("error on current player")
};



/* Render */

/* Player Interaction */

