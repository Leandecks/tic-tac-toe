"use strict";

const gameboard = (function () {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  const getBoard = () => board;

  function setBoardCell (cellNumber, cellContent) {
    if ((cellContent === "X" || cellContent === "O") && board[cellNumber] === "") {
      board[cellNumber] = cellContent;
    }
  }

  function clearBoard() {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
  }

  function checkForGameEnd() {
    /*
    * 0 = game not finished
    * 1 = X win
    * 2 = O win
    * 3 = draw
    * */

    let result;
    let draw = true;

    board.forEach(cell => {
      if (cell === "") {
        draw = false;
      }
    });

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
      result =  2;
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
      result = 1;
    } else if (draw) {
      result = 3;
    } else {
      result = 0;
    }

    return result;
  }

  return { getBoard, setBoardCell, clearBoard, checkForGameEnd };
})();

function Player(name, symbol) {
  return { name, symbol };
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".start-button");

  playGame();
  startButton.addEventListener("click", () => {
    playGame();
  });
});

function displayBoard(board) {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0; i < 9; i++) {
    cells[i].textContent = board[i];
  }
}

function playGame() {
  const setDisplay = (text) => document.querySelector(".display").textContent = text;
  const cells = document.querySelectorAll(".cell");

  gameboard.clearBoard();
  displayBoard(gameboard.getBoard());

  setDisplay("Welcome to Tic Tac Toe!");

  let currentPlayer = player1;
  let gameEnded = false;

  setDisplay(`It's ${currentPlayer.name}'s turn`);

  cells.forEach(cell => {
    cell.addEventListener("click", () => {

      if (cell.textContent === "" && !gameEnded) {
        const cellNumber = cell.classList.item(1)[4] - 1;
        gameboard.setBoardCell(cellNumber, currentPlayer.symbol);
        displayBoard(gameboard.getBoard());
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;

      const result = gameboard.checkForGameEnd();

      if (result === 1) {
        setDisplay("Player 1 (X) wins!");
        gameEnded = true;
      } else if (result === 2) {
        setDisplay("Player 2 (O) wins!");
        gameEnded = true;
      } else if (result === 3) {
        gameEnded = true;
        setDisplay("It's a draw!")
      } else {
        setDisplay(`It's ${currentPlayer.name}'s turn`);
      }

    });
  });
}