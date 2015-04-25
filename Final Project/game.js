//Joseph Cannon
//4/16/15
//CS 2550
//Prof. Wright

//------------------------------------------------------------------------------------------
//-------------------------------------------VIEW-------------------------------------------
//------------------------------------------------------------------------------------------

function page_init() {
  generate_board();
  cell_click();
  read_xml_file();
  document.getElementById("startButton").onclick = start_game;
  document.getElementById("newGame").onclick = new_game;
  document.getElementById("player1Input").focus();
  document.getElementById("player2Input").onkeypress = enter_press(event);
  //Instead of having two buttons, I need to use the gameInProgress (gameStarted?) bool to change the
  //value of the button so that it always starts a new game, and adds the player names in at the same
  //time, so you don't have to click two buttons to start a new game.
}

if (document && document.getElementById) {
  window.onload = page_init;
}

var red_image = '"checkers/red_plain.png"';
var black_image = '"checkers/black_plain.png"';
var red_star_image = '"checkers/red_star.png"';
var black_star_image = '"checkers/black_star.png"'

function display_player_names(player1, player2) {
  var player1Div = document.getElementById("player1");
  var player2Div = document.getElementById("player2");

  player1Div.innerHTML = "Player 1: " + player1;
  player2Div.innerHTML = "Player 2: " + player2;

  document.getElementById("player1Input").value = "";
  document.getElementById("player2Input").value = "";
}

function generate_board() {
  var table = document.getElementById('table');
  var tableString = "";
  var endRed = 3;
  var startBlack = size - 3;

  if(gameEnded == false) {
    load_game();
    console.log('game loaded');
  } else {
    gameEnded = false;
    console.log('game not loaded');
  }
  //set style here
  gameStarted = true;

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
      } else {
        console.log("table cell generation error");
      }
    }
    tableString += '</tr>';
  }
  // end table:
  tableString += '</table>';
  table.innerHTML = tableString;

  if(css === "classic") {
    console.log("classic if");
    document.getElementById("classic").checked = true;
    classic_css();
  }
  if(css === "old school") {
    console.log("old school if");
    document.getElementById("old_school").checked = true;
    old_school_css();
  }
  if(css === "uvu") {
    console.log("uvu if");
    document.getElementById("UVU").checked = true;
    uvu_css();
  }

  //this reads in model info for a new game and displays it on the page.
  read_xml_file();
}

function update_board() {
  for(var i = 0; i < size; ++i) {
    for(var j = 0; j < size; ++j) {
      var gameIndex = convertFromBaseToBase(i.toString().concat(j.toString()), 8, 10);
      var cellId = i.toString().concat(j.toString());
      if (gameString[gameIndex] == 9 || gameString[gameIndex] == 0) {
        document.getElementById(cellId).innerHTML = '';
      } if (gameString[gameIndex] == 1) {
        document.getElementById(cellId).innerHTML = '<img src=' + red_image + '>';
      }  if (gameString[gameIndex] == 2){
        document.getElementById(cellId).innerHTML = '<img src=' + black_image + '>';
      }  if (gameString[gameIndex] == 3) {
        document.getElementById(cellId).innerHTML = '<img src=' + red_star_image + '>';
      }  if (gameString[gameIndex] == 4){
        document.getElementById(cellId).innerHTML = '<img src=' + black_star_image + '>';
      }
    }
  }

  //win code:
  var redCount = 0;
  var blackCount = 0;
  for(var i = 0; i < numCells; ++i) {
    if (gameString[i] == 1 || gameString[i] == 3) {
      redCount++;
    } else if (gameString[i] == 2 || gameString[i] == 4) {
      blackCount++;
    }
  }
  var color1 = "Red";
  var color2 = "Black";
  if(css == "classic" ) {
    color1 = "Red";
    color2 = "Black";
  } else if(css == "old school") {
    color1 = "White";
    color2 = "Brown";
  } else {
    color1 = "Yellow";
    color2 = "Green";
  }

  //color1 (red/white/yellow) wins
  if(blackCount == 0 && gameEnded == false) {
    document.getElementById('table').innerHTML = '<video width="480" height="360" autoplay><source src="videos/i_win.mp4" type="video/mp4">Your browser does not support this video tag.</video>';
    document.getElementById('player1').innerHTML = '<h1>' + color1 + ' wins!<h1>';
    document.getElementById('player2').innerHTML = '';
    gameEnded = true;
  }
  //color2 (black/brown/green) wins
  if (redCount == 0 && gameEnded == false) {
    document.getElementById('table').innerHTML = '<video width="480" height="360" autoplay><source src="videos/i_win.mp4" type="video/mp4">Your browser does not support this video tag.</video>';
    document.getElementById('player1').innerHTML = '<h1>' + color2 + ' wins!</h1>';
    document.getElementById('player2').innerHTML = '';
    gameEnded = true;
  }
  save_game();
}

function display_game_info(game_info, red_info, black_info) {
  var gameInfoDiv = document.getElementById('gameInfo');
  var playerInfoDiv = document.getElementById('playerInfo');

  gameInfoDiv.innerHTML = 'gameString is: ' + game_info;
  playerInfoDiv.innerHTML = red_info + ' ' + black_info;
}

//I should make a page_style css, and then only swap the actual board css,
//so that when I need to change a style on the page itself, I don't have to
//change it in all 3 css files.

//css swapping code (triggered with radio button onclicks):
var css = "classic";
var styleChanged = false;
function classic_css(){
	document.getElementById('css').setAttribute('href', 'css/classic.css');
  css = "classic";
  styleChanged
  red_image = '"checkers/red_plain.png"';
  red_star_image = '"checkers/red_star.png"';
  black_image = '"checkers/black_plain.png"';
  black_star_image = '"checkers/black_star.png"';
  if(gameStarted == true) {
    update_board();
  } else {
    generate_board();
  }
}
function old_school_css(){
	document.getElementById('css').setAttribute('href', 'css/old_school.css');
  css = "old school";
  red_image = '"checkers/white_plain.png"';
  red_star_image = '"checkers/white_star.png"';
  black_image = '"checkers/brown_plain.png"';
  black_star_image = '"checkers/brown_star.png"';
  if(gameStarted == true) {
    update_board();
  } else {
    generate_board();
  }}
function uvu_css(){
	document.getElementById('css').setAttribute('href', 'css/uvu.css');
  css = "uvu";
  red_image = '"checkers/yellow_plain.png"';
  red_star_image = '"checkers/yellow_star.png"';
  black_image = '"checkers/green_plain.png"';
  black_star_image = '"checkers/green_star.png"';
  if(gameStarted == true) {
    update_board();
  } else {
    generate_board();
  }}

//------------------------------------------------------------------------------------------
//------------------------------------------MODEL-------------------------------------------
//------------------------------------------------------------------------------------------

//1 is a red checker, 2 is a black checker, 0 is an empty black space, 9 is a red space. 3 will be a red star, and 4 a black star.

var newGame = '1919191991919191191919199090909009090909929292922929292992929292';

//one of each type of checker
//var newGame = '0909090990939090090909099091909009092909909090900909490990909090';

//this is a new game
var gameString = '1919191991919191191919199090909009090909929292922929292992929292';

//this is the saved_game from the xml file
//var gameString = '0909094990949090090909099392909009090909909090910929090992939290';

//this one has one of each type of checker
//var gameString = '0909090990939090090909099091909009092909909090900909490990909090';

var size = 8;
var player1Checkers = 12;
var player2Checkers = 12;
var numCells = 64;
var gameEnded = false;

function replaceAt(wholeString, index, char) {
  return wholeString.substr(0, index) + char + wholeString.substr(index + 1);
}

//------------------------------------------------------------------------------------------
//----------------------------------------CONTROLLER----------------------------------------
//------------------------------------------------------------------------------------------

var player1Name = "";
var player2Name = "";
var gameStarted;

function start_game() {
  var player1Input = document.getElementById("player1Input");
  var player2Input = document.getElementById("player2Input");
  player1Name = player1Input.value;
  player2Name = player2Input.value;
  gameStarted = true;

  display_player_names(player1Name, player2Name);
}

function new_game() {
  gameString = newGame;
  player1Name = "";
  player2Name = "";
  save_game();
  generate_board();
  update_board();
  display_player_names(player1Name, player2Name);

  //reload the page to fix bug where checkers wouldn't move w/o a refresh
  location.reload();
}

function enter_press(e) {
  //the purpose of this function is to allow the enter key to
  //point to the correct button to click.
  var ev = e || window.event;
  var key = ev.keyCode;

  if (key == 13)
  {
     //Get the button the user wants to have clicked
     var btn = document.getElementById(buttonName);
     if (btn != null)
     {
        //If we find the button click it
        btn.click();
        ev.preventDefault();
     }
  }
}

function cell_click() {
  var cells = document.getElementsByTagName("td");
  var selectedCell = '00'; //start selected cell out at 00 so it doesn't try to set the border of undefined.

  for(var i = 0; i < numCells; ++i) {
    cells[i].onclick = function() {
      //change HTML of cell here.
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


function validate_move(currentCell, previousCell) {

  //sorry for the magic numbers, I'll fix them soon...
  //I also know that I should refactor all these if/if else statements
  //into another function. I just haven't had the time.

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

function save_game() {
  var save = {
    player1Name: this.player1Name,
    player2Name: this.player2Name,
    css: this.css,
    gameString: this.gameString,
    gameEnded: this.gameEnded
  };
  window.localStorage.setItem('savedGame', JSON.stringify(save));
}

function load_game() {
  var json = window.localStorage.getItem('savedGame');

  if(json) {
    var save = JSON.parse(json);

    this.player1Name = save.player1Name;
    this.player2Name = save.player2Name;
    this.css = save.css;
    this.gameString = save.gameString;
    this.gameEnded = save.gameEnded;
    display_player_names(player1Name, player2Name);
  }
}

function read_xml_file() {
  var request = new XMLHttpRequest();
  request.open("GET", "new_game.xml", false);
  request.send(null);
  var xmlDoc = request.responseXML;

  var xmlElement = xmlDoc.getElementById('new_game');
  var playerElements = xmlDoc.getElementsByTagName('player');
  var red_plain = playerElements[0].getAttribute('plain_checkers');
  var red_star = playerElements[0].getAttribute('star_checkers');
  var black_plain = playerElements[1].getAttribute('plain_checkers');
  var black_star = playerElements[1].getAttribute('star_checkers');

  var red_info = "<u>Red:</u> Plain checkers: " + red_plain + ". Star checkers: " + red_star + ".";
  var black_info = "<u>Black:</u> Plain checkers: " + black_plain + ". Star checkers: " + black_star + ".";
  var game_info = xmlElement.getAttribute('game_string');

  display_game_info(game_info, red_info, black_info);
}

function convertFromBaseToBase(str, fromBase, toBase) {
  var num = parseInt(str, fromBase);
  return num.toString(toBase);
}
