
// global var
var redSleeperAgents = 0,
    blueSleeperAgents = 0,
    round = 0,
    winner = 'blue', //'red' is a user input, default blue
    currentPlayer = "blueSM", //"blueFA", "redSM","redFA" //SM = spymaster FA = field agent
    latestStartingTeam = "red", //vs "red"
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
  var numWord = Math.floor( Math.random() * wordArray.length );

  board[i].word = wordArray[numWord];
  wordArray.splice( (numWord), 1 );

  board[i].state = false;

  if (latestStartingTeam === "red") {
      var numColor = Math.floor( Math.random() * blueFirst.length );
      board[i].color = blueFirst[numColor];
      blueFirst.splice( (numColor), 1 );
      blueSleeperAgents = 9;
      redSleeperAgents = 8;
      latestStartingTeam = "blue";
    } else {
      var numColor = Math.floor( Math.random() * redFirst.length );
      board[i].color = redFirst[numColor];
      redFirst.splice( (numColor), 1 );
      redSleeperAgents = 9;
      blueSleeperAgents = 8;
      latestStartingTeam = "red";
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
      console.log("error on current player");
};

// 2. MOVES
//    a. Spymaster move

function moves() {};

switch(currentPlayer) {
  case "blueSM":
      return = #blueteam word/num input#;
      break;
    case "blueFA":
      return = #blueteam click input#;
      break;
    case "redSM":
      return = #redteam word/num input#;
      break;
    case "redFA":
      return = #blueteam click input#;
      break;
    default:
      console.log("error on player move");
};


//    b. field agent move





// win condition
if (blueSleeperAgents === 0) {
  winner = 'blue team';
} else if (redSleeperAgents === 0) {
  winner = 'red team';
};

//Immediate loss (8-ball) condition

if (currentPlayer === #"blueFA" and select "black"#) {
  winner = "red team";
} else if (currentPlayer === #"redFA" and select "black"#) {
  winner = "blue team";
}


//ending a round
//1. ending by running out of moves
//2. selecting wrong sleeper agent
  if (currentPlayer === "blueFA" && #box selected# !== "blue" ) {
    round ends
  } (currentPlayer === "redFA" && #box selected# !== "red" ) {
    round ends
  }

//3. end by player decision (player interaction)



/* Render */

/* Player Interaction */

