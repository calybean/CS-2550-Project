'use strict'

// you can do this in your html:
// <button onclick="testIt();"></button>

// the standard way to do this is addEventListener
var button = document.getElementById('submitButton');
button.addEventListener('click', function() {
  console.log('Button was clicked.');
});

// 'click' works fine, but you can also use 'mouseover', 'mouseup', and 'mousedown'.
// use mousedown and mouseup to figure out where they clicked and dragged to.
// Here are some others: 'mouseout', 'mousemove' (These, along with mouseover, will NOT work on mobile.)

// You can also use keyboard events. 'keydown', 'keyup', and 'keypress' (these might not work with keys like shift, ctrl, etc.)

// Go to caniuse.com to find out which browsers support what.

button.removeEventListener('', function());

var func = function();

window.addEventListener('load', func);

window.removeEventListener('load', func);

obj.addClick = function(func) {
  function applyOnClick(i) {
    i.addEventListener('click', func);
  }
}

GameView.prototype.createClickEvent = function(x,y) {
  return function() {console.log('x: ' + x + " y: " + y); }
};


// Add all of this to the for loops generating the table.

var boardTable = document.createElement('table');

var boardRow = document.createElement('tr');

var boardCell = document.createElement('td');
boardCell.className = className;
boardCell.style.height = size + "px";
boardCell.style.width = size + "px";

boardCell.addEventListener('click', this.createClickEvent(i,j));

boardRow.appendChild(boardCell);

boardTable.appendChild(boardRow);

this.board.appendChild(boardTable);






// the term "this" in js, represents the current execution context, not the object itself.
