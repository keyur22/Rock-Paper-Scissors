//Components of Start Section
let startSection = document.getElementById('startSection');//start section
let startGame = document.querySelector('#startSection button');//start button
let message = document.querySelector('.message'); //message for invalid entry


//Components of Game Section
let gameSection = document.getElementById('gameSection');//game section
let userChoice = document.getElementById('choiceUser');//user choice
let compChoice = document.getElementById('choiceComp');//computer choice
let buttons = document.querySelectorAll('.buttons button');//selection buttons
let userScore = document.querySelector('.userScore');//user Score
let compScore = document.querySelector('.compScore');//computer score
let roundResult = document.getElementById('roundResult');


//Initializing for round start
let count = 1;//counter for rounds
let pCount = 0, cCount = 0;//counter for wins
userScore.textContent = pCount;//display player score
compScore.textContent = cCount;//display computer score


//On click start game button
startGame.addEventListener("click", () => {

  let roundNo = document.getElementById('roundNo').value;

  //Check if no of rounds is valid
  if(roundNo == "" || roundNo == 0){
    message.setAttribute("style", "margin-top: 30px;")
    message.textContent = "INVALID NUMBER!!!";//display invalid entry
  }
  else
  {
    startSection.setAttribute("style", "display: none");//Hide Start-Game UI
    gameSection.setAttribute("style", "display: block");//display Game UI
    document.getElementById('roundNumber').textContent = 1;// display round no
    document.getElementById('roundTotal').textContent = roundNo;//display total rounds
  }
  
})


//choice of user
buttons.forEach((button) => {

  button.addEventListener("click",(e) => {
    userChoice.textContent = e.target.textContent.toLowerCase();//display user choice
    computerPlay();// generate computer choice
    game();//start the round
  })

})


//choice of computer
function computerPlay() {

  let collection = ["Rock", "Paper", "Scissors"];

  //randomly generate a no from 0 to 2 and return that array element
  let ComputerChoice = collection[Math.floor(Math.random() * 3)];
  compChoice.textContent = ComputerChoice.toLowerCase();//display computer choice

}

//tracking each round and displaying final result
function game(){

  let roundTotal = document.getElementById('roundTotal').textContent;//total rounds

  //if round number is less than total rounds
  if(count <= +roundTotal){
    document.getElementById('roundNumber').textContent = count;//display round number
    let user = userChoice.textContent;//get user choice
    let comp = compChoice.textContent;//get computer choice
    let result = playRound(user, comp); // winner of each round
    if (result == "player") {
      pCount++;
      userScore.textContent = pCount;//increment and display user score
    }
    else if (result == "computer") {
        cCount++;
        compScore.textContent = cCount;//increment and display computer score
    }
    count++;//increment round number
  }

  //after last round
  if(count > +roundTotal)
  { 
    restart();//restart function
  }
  
}

//result of each each round
function playRound(playerSelection, ComputerSelection) {

  switch(playerSelection) {

    case "rock":
      if(ComputerSelection == "rock") {
        roundResult.textContent = "DRAW!!! Go Again";
        return ("draw");
      } 
      else if (ComputerSelection == "paper") {
        roundResult.innerHTML = "Paper covers Rock<br>Computer Wins!!!";
        return ("computer");
      } 
      else {
        roundResult.innerHTML = "Rock crushes Scissors<br>You Win!!!";
        return ("player");
      }

    case "paper":
      if(ComputerSelection == "paper") {
        roundResult.textContent = "DRAW!!! Go Again";
        return ("draw");
      } 
      else if (ComputerSelection == "scissors") {
        roundResult.innerHTML = "Scissors cuts Paper<br>Computer Wins!!!";
        return ("computer");
      } 
      else {
        roundResult.innerHTML = "Paper covers Rock<br>You Win!!!";
        return ("player");
      }
      break;

    case "scissors":
      if(ComputerSelection == "scissors") {
        roundResult.textContent = "DRAW!!! Go Again";
        return ("draw");
      } 
      else if (ComputerSelection == "rock") {
        roundResult.innerHTML = "Rock crushes Scissors<br>Computer Wins!!!";
        return ("computer");
      } 
      else {
        roundResult.innerHTML = "Scissors cuts Paper<br>You Win!!!";
        return ("player");
      }
      break;

  }
  
}

//restart from final page
function restart(){

  gameSection.setAttribute("style", "display: none");//hide gameSection-UI
  resultSection = document.getElementById('resultSection');//result Section
  resultSection.setAttribute("style", "display: block");//display result Section
  document.querySelector('.userFinal').textContent = pCount;//display user Score
  document.querySelector('.compFinal').textContent = cCount;//display computer Score
  //display valid message
  if(pCount > cCount){
    document.querySelector('.finalResult').textContent = "Congratulations! You Won the game."
  }
  else if(pCount < cCount){
    document.querySelector('.finalResult').textContent = "Bad Luck! You Lost the game."
  }
  else if(pCount == cCount){
    document.querySelector('.finalResult').textContent = "Scores Level. It's a DRAW!!!."
  }
  restartButton = document.getElementById('restart');//restart button

  //initalizing everything to zero
  restartButton.addEventListener("click", () => {
    resultSection.setAttribute("style", "display: none");
    startSection.setAttribute("style", "display: block");
    message.textContent = ""//resetting invalid message
    pCount = 0; cCount = 0; count = 1;//initializing all scores to 0 and roundNumber to 1
    userScore.textContent = pCount;//display player score
    compScore.textContent = cCount;//display computer score
    userChoice.textContent = "";//resetting user choice
    compChoice.textContent = "";//resetting computer choice
    roundResult.textContent = "";//resetting result of round
  })
  
}