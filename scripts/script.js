let rounds = 1, curRound = 0, rWonByUser=0, rWonByCom=0, ties=0, isGameStarted=false;
let resultText = ["Oops! You lost this round. Better luck next time.", "Congratulations! You won this round.", "Ahh! It's a draw"];

const generateComChoice = () => {
       return Math.floor(Math.random()*3)
}

const playRound = (userChoice) => {
       if (!isGameStarted) {
              document.getElementById("resultAlert").classList.add("alert")
              document.getElementById("resultAlert").classList.add("alert-danger")
              document.getElementById("resultAlert").classList.add("text-center")
              document.getElementById("resultAlert").classList.add("fw-bold")
              document.getElementById("resultAlert").innerHTML = "Game is not started yet! Click on \"START button\" to start the game."
       }
       if (isGameStarted && curRound<rounds) {
              document.getElementById("resultAlert").className = "";
              document.getElementById("userSelected").src="./images/"+userChoice+".jpg";
              let comChoice = generateComChoice()
              document.getElementById("comSelected").src="./images/"+comChoice+".jpg";
              let result;

              if(userChoice===0 && comChoice===0)
                     result=2
              else if (userChoice===0 && comChoice===1)
                     result=0
              else if (userChoice===0 && comChoice===2)
                     result=1
              else if (userChoice===1 && comChoice===0)
                     result=1
              else if (userChoice===1 && comChoice===1)
                     result=2
              else if (userChoice===1 && comChoice===2)
                     result=0
              else if (userChoice===2 && comChoice===0)
                     result=0
              else if (userChoice===2 && comChoice===1)
                     result=1
              else if (userChoice===2 && comChoice===2)
                     result=2

              if (result===0) {
                     //user lost round
                     updateRWonByCom(rWonByCom+1)
                     updateCurRound(curRound+1)
                     document.getElementById("resultAlert").classList.add("alert")
                     document.getElementById("resultAlert").classList.add("alert-danger")
                     document.getElementById("resultAlert").classList.add("text-center")
                     document.getElementById("resultAlert").innerHTML = resultText[result]
              } else if (result===1) {
                     //user won round
                     updateRWonByUser(rWonByUser+1)
                     updateCurRound(curRound+1)
                     document.getElementById("resultAlert").classList.add("alert")
                     document.getElementById("resultAlert").classList.add("alert-success")
                     document.getElementById("resultAlert").classList.add("text-center")
                     document.getElementById("resultAlert").innerHTML = resultText[result]
              } else {
                     //tie
                     updateTies(ties+1)
                     updateCurRound(curRound+1)
                     document.getElementById("resultAlert").classList.add("alert")
                     document.getElementById("resultAlert").classList.add("alert-primary")
                     document.getElementById("resultAlert").classList.add("text-center")
                     document.getElementById("resultAlert").innerHTML = resultText[result]
              }
       } else {
              //all rounds are over!
       }

       if (curRound==rounds) {
              //user played last round
              document.getElementById("startBtn").innerHTML = "Start"
              document.getElementById("startBtn").classList.remove("disabled")
              updateGameStatus(false)

              //calculate results and display it
              document.getElementById("resultAlert").className = "";
              document.getElementById("resultAlert").innerHTML = "";

              if (rWonByUser>rWonByCom) {
                     document.getElementById("fResultAlert").classList.add("alert")
                     document.getElementById("fResultAlert").classList.add("alert-success")
                     document.getElementById("fResultAlert").classList.add("text-center")
                     document.getElementById("fResultAlert").classList.add("fw-bold")
                     document.getElementById("fResultAlert").innerHTML = "Bravo! You won the game with "+rWonByUser+" points. You can start a new game by pressing start button."
              } else if (rWonByUser<rWonByCom) {
                     document.getElementById("fResultAlert").classList.add("alert")
                     document.getElementById("fResultAlert").classList.add("alert-danger")
                     document.getElementById("fResultAlert").classList.add("text-center")
                     document.getElementById("fResultAlert").classList.add("fw-bold")
                     document.getElementById("fResultAlert").innerHTML = "Oh no! You lost this game. Computer won the game with "+rWonByCom+" points. You can start a new game by pressing start button."
              } else {
                     document.getElementById("fResultAlert").classList.add("alert")
                     document.getElementById("fResultAlert").classList.add("alert-primary")
                     document.getElementById("fResultAlert").classList.add("text-center")
                     document.getElementById("fResultAlert").classList.add("fw-bold")
                     document.getElementById("fResultAlert").innerHTML = "Ohh! It's a draw. You both have same points. You can start a new game by pressing start button."
              }
       }
}

const updateCurRound = (number) => {
       curRound = number
       document.getElementById("roundNo").innerHTML=curRound
}

const updateRWonByUser = (number) => {
       rWonByUser = number
       document.getElementById("rUserWon").innerHTML=rWonByUser
}

const updateRWonByCom = (number) => {
       rWonByCom = number
       document.getElementById("rComWon").innerHTML=rWonByCom
}

const updateTies = (number) => {
       ties = number
       document.getElementById("rTied").innerHTML=ties
}

const updateGameStatus = (status) => {
       isGameStarted = status
}

const resetSelectedImg = () => {
       document.getElementById("userSelected").src="./images/placeholder.jpg";
       document.getElementById("comSelected").src="./images/placeholder.jpg";
}

const resetAll = () => {
       resetSelectedImg()
       updateCurRound(0)
       updateRWonByUser(0)
       updateRWonByCom(0)
       updateTies(0)
       updateGameStatus(false)

       document.getElementById("resultAlert").innerHTML = "";
       document.getElementById("resultAlert").className = "";
       document.getElementById("fResultAlert").innerHTML = "";
       document.getElementById("fResultAlert").className = "";
}

const startGame = () => {
       resetAll()
       updateGameStatus(true)

       rounds = document.getElementById("roundMenu").value
       document.getElementById("startBtn").innerHTML = "Started"
       document.getElementById("startBtn").classList.add("disabled")
}

const resetGame = () => {
       resetAll()
       document.getElementById("startBtn").innerHTML = "Start"
       document.getElementById("startBtn").classList.remove("disabled")
}

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);

document.getElementById("rockImg").addEventListener("click", () => playRound(0));
document.getElementById("paperImg").addEventListener("click", () => playRound(1));
document.getElementById("scissorImg").addEventListener("click", () => playRound(2));