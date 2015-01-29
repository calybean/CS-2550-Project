'use strict';

function page_init() {
  document.getElementById('startGame').onclick = button_click;
}

function generate_table() {
  document.getElementById('table').innerHTML = '<table class="black" align="center" border="4"><tr align="center"><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td></tr><tr align="center"><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td></tr><tr align="center"><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td><td class="black"><img src="red_plain.png"></td><td class="red"></td></tr><tr align="center"><td class="red"></td><td class="black"></td><td class="red"></td><td class="black"></td><td class="red"></td><td class="black"></td><td class="red"></td><td class="black"></td></tr><tr align="center"><td class="black"></td><td class="red"></td><td class="black"></td><td class="red"></td><td class="black"></td><td class="red"></td><td class="black"></td><td class="red"></td></tr><tr align="center"><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td></tr><tr align="center"><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td></tr><tr align="center"><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td><td class="red"></td><td class="black"><img src="black_plain.png"></td></tr></table>';
}


function button_click() {
  var player1 = document.getElementById('player1Input').value;
  var player2 = document.getElementById('player2Input').value;
  document.getElementById('player1Name').innerHTML = '<font size="6">Player 1: ' + player1 + '</font>';
  document.getElementById('player2Name').innerHTML = '<font size="6">Player 2: ' + player2 + '</font>';
  document.getElementById('player1Input').value = "";
  document.getElementById('player2Input').value = "";
  document.getElementById('player1Input').focus();
  generate_table();
  return false;
}

if (document && document.getElementById) {
  window.onload = page_init;
}
