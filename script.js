const Game = (() => {
  let gameboard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let started = false;
  let currentTurn = "X";
  let terminated = false;
  let playerX = "X";
  let playerO = "O";
  function getTerminated() {
    return terminated;
  }
  function startGame(event) {
    gameboard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    currentTurn = "X";
    terminated = false;
    displayDOM.showBoard();
    event.preventDefault();
    document.querySelector(".results").close();
    document.querySelector(".results").style.display = "none";
    n1 = document.querySelector(".name1").value;
    n2 = document.querySelector(".name2").value;
    if (!(n2 == "" || n1 == "")) {
      playerX = n1;
      playerO = n2;
      started = true;
      event.target.textContent = "RESTART";
    } else alert("Enter Both Names!");
  }
  function getGameboard() {
    return gameboard;
  }
  function getCurrentTurn() {
    return currentTurn;
  }
  function getInput(event) {
    if (event.target.textContent == "" && started == true) {
      let i = parseInt(event.target.dataset.i);
      let j = parseInt(event.target.dataset.j);
      playGame.play(i, j);
    } else return false;
  }
  function changeTurn() {
    if (currentTurn == "X") currentTurn = "O";
    else currentTurn = "X";
  }
  function playTurn(i, j, symbol) {
    if (checkFinished()) {
      return false;
    } else {
      if (isFilled(i, j)) {
        console.log("Place Filled!");
      } else {
        gameboard[i][j] = symbol;
        changeTurn();
        return true;
      }
    }
  }
  function checkFinished() {
    let checkC = checkColumns();
    let checkR = checkRows();
    let checkD = checkDiagonals();
    let results = document.querySelector(".results");
    if (checkC.res) {
      winner = checkC.winner == "X" ? playerX : playerO;
      results.style.display = "flex";
      results.children[0].textContent = `${winner}`;
      results.children[1].textContent = "Won!";
      results.show();
      console.log(`${winner} Won!`);
      terminated = true;
      return true;
    } else if (checkR.res) {
      winner = checkR.winner == "X" ? playerX : playerO;
      results.style.display = "flex";
      results.children[0].textContent = `${winner}`;
      results.children[1].textContent = "Won!";
      results.show();
      console.log(`${winner} Won!`);
      terminated = true;
      return true;
    } else if (checkD.res) {
      winner = checkD.winner == "X" ? playerX : playerO;
      results.style.display = "flex";
      results.children[0].textContent = `${winner}`;
      results.children[1].textContent = "Won!";
      results.show();
      console.log(`${winner} Won!`);
      terminated = true;
      return true;
    } else if (checkDraw().res) {
      results.style.display = "flex";
      results.children[0].textContent = `DRAW!`;
      results.children[1].textContent = "";
      results.show();
      console.log(`DRAW!`);
      terminated = true;
      return true;
    }
    return false;
  }
  function checkRows() {
    for (let i = 0; i <= 2; i++) {
      if (
        gameboard[i][0] == gameboard[i][1] &&
        gameboard[i][1] == gameboard[i][2] &&
        gameboard[i][0] != 0
      )
        return { res: true, winner: gameboard[i][0] };
    }
    return { res: false };
  }
  function checkColumns() {
    for (let j = 0; j <= 2; j++) {
      if (
        gameboard[0][j] == gameboard[1][j] &&
        gameboard[1][j] == gameboard[2][j] &&
        gameboard[0][j] != 0
      )
        return { res: true, winner: gameboard[0][j] };
    }
    return { res: false };
  }
  function checkDiagonals() {
    if (
      gameboard[0][0] == gameboard[1][1] &&
      gameboard[1][1] == gameboard[2][2] &&
      gameboard[1][1] != 0
    )
      return { res: true, winner: gameboard[1][1] };
    else if (
      gameboard[0][2] == gameboard[1][1] &&
      gameboard[1][1] == gameboard[2][0] &&
      gameboard[1][1] != 0
    ) {
      return { res: true, winner: gameboard[1][1] };
    }
    return { res: false };
  }
  function checkDraw() {
    let c = 0;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (isFilled(i, j)) c++;
      }
    }
    if (c == 9) return { res: true };
    return { res: false };
  }
  function isFilled(i, j) {
    if (gameboard[i][j] != 0) return true;
    return false;
  }
  return {
    getGameboard,
    getCurrentTurn,
    getInput,
    playTurn,
    checkFinished,
    getTerminated,
    startGame,
  };
})();

const displayDOM = (() => {
  function addListener() {
    let cells = document.querySelector(".board").children;
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", (e) => Game.getInput(e));
    }
    startBtn = document
      .querySelector("button")
      .addEventListener("click", (e) => Game.startGame(e));
    closeBtn = document
      .querySelector(".results > button")
      .addEventListener("click", (e) => {
        e.target.parentElement.style.display = "none";
        e.target.parentElement.close();
      });
  }
  addListener();
  function getGameboard() {
    let gameboard = [];
    let board = Game.getGameboard();
    board.forEach((i) => {
      gameboard.push(i[0]);
      gameboard.push(i[1]);
      gameboard.push(i[2]);
    });
    return gameboard;
  }
  function showBoard() {
    let gameboard = getGameboard();
    let cells = document.querySelector(".board").children;
    for (let i = 0; i < cells.length; i++) {
      if (gameboard[i] != 0) {
        cells[i].textContent = gameboard[i];
        cells[i].style.fontSize = `calc(0.45 * ${
          window.getComputedStyle(cells[i]).width
        })`;
      } else cells[i].textContent = "";
    }
  }

  return { showBoard };
})();

const playGame = (() => {
  function play(i, j) {
    if (!Game.getTerminated()) {
      Game.playTurn(i, j, Game.getCurrentTurn());
      displayDOM.showBoard();
      Game.checkFinished();
    }
  }
  return { play };
})();
