/*
Assignment

    Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.
    You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, 
    and you’re probably going to want an object to control the flow of the game itself.
        Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: 
        if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
    Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually 
        fill in the array with "X"s and "O"s)
    Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place 
    their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
        Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
        If you’re having trouble, Building a house from the inside out is a great article that lays out a highly applicable example of how you might organize your code for this project.
    Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
    Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that 
    congratulates the winning player!
    Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
        Start by just getting the computer to make a random legal move.
        Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
        If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!

*/

// Tie
// End game


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
    let currentPlayer = 1;
    const turn = (number) => {      // executes after click on field
        if (gameBoard.getField(number) == 0){
            gameBoard.setField(number, currentPlayer);
            display.field(number, currentPlayer);
            gameFlow.switchPlayer();
            gameBoard.checkForWinner();
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
        console.log(winningPlayer);
    }

    return {turn, switchPlayer, endGame};
})();

// Player objects

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
    return {field};
})();
