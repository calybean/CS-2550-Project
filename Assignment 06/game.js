//Joseph Cannon
//4/5/15
//CS 2550
//Prof. Wright

//-------------------------------------------VIEW-------------------------------------------

function page_init() {
  generate_board();
  cell_click();
  read_xml_file();
}

if (document && document.getElementById) {
  window.onload = page_init;
}

var red_image = '"checkers/red_plain.png"';
var black_image = '"checkers/black_plain.png"';
var red_star_image = '"checkers/red_star.png"';
var black_star_image = '"checkers/black_star.png"'

function generate_board() {
  var table = document.getElementById('table');
  var tableString = "";
  var endRed = 3;
  var startBlack = size - 3;

  //start table
  tableString += '<table class="black" align="center" border="4">';

  for(var i = 0; i < size; ++i) {
    tableString += '<tr align="center">';
    for(var j = 0; j < size; ++j) {
      var gameIndex = convertFromBaseToBase(i.toString().concat(j.toString()), 8, 10);
      if (gameString[gameIndex] == 9) {
        tableString += '<td class="red" id="' + i.toString().concat(j.toString()) + '"></td>';
      } else if (gameString[gameIndex] == 0){
        tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"></td>';
      } else if (gameString[gameIndex] == 1) {
        tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src=' + red_image + '></td>';
      } else if (gameString[gameIndex] == 2){
        tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src=' + black_image + '></td>';
      } else if (gameString[gameIndex] == 3) {
        tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src=' + red_star_image + '></td>';
      } else if (gameString[gameIndex] == 4){
        tableString += '<td class="black" id="' + i.toString().concat(j.toString()) + '"><img src=' + black_star_image + '></td>';
      }
    }
    tableString += '</tr>';
  }
  // end table:
  tableString += '</table>';
  table.innerHTML = tableString;
}

function update_board() {
  for(var i = 0; i < size; ++i) {
    for(var j = 0; j < size; ++j) {
      var gameIndex = convertFromBaseToBase(i.toString().concat(j.toString()), 8, 10);
      var cellId = i.toString().concat(j.toString());
      if (gameString[gameIndex] == 9 || gameString[gameIndex] == 0) {
        document.getElementById(cellId).innerHTML = '';
      } else if (gameString[gameIndex] == 1) {
        document.getElementById(cellId).innerHTML = '<img src=' + red_image + '>';
      } else if (gameString[gameIndex] == 2){
        document.getElementById(cellId).innerHTML = '<img src=' + black_image + '>';
      } else if (gameString[gameIndex] == 3) {
        document.getElementById(cellId).innerHTML = '<img src=' + red_star_image + '>';
      } else if (gameString[gameIndex] == 4){
        document.getElementById(cellId).innerHTML = '<img src=' + black_star_image + '>';
      }
    }
  }
  var redCount = 0;
  var blackCount = 0;
  for(var i = 0; i < numCells; ++i) {
    if (gameString[i] == 1 || gameString[i] == 3) {
      redCount++;
    } else if (gameString[i] == 2 || gameString[i] == 4) {
      blackCount++;
    }
  }
  if(redCount == 0 && gameEnded == false) {
    document.getElementById('table').innerHTML = '<img src="i_win.gif"/>'
    gameEnded = true;
  }
  if (blackCount == 0 && gameEnded == false) {
    document.getElementById('table').innerHTML = '<img src="i_win_2.gif"/>'
    gameEnded = true;
  }
}

function display_game_info(game_info, red_info, black_info) {
  var gameInfoDiv = document.getElementById('gameInfo');
  var playerInfoDiv = document.getElementById('playerInfo');

  gameInfoDiv.innerHTML = 'gameString is: ' + game_info;
  playerInfoDiv.innerHTML = red_info + ' ' + black_info;
}

//css swapping code:
function classic_css(){
	document.getElementById('css').setAttribute('href', 'classic.css');
  red_image = '"checkers/red_plain.png"';
  red_star_image = '"checkers/red_star.png"';
  black_image = '"checkers/black_plain.png"';
  black_star_image = '"checkers/black_star.png"';
  update_board();
}
function old_school_css(){
	document.getElementById('css').setAttribute('href', 'old_school.css');
  red_image = '"checkers/white_plain.png"';
  red_star_image = '"checkers/white_star.png"';
  black_image = '"checkers/brown_plain.png"';
  black_star_image = '"checkers/brown_star.png"';
  update_board();
}
function uvu_css(){
	document.getElementById('css').setAttribute('href', 'uvu.css');
  red_image = '"checkers/yellow_plain.png"';
  red_star_image = '"checkers/yellow_star.png"';
  black_image = '"checkers/green_plain.png"';
  black_star_image = '"checkers/green_star.png"';
  update_board();
}

//-------------------------------------------MODEL-------------------------------------------
//1 is a red checker, 2 is a black checker, 0 is an empty black space, 9 is a red space. 3 will be a red star, and 4 a black star.

//this is a new game
//var gameString = '1919191991919191191919199090909009090909929292922929292992929292';

//this is the saved_game from the xml file
var gameString = '0909094990949090090909099392909009090909909090910929090992939290'

//this on has one of each type of checker
//var gameString = '0909090990939090090909099091909009092909909090900909490990909090';

var size = 8;
var player1Checkers = 12;
var player2Checkers = 12;
var numCells = 64;
var gameEnded = false;

function replaceAt(wholeString, index, char) {
  return wholeString.substr(0, index) + char + wholeString.substr(index + 1);
}

//-------------------------------------------CONTROLLER-------------------------------------------

function cell_click() {
  var cells = document.getElementsByTagName("td");
  var selectedCell = '00'; //start selected cell out at 00 so it doesn't try to set the border of undefined.

  for(var i = 0; i < numCells; ++i) {
    cells[i].onclick = function() {
      //change HTML of cell here.
      console.log('in cell ' + this.id);
      //reset last selected cell to black border
      document.getElementById(selectedCell).style.border = "2px solid black";
      //find row and column and check for black cell. Only allow selections of black cells.
      var idString = this.id
      if ((this.id[0] % 2 === 0 && this.id[1] % 2 === 0) || (this.id[0] % 2 != 0 && this.id[1] % 2 != 0)) {
        //set selected cell border to white
        this.style.border = "2px solid white";
        //if the last selected cell had a checker, and the current selected cell is a valid move, then move the checker.
        validate_move(this.id, selectedCell);
        //set new selected cell
        selectedCell = this.id;
      }
    };
  }
}

//also remember to factor in turns. If red just moved, then only black can move. (would this be if red was current AND previous?)

function validate_move(currentCell, previousCell) {

  //sorry for the magic numbers, I'll fix them soon...
  //I also know that I should factor out these if/if else statements into another function. I just haven't had the time.

  //these are base 10
  var current = convertFromBaseToBase(currentCell, 8, 10);
  var previous = convertFromBaseToBase(previousCell, 8, 10);

  var currentInt = parseInt(current);
  var previousInt = parseInt(previous);

  //these are base 8 (IDs)
  var currentCellInt = parseInt(currentCell);
  var previousCellInt = parseInt(previousCell);

  //red plain checkers:
  if (gameString[previous] == 1 && gameString[current] == 0) {
    if (currentCell - previousCell == 11 || currentCell - previousCell == 9) {
      if(currentCell == 71 || currentCell == 73 || currentCell == 75 || currentCell == 77) {
        //plain turns into star:
        gameString = replaceAt(gameString, parseInt(previous), '0');
        gameString = replaceAt(gameString, parseInt(current), '3');
        update_board();
      } else {
        //everything else:
        gameString = replaceAt(gameString, parseInt(previous), '0');
        gameString = replaceAt(gameString, parseInt(current), '1');
        update_board();
      }
    }
    //red jumping code
    var opponentIndex;
    if(currentCellInt - previousCellInt == 22) {
      //red jumping staring code------------------------------------------------------------
      if(currentCell == 71 || currentCell == 73 || currentCell == 75 || currentCell == 77) {
        opponentIndex = currentInt - 9;
        if (gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '3');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      } else {
        opponentIndex = currentInt - 9;
        if (gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '1');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      }
    } else if(currentCellInt - previousCellInt == 18) {
      //red jumping staring code------------------------------------------------------------
      if(currentCell == 71 || currentCell == 73 || currentCell == 75 || currentCell == 77) {
        opponentIndex = currentInt - 7;
        if(gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '3');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      } else {
        opponentIndex = currentInt - 7;
        if (gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '1');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      }
    }
  }

  //black plain checkers:
  if (gameString[previous] == 2 && gameString[current] == 0) {
    if (previousCell - currentCell == 11 || previousCell - currentCell == 9) {
      if (currentCell == 00 || currentCell == 02 || currentCell == 04 || currentCell == 06) {
        //plain turns into star:
        gameString = replaceAt(gameString, parseInt(previous), '0');
        gameString = replaceAt(gameString, parseInt(current), '4');
        update_board();
      } else {
        //everything else:
        gameString = replaceAt(gameString, parseInt(previous), '0');
        gameString = replaceAt(gameString, parseInt(current), '2');
        update_board();
      }
    }
    //black jumping code
    var opponentIndex;
    if(previousCellInt - currentCellInt == 22) {
      // black jumping staring code----------------------------------------------------------
      if (currentCell == 00 || currentCell == 02 || currentCell == 04 || currentCell == 06) {
        opponentIndex = currentInt + 9;
        if (gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '4');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      } else {
        opponentIndex = currentInt + 9;
        if (gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '2');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      }
    } else if (previousCellInt - currentCellInt == 18) {
      //black jumping staring code-----------------------------------------------------------
      if (currentCell == 00 || currentCell == 02 || currentCell == 04 || currentCell == 06) {
        opponentIndex = currentInt + 7;
        if(gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '4');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      } else {
        opponentIndex = currentInt + 7;
        if (gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
          gameString = replaceAt(gameString, previousInt, '0');
          gameString = replaceAt(gameString, currentInt, '2');
          gameString = replaceAt(gameString, opponentIndex, '0');
          update_board();
        }
      }
    }
  }

  //red star checkers:
  if (gameString[previous] == 3 && gameString[current] == 0) {
    if (previousCell - currentCell == 11 || previousCell - currentCell == 9 || currentCell - previousCell == 11 || currentCell - previousCell == 9) {
      gameString = replaceAt(gameString, parseInt(previous), '0');
      gameString = replaceAt(gameString, parseInt(current), '3');
      update_board();
    }
    //red star jumping code
    var opponentIndex;
    if(previousCellInt - currentCellInt == 22) {
      opponentIndex = currentInt + 9;
      if (gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '3');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    } else if(previousCellInt - currentCellInt == 18) {
      opponentIndex = currentInt + 7;
      if(gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '3');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    } else if(currentCellInt - previousCellInt == 22) {
      opponentIndex = currentInt - 9;
      if (gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '3');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    } else if(currentCellInt - previousCellInt == 18) {
      opponentIndex = currentInt - 7;
      if(gameString[opponentIndex] == 2 || gameString[opponentIndex] == 4) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '3');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    }
  }

  //black star checkers:
  if (gameString[previous] == 4 && gameString[current] == 0) {
    if (previousCell - currentCell == 11 || previousCell - currentCell == 9 || currentCell - previousCell == 11 || currentCell - previousCell == 9) {
      gameString = replaceAt(gameString, parseInt(previous), '0');
      gameString = replaceAt(gameString, parseInt(current), '4');
      update_board();
    }
    //black star jumping code
    var opponentIndex;
    if(previousCellInt - currentCellInt == 22) {
      opponentIndex = currentInt + 9;
      if (gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '4');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    } else if(previousCellInt - currentCellInt == 18) {
      opponentIndex = currentInt + 7;
      if(gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '4');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    } else if(currentCellInt - previousCellInt == 22) {
      opponentIndex = currentInt - 9;
      if (gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '4');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    } else if(currentCellInt - previousCellInt == 18) {
      opponentIndex = currentInt - 7;
      if(gameString[opponentIndex] == 1 || gameString[opponentIndex] == 3) {
        gameString = replaceAt(gameString, previousInt, '0');
        gameString = replaceAt(gameString, currentInt, '4');
        gameString = replaceAt(gameString, opponentIndex, '0');
        update_board();
      }
    }
  }
}

function read_xml_file() {
  var request = new XMLHttpRequest();
  request.open("GET", "saved_game.xml", false);
  request.send(null);
  var xmldoc = request.responseXML;

  var xmlElement = xmldoc.getElementById('saved_game');
  var playerElements = xmldoc.getElementsByTagName('player');
  var red_plain = playerElements[0].getAttribute('plain_checkers');
  var red_star = playerElements[0].getAttribute('star_checkers');
  var black_plain = playerElements[1].getAttribute('plain_checkers');
  var black_star = playerElements[1].getAttribute('star_checkers');

  var red_info = "Red: Plain checkers: " + red_plain + ". Star checkers: " + red_star + ".";
  var black_info = "Black: Plain checkers: " + black_plain + ". Star checkers: " + black_star + ".";
  var game_info = xmlElement.getAttribute('game_string');

  display_game_info(game_info, red_info, black_info);
}

function convertFromBaseToBase(str, fromBase, toBase) {
  var num = parseInt(str, fromBase);
  return num.toString(toBase);
}
