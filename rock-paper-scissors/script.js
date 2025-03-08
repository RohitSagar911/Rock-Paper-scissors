//defining needed const and variables
const choices = ["rock", "paper", "scissors"];
const youDisplay = document.getElementById("youDisplay");
const computerDisplay = document.getElementById("compDisplay");
const display = document.getElementById("display");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const draw = document.getElementById("draw");
const reset = document.getElementById("btn1");
let playerwin = 0;
let computerwin = 0;
let nowins = 0;

//function to play a game
function playGame(playerchoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = "";

  //swich case to decide who wins in certain condition
  if (computerChoice === playerchoice) {
    result = "It's a Tie";
  } else {
    switch (playerchoice) {
      case "rock":
        result = computerChoice === "scissors" ? "You Won!" : "You Lost!";
        break;
      case "scissors":
        result = computerChoice === "paper" ? "You Won!" : "You Lost!";
        break;
      case "paper":
        result = computerChoice === "rock" ? "You Won!" : "You Lost!";
        break;
    }
  }

  // Converts choices to emojis
  const emojiMap = {
    rock: "👊🏻",
    paper: "🖐🏻",
    scissors: "✌🏻",
  };

  // saves emojis in variable,so we can diplay them in window
  let playerChoiceD = emojiMap[playerchoice];
  let computerChoiceD = emojiMap[computerChoice];

  // **Animation Effect** (Fade Out)
  youDisplay.style.opacity = "0";
  computerDisplay.style.opacity = "0";
  display.style.opacity = "0";

  setTimeout(() => {
    // Update the Ui after a short delay (Fade In)
    youDisplay.textContent = playerChoiceD;
    computerDisplay.textContent = computerChoiceD;
    display.textContent = result;

    youDisplay.style.opacity = "1";
    computerDisplay.style.opacity = "1";
    display.style.opacity = "1";

    // result color styling and updating variables also saving data
    if (result === "You Won!") {
      display.style.color = "lime";
      playerwin++;
      saveData(); 
      player.textContent = playerwin;
    } else if (result === "You Lost!") {
      display.style.color = "red";
      computerwin++;
      saveData();
      computer.textContent = computerwin;
    } else {
      display.style.color = "darkorange";
      nowins++;
      draw.textContent = nowins;
    }

    // Apply "shake" effect using classList property
    youDisplay.classList.add("pop");
    computerDisplay.classList.add("pop");

    setTimeout(() => {
      youDisplay.classList.remove("pop");
      computerDisplay.classList.remove("pop");
    }, 300); // Remove shake effect after 300ms
  }, 200); // Delay of 200ms for fade-out effect
  saveData();
}
// function to save data in browser's local storage!
function saveData() {
  //setItem() to save data
  localStorage.setItem("playerwin", playerwin);
  localStorage.setItem("computerwin", computerwin);
  localStorage.setItem("nowins", nowins);
}
//event function to resets the score to 0 or default
reset.addEventListener("click", () => {

  // confiming if user want to reset data 
  if (confirm("this will reset all your previous score?")) {
    // if yes(ok) it will reset data using the clear() function
        playerwin = localStorage.clear("playerwins");
        computerwin = localStorage.clear("computerwins");
        drawwin = localStorage.clear("nowins");
        relaodWindow();//calling the reload window function
      }

});
//function to show data after refreshig or reopening the window
function showData() {

  // retrieving the data using getItem() function
  playerwin = localStorage.getItem("playerwin")
    ? parseInt(localStorage.getItem("playerwin"))
    : 0;
  computerwin = localStorage.getItem("computerwin")
    ? parseInt(localStorage.getItem("computerwin"))
    : 0;
  nowins = localStorage.getItem("nowins")
    ? parseInt(localStorage.getItem("nowins"))
    : 0;
  
  //updating the score in UI
  player.textContent = playerwin;
  computer.textContent = computerwin;
  draw.textContent = nowins;
}

// function to reload the page so save or see changes
function relaodWindow() {
  window.location.reload();
}

showData(); // calling the function to show data when refreshed or re opened
