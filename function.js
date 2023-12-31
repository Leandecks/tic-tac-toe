"use strict";
console.log("JS Started");

const gameboard = (function () {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  const getBoard = () => board;

  /* 
  [0][1][2]
  [3][4][5]
  [6][7][8]
  */

  function printBoard() {
    let outputBoard = "";

    for (let i = 0; i < 9; i++) {
      if ((i + 1) % 3 === 0) {
        outputBoard += `[${board[i]}]\n`;
      } else {
        outputBoard += `[${board[i]}]`;
      }
    }

    return outputBoard;
  }

  function getBoardCell (cellNumber) {
    const cellContent = board[cellNumber];
    return cellContent;
  }

  function setBoardCell (cellNumber, cellContent) {
    if ((cellContent === "X" || cellContent === "O") && board[cellNumber] === "") {
      board[cellNumber] = cellContent;
    }
  }

  return { getBoard, getBoardCell, setBoardCell, printBoard };
})();

function Player(name, symbol) {
  const playTurn = () => {
    const field = prompt(`Choose field, ${name}: `);
    gameboard.setBoardCell(field, symbol)
  }
  return { name, symbol, playTurn };
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

function checkForGameEnd(board) {
  /*
  * 0 = game not finished
  * 1 = O win
  * 2 = X win
  * */

  let result = 0;

  if (
      board[0] === "O" && board[1] === "O" && board[2] === "O"
      || board[3] === "O" && board[4] === "O" && board[5] === "O"
      || board[6] === "O" && board[7] === "O" && board[8] === "O"
      || board[0] === "O" && board[3] === "O" && board[6] === "O"
      || board[1] === "O" && board[4] === "O" && board[7] === "O"
      || board[2] === "O" && board[5] === "O" && board[8] === "O"
      || board[0] === "O" && board[4] === "O" && board[8] === "O"
      || board[2] === "O" && board[4] === "O" && board[6] === "O"
  ) {
    result =  1;
  } else if (
      board[0] === "X" && board[1] === "X" && board[2] === "X"
      || board[3] === "X" && board[4] === "X" && board[5] === "X"
      || board[6] === "X" && board[7] === "X" && board[8] === "X"
      || board[0] === "X" && board[3] === "X" && board[6] === "X"
      || board[1] === "X" && board[4] === "X" && board[7] === "X"
      || board[2] === "X" && board[5] === "X" && board[8] === "X"
      || board[0] === "X" && board[4] === "X" && board[8] === "X"
      || board[2] === "X" && board[4] === "X" && board[6] === "X"
  ) {
    result = 2;
  } else {
    result = 0;
  }

  return result;
}

function playGame() {
  alert("Welcome to Tic Tac Toe!");

  let result = 0;

  while (true) {
    player1.playTurn();
    result = checkForGameEnd(gameboard.getBoard());
    if (result !== 0) {
      break;
    }

    player2.playTurn();
    result = checkForGameEnd(gameboard.getBoard());
    if (result !== 0) {
      break;
    }
  }

  if (result === 1) {
    alert("Player 2 wins!")
  } else if (result === 2) {
    alert("Player 1 wins!")
  }
}

playGame();