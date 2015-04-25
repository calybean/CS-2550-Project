'use strict';

function page_init() {
  document.getElementById('startGame').onclick = button_click;
  document.getElementById('player1Input').focus();
}

function button_click() {
  var player1 = document.getElementById('player1Input');
  var player2 = document.getElementById('player2Input');
  var rows = document.getElementById('numRows').value;
  var columns = document.getElementById('numColumns').value;
  if (rows < 8 || columns < 8) {
    //turn the miminum text red
    document.getElementById('min').innerHTML = '<font color="red">(Minimum number of rows and columns is 8)</font>'
    //clear the rows and columns inputs
    document.getElementById('numRows').value = "";
    document.getElementById('numColumns').value = "";
    //set the focus to the rows input
    document.getElementById('numRows').focus();
  } else {
    //change player names on the board
    document.getElementById('player1Name').innerHTML = '<font size="6">Player 1: ' + player1.value + '</font>';
    document.getElementById('player2Name').innerHTML = '<font size="6">Player 2: ' + player2.value + '</font>';
    //clear the inputs
    player1.value = "";
    player2.value = "";
    document.getElementById('numRows').value = "";
    document.getElementById('numColumns').value = "";
    //set the focus to the player 1 input
    player1.focus();
    //reset the miminum text to black
    document.getElementById('min').innerHTML = '(Minimum number of rows and columns is 8)'

    //generate the table
    generate_dynamic_table(rows, columns);
  }
  return false;
}

function generate_dynamic_table(tableRows, tableColumns) {
  var rows = tableRows;
  var columns = tableColumns;
  var endRed = 3;
  var startBlack = rows - 3;
  var table = document.getElementById('table');
  var tableString = "";

  // start table:
  tableString += '<table class="black" align="center" border="4">';
  //tr for loop
  for (var i = 0; i < rows; i++) {
    tableString += '<tr align="center">';
    //td for loop
    for (var j = 0; j < columns; j++) {
      // first 3 rows:
      if (i < endRed) {
        if (((i % 2) === 0) && ((j % 2) === 0)) {
          //even even
          tableString += '<td class="black"><img src="red_plain.png"></td>';
        } else if ((((i % 2) === 0) && (j % 2) !== 0)) {
          //even odd
          tableString += '<td class="red"></td>';
        } else if (((i % 2) !== 0) && ((j % 2) === 0)) {
          //odd even
          tableString += '<td class="red"></td>';
        } else {
          //odd odd
          tableString += '<td class="black"><img src="red_plain.png"></td>';
        }
        // middle rows:
      } else if ((i > endRed - 1) && (i < startBlack)) {
        if (((i % 2) === 0) && ((j % 2) === 0)) {
          //even even
          tableString += '<td class="black"></td>';
        } else if (((i % 2) === 0) && ((j % 2) !== 0)) {
          //even odd
          tableString += '<td class="red"></td>';
        } else if (((i % 2) !== 0) && ((j % 2) === 0)) {
          //odd even
          tableString += '<td class="red"></td>';
        } else {
          //odd odd
          tableString += '<td class="black"></td>';
        }
        // last 3 rows:
      } else {
        if (((i % 2) === 0) && ((j % 2) === 0)) {
          //even even
          tableString += '<td class="black"><img src="black_plain.png"></td>';
        } else if ((((i % 2) === 0) && (j % 2) !== 0)) {
          //even odd
          tableString += '<td class="red"></td>';
        } else if (((i % 2) !== 0) && ((j % 2) === 0)) {
          //odd even
          tableString += '<td class="red"></td>';
        } else {
          //odd odd
          tableString += '<td class="black"><img src="black_plain.png"></td>';
        }
      }
    }
  }
  // end table:
  tableString += '</table>';

  // after concatenating the entire HTML string, put it in the innerHTML of the table.
  table.innerHTML = tableString;
}

if (document && document.getElementById) {
  window.onload = page_init;
}
