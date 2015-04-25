'use strict';
//-------------------------------------------VIEW-------------------------------------------

function page_init() {
  generate_table();
  cell_click();
}

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

    //check and make sure it's correct:
//    console.log(tableString);

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
  var numCells = 64; // There will always be 64 cells on the board. This is a constant.
  var cells = document.getElementsByTagName("td");
  var selectedCell = '00'; //start selected cell out at 00 so it doesn't try to set the border of undefined.

  //should some of this be in the view???
  for(var i = 0; i < numCells; ++i) {
    cells[i].onclick = function() {
      //change HTML of cell here.
      console.log('in cell ' + this.id);
      //reset last selected cell to black border
      document.getElementById(selectedCell).style.border = "2px solid black";
      //set selected cell border to white
      this.style.border = "2px solid white";
      //set new selected cell
      selectedCell = this.id;
    };
  }
}



















//
