let score = 0;
let geniusPattern = [];
let geniusColor = ["green", "red", "yellow", "blue"];
const blueGenius = document.querySelector(".blue");
const redGenius = document.querySelector(".red");
const greenGenius = document.querySelector(".green");
const yellowGenius = document.querySelector(".yellow");

const generatePattern = () =>
  geniusPattern.push(geniusColor[parseInt(Math.random() * geniusColor.length)]);

const showPattern = (color) =>
  new Promise((resolve) => {
    var element = document.querySelector(`.${color}`);
    element.classList.add("select");
    setTimeout(() => {
      element.classList.remove("select");
      resolve();
    }, 1000);
  });

const showPatterns = (colorArray) =>
  new Promise((resolve) => {
    if (colorArray.length > 1) {
      showPattern(colorArray[0]).then(() => showPatterns(colorArray.slice(1)));
    } else {
      resolve();
      showPattern(colorArray[0]);
    }
  });

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
  setTimeout(() => showPatterns(geniusPattern), 4000);
};

const handleKey = (event) => {
  if (event.key === "Enter") startGame();
};

addEventListener("keydown", handleKey);
