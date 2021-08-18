let score = 0;
let colorSelector = 0;
let geniusPattern = [];
let playerPattern = [];
let geniusColor = ["green", "red", "yellow", "blue"];
const blueGenius = document.querySelector(".blue");
const redGenius = document.querySelector(".red");
const greenGenius = document.querySelector(".green");
const yellowGenius = document.querySelector(".yellow");

const generatePattern = () =>
  geniusPattern.push(geniusColor[parseInt(Math.random() * geniusColor.length)]);

const handleClick = (event) => {
  playerPattern.push(event.target.classList[0]);
  idx = playerPattern.length - 1;
  if (playerPattern[idx] != geniusPattern[idx]) {
    gameOver();
    return;
  }
  if (playerPattern.length === geniusPattern.length) {
    score = geniusPattern.length;
    document.querySelector(
      ".scoreboard"
    ).innerHTML = `Your score: ${score} point(s)`;
    playerPattern = [];
    unsetPlay();
    generatePattern();
    showPatterns();
  }
};

const restartGame = () => {
  document.querySelector(".game-over").style.display = "none";
  addEventListener("keydown", handleKey);
  document.querySelector(".game-instructions").style.display = "flex";
  score = 0;
  colorSelector = 0;
  geniusPattern = [];
  playerPattern = [];
  document.querySelector(".countdown").innerHTML = "<h1>3</h1>";
};

const gameOver = () => {
  unsetPlay();
  document.querySelector(".game-over").style.display = "flex";
  document.querySelector(
    ".game-over"
  ).innerHTML = `<h1>You lose!</h1> <p>Your score was: ${score} points</p> <p class="try-again" onclick="restartGame()"> Try again ?</p>`;
};

const unsetPlay = () => {
  blueGenius.removeEventListener("click", handleClick);
  redGenius.removeEventListener("click", handleClick);
  greenGenius.removeEventListener("click", handleClick);
  yellowGenius.removeEventListener("click", handleClick);
  blueGenius.classList.remove("clickable");
  redGenius.classList.remove("clickable");
  yellowGenius.classList.remove("clickable");
  greenGenius.classList.remove("clickable");
};

const setPlay = () => {
  blueGenius.addEventListener("click", handleClick);
  redGenius.addEventListener("click", handleClick);
  greenGenius.addEventListener("click", handleClick);
  yellowGenius.addEventListener("click", handleClick);
  blueGenius.classList.add("clickable");
  redGenius.classList.add("clickable");
  yellowGenius.classList.add("clickable");
  greenGenius.classList.add("clickable");
};

const showPattern = () => {
  if (colorSelector > geniusPattern.length - 1) {
    colorSelector = 0;
    clearInterval(patternInterval);
    setPlay();
    return;
  }
  var element = document.querySelector(`.${geniusPattern[colorSelector]}`);
  colorSelector++;
  element.classList.add("select");
  setTimeout(() => {
    element.classList.remove("select");
  }, 300);
};

const showPatterns = () => {
  patternInterval = setInterval(showPattern, 1000);
};

const startGame = () => {
  removeEventListener("keydown", handleKey);
  document.querySelector(".game-instructions").style.display = "none";
  document.querySelector(".countdown").style.display = "flex";
  generatePattern();
  setTimeout(
    () => (document.querySelector(".countdown").innerHTML = "<h1>3</h1>"),
    1000
  );
  setTimeout(
    () => (document.querySelector(".countdown").innerHTML = "<h1>2</h1>"),
    2000
  );
  setTimeout(
    () => (document.querySelector(".countdown").innerHTML = "<h1>1</h1>"),
    3000
  );
  setTimeout(
    () => (document.querySelector(".countdown").style.display = "none"),
    3500
  );
  setTimeout(() => showPatterns(), 3700);
};

const handleKey = (event) => {
  if (event.key === "Enter") startGame();
};

addEventListener("keydown", handleKey);
