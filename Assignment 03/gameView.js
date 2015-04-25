'use strict';
//-------------------------------------------VIEW-------------------------------------------

function page_init() {
//  document.getElementById('startGame').onclick = button_click;
//  document.getElementById('player1Input').focus();
  generate_table();
  cell_click();
}

// function getData(e) {
//   e.preventDefault();
// }
//
// function button_click() {
//   var player1 = document.getElementById('player1Input');
//   var player2 = document.getElementById('player2Input');
//   player1Name = player1.value;
//   player2Name = player2.value;
// if (CheckersModel.rowsModel < 8 || CheckersModel.columnsModel < 8) {
//   //turn the miminum text red
//   document.getElementById('min').innerHTML = '<font color="red">(Minimum number of rows and columns is 8)</font>'
//   //clear the rows and columns inputs
//   document.getElementById('numRows').value = "";
//   document.getElementById('numColumns').value = "";
//   //set the focus to the rows input
//   document.getElementById('numRows').focus();
// } else {
//
//
//   //change player names on the board
//   document.getElementById('player1Name').innerHTML = '<font size="6">Player 1: ' + player1Name + '</font>';
//   document.getElementById('player2Name').innerHTML = '<font size="6">Player 2: ' + player2Name + '</font>';
//   //clear the inputs
//   player1.value = "";
//   player2.value = "";
//
//
//     document.getElementById('numRows').value = "";
//     document.getElementById('numColumns').value = "";
//     //reset the miminum text to black
//     document.getElementById('min').innerHTML = '(Minimum number of rows and columns is 8)'
//
//     //generate the table
// //    generate_dynamic_table(CheckersModel.rowsModel, CheckersModel.columnsModel);
//
//     CheckersModel.prototype.generate_board();
//
//     generate_table(CheckersModel.rowsModel, CheckersModel.columnsModel);
//  }
//   alert('button_click ran');
//   //set the focus to the player 1 input
//   player1.focus();
//   return false;
// }

function generate_table() {
  var rows = 8;
  var columns = 8;
  var table = document.getElementById('table');
  var tableString = "";
  var endRed = 3;
  var startBlack = rows - 3;

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
            tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src="red_plain.png"></td>';
          } else if ((((i % 2) === 0) && (j % 2) !== 0)) {
            //even odd
            tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else if (((i % 2) !== 0) && ((j % 2) === 0)) {
            //odd even
            tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else {
            //odd odd
            tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src="red_plain.png"></td>';
          }
          // middle rows:
        } else if ((i > endRed - 1) && (i < startBlack)) {
          if (((i % 2) === 0) && ((j % 2) === 0)) {
            //even even
            tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else if (((i % 2) === 0) && ((j % 2) !== 0)) {
            //even odd
            tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else if (((i % 2) !== 0) && ((j % 2) === 0)) {
            //odd even
            tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else {
            //odd odd
            tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"></td>';
          }
          // last 3 rows:
        } else {
          if (((i % 2) === 0) && ((j % 2) === 0)) {
            //even even
            tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src="black_plain.png"></td>';
          } else if ((((i % 2) === 0) && (j % 2) !== 0)) {
            //even odd
            tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else if (((i % 2) !== 0) && ((j % 2) === 0)) {
            //odd even
            tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
          } else {
            //odd odd
            tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src="black_plain.png"></td>';
          }
        }
      }
    }
    // end table:
    tableString += '</table>';

    console.log(tableString);

    // after concatenating the entire HTML string, put it in the innerHTML of the table.
    table.innerHTML = tableString;

}

if (document && document.getElementById) {
  window.onload = page_init;
}

//-------------------------------------------MODEL-------------------------------------------

var player1NameModel = "";
var player2NameModel = "";
//1 is a red checker, 2 is a black checker, 0 is an empty space.
var gameString = "1010101010101010101010100000000000000000020202020202020202020202";

var player1Checkers;
var player2Checkers;

//-------------------------------------------CONTROLLER-------------------------------------------

function cell_click() {
  var cells = document.getElementsByTagName("td");


  for(var i = 0; i < cells.length; ++i) {
    cells[i].onclick = function() {
      //change HTML of cell here.

      cells[i].style.border = "2px solid white";
    };
  }


}
