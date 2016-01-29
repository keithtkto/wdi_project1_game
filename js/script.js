
// global var
var round = 0,
    board = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    blueFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red',
                'white', 'white', 'white', 'white', 'white', 'white', 'white',
                'white', 'white', 'black'],
    redFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red',
                'white', 'white', 'white', 'white', 'white', 'white', 'white',
                'white', 'white', 'black'];


// 1. Random word generator and remove the selected words from word list
// 2. change board into arrays of object {color, state, word}
// 3. add board state (true = clicked/false = not clicked)
// 4. add color to board depending on round, even = blue first / odd = red first
for ( var i = 0; i < 25; i++ ) {
  var numWord = Math.floor( Math.random() * wordArray.length ),
      numColor = Math.floor( Math.random() * blueFirst.length );

  board[i].word = wordArray[numWord];
  wordArray.splice( (numWord), 1 );

  board[i].state = false;

  if (round % 2 === 0) {
    board[i].color = blueFirst[numColor];
    blueFirst.splice( (numColor), 1 );
  } else {
    board[i].color = redFirst[numColor];
    redFirst.splice( (numColor), 1 );
  };

};
