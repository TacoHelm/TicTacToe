/*
Assignment


    Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that 
    congratulates the winning player!
    Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
        Start by just getting the computer to make a random legal move.
        Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
        If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

*/

// Meerdere rondes
// Namen spelers


// Gameboard object
const gameBoard = (function () {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    const setField = (number, status) => {
        board[number] = status;  // 0 = Empty, 1 = Player 1, 2 = Player 2
    }
    const getField = (number) => {
        return board[number];
    }
    const checkForWinner = () => {  // return winner // 0 = no winner, 1 = Player 1, 2 = Player 2
        const threeRow = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
        for (obj in threeRow) {
            if ((board[threeRow[obj][0]] == 1) && (board[threeRow[obj][1]] == 1) && (board[threeRow[obj][2]] == 1)) gameFlow.endGame(1);
            if ((board[threeRow[obj][0]] == 2) && (board[threeRow[obj][1]] == 2) && (board[threeRow[obj][2]] == 2)) gameFlow.endGame(2);
            }
    }
    const checkForTie = () => {
        let emptyFields = 0;
        for (obj in board) {
            if (board[obj] == 0) emptyFields++
            }
        if (emptyFields == 0) gameFlow.endGame('tie');
    }
    return {setField, getField, checkForWinner, checkForTie};
})();



// gameflow object
const gameFlow = (function () {
    let currentPlayer = 1; // 1 = Player 1 2 = Player 2
    let gameStop = true; // false = gameFlow.turn active true = .turn deactivated
    
    const startGame = () => {
        console.log(playerOne);
        gameStop = false;
    }
    
    const turn = (number) => {      // executes after click on field
        if (gameBoard.getField(number) == 0 && gameStop == false){
            gameBoard.setField(number, currentPlayer);
            display.field(number, currentPlayer);
            gameFlow.switchPlayer();
            gameBoard.checkForWinner();
            if (gameStop == true) return;
            gameBoard.checkForTie();
        }
    }
    
    const switchPlayer = () => {
        switch (currentPlayer) {
            case 1:
            currentPlayer = 2;
            break;
            case 2:
            currentPlayer = 1;
            break;
        }
    }
    const endGame = (winningPlayer) => {
        display.message(`Player ${winningPlayer} wins the game!`);
        gameStop = true;
        
    }

    return {startGame, turn, switchPlayer, endGame};
})();

// Player object

const playerOne = createPlayer("Player 1", 1);
const playerTwo = createPlayer("Player 2", 2);

function createPlayer(name, number) {
    let score = 0;
    const setName = (input) => {
        name = input;
        display.name(name, number);
    }
    console.log(name, score);
    const getName = () => name;
    const addScore = () => score++;
    const getScore = () => score;
    const resetScore = () => score = 0;
    return {setName, getName, addScore, getScore, resetScore}
}



// Display object

const display = (function (){
    const fields = document.querySelectorAll(".field"); 
    for (i = 0; i < fields.length; i++) {
        fields[i].addEventListener('click', (e) => gameFlow.turn(e.target.classList[0]));
    }
    const field = (number, status) => {
        if (status == 0) fields[number].innerHTML ='';
        if (status == 1) fields[number].innerHTML =`<img class="${number}" src="./Images/circle.svg"></img>`;
        if (status == 2) fields[number].innerHTML =`<img class="${number}" src="./Images/x.svg"></img>`;
    }

    const message = (text) => {
        document.querySelector(".message").innerHTML = text;
    }

    const name = (name, number) => {
        console.log(name, number);
        document.querySelector(`.name${number}`).textContent = name;
    }
    return {field, message, name};
})();

gameFlow.startGame();        // Starts game
