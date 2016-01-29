
// global var
var board = [],
    blueFirst = ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red', 'red', 'red', 'white', 'white',
                 'white', 'white', 'white', 'white', 'white', 'white', 'white',
                  'white', 'white', 'white', 'white', 'white', 'white', 'black']

// 1. Random word generator
// 2. remove word from word list
for ( var i = 0; i < 25; i++ ) {
  var num = Math.floor( Math.random() * wordArray.length );
  board.push( wordArray[num] );
  wordArray.splice( (num), 1 );
}
