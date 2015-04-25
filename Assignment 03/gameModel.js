'use strict';

var CheckersModel = function() {
  var player1NameModel = "";
  var player2NameModel = "";
  //1 is a red checker, 2 is a black checker, 0 is an empty space.
  var gameString = "1010101010101010101010100000000000000000020202020202020202020202";

  var player1Checkers;
  var player2Checkers;
}

CheckersModel.prototype.generate_board = function() {
  var endRed = 3;
  var startBlack = CheckersModel.rowsModel - 3;
}
