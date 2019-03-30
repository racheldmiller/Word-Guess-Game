// My list of favorite 90s shows ... and their word options
var words = ["Sister Sister", "Saved by the Bell", "Family Matters", "All That", "Friends", "The Fresh Prince of Bel-Air"]
var letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", "_"];

// game counters 
var blanks = 0; // blanks
var wins = 0; // number of wins 
var losses = 0; // number of losess
var maxGuesses = 10; // how many guesses the player has
var guessesRemaining = 0; // how many guesses are remaining 

// players guesses 
var guessedLetters = []; // stores guessed letters
var wrongGuesses = []; // stores wrong guesses
var ansWordArr = [];
var ansWord; 

// the token booleans
ifFinished = true; 
letterInWord= true;

// start game 
function setup() {

    // word is randomly chosen from the list
    ansWord = words[Math.floor(Math.random() * words.length)];

    ansWordArr = [];

    // adds "_" to ansWordArr ... here's my for loop
    for (var i = 0; i < ansWord.length; i++) { 
        ansWordArr[i] = "_";
    }

    // resetting after rounds
    numGuessesRemaining = maxNumGuesses; 
    guessedLetters = [];
    wrongGuesses = []; 

    // display gifs of shows 
    document.getElementById("giphy-embed").src = "";

    // to warn the player of running out of guesses
    document.getElementById("numGuesses").style.color = "";

    //show the selected elements on the screen 
    updateScreen();
    
};

// testing
console.log(ansWord); // to print word in console 

// updating HTML 
function updateScreen() {
    document.getElementById("wins").innerText = Wins; // prints wins, restarts game
    document.getElementById("losses").innerText = Losses; // prints losses, restarts game
    document.getElementById("guesses").innerText = guessesRemaining; // prints guesses left
    document.getElementById("ansWord").innerText = ansWordArr.join(""); // prints blanks and guesses 
    document.getElementById("wrongGuesses").innerText = wrongGuesses.join(""); // prints incorrect letters
    document.getElementById("guessedLetters").innerText = guessedLetters; // prints guessed letters
};

// check for winners 
function winner() {
    // add +1 to the player's score, given that there's no more "_" in ansWord.
    if (ansWordArr.toString() === guessedLetters.toString()) {
        wins++;
        alert("BOO-YAH!!!");
        isFinished = true;
    
        // if answer is correct, play gif of that show 
        if(ansWord === "Sister Sister") {
            document.getElementById("giphy-embed").src = "https://giphy.com/gifs/RxyLmP3eQyCvS/html5";
        }
        else if(ansWord === "Saved By the Bell") {
            document.getElementById("giphy-embed").src = "https://giphy.com/gifs/1HPzxMBCTvjMs/html5";
        }
        else if(ansWord === "Family Matters") {
            document.getElementById("giphy-embed").src = "https://giphy.com/gifs/3o85g8TYvayD4rhj9u/html5";
        }
        else if(ansWord === "All That") {
            document.getElementById("giphy-embed").src = "https://giphy.com/gifs/l4Ep1CAHPrPAEe1So/html5";
        }
        else if(ansWord === "Friends") {
            document.getElementById("giphy-embed").src = "https://giphy.com/gifs/C4msBrFb6szHG/html5";
        }
        else if(ansWord === "The Fresh Prince of Bel-Air") {
            document.getElementById("giphy-embed").src = "https://giphy.com/gifs/Mxygn6lbNmh20/html5";
        }
    };
};

// check for losers 
function loser() {
    // if numGuessesRemaining = 0, add +1 to losses
    if (guessCount === 0) {
        losses++;
        alert("As If!");
        isFinished = true;

        //play the loser gif
        document.getElementById("giphy-embed").src = "https://giphy.com/gifs/3og0IEeKFFlzaykixW/html5";
        document.getElementById("numLosses").style.color = "#FF0000";
    }
};

// key activity 
function checkGuess(letter) {

    // if a letter isn't in the guessedLetters arr, push the letter to the array
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);

        // if the letter isn't in the random word, numGuessesRemaining -1
        if (ansWord.indexOf(letter) === -1) {
            numGuessesRemaining--;

        // if numGuessesRemaining is < 3 or less, change color
            if (numGuessesRemaining <=3) {
                document.getElementById("numGuesses").style.color = "#FF0000";
            }
        } 
        // if letter is in word, replace "_" with the letter
        else { 
            for (var i = 0; i < ansWord.length; i++) {
                if (ansWord[i] === letter) {
                    ansWordArr[i] = letter;
                };
            };                
        };
    };
}; 

// other important functionality for keys
document.onkeyup = function(event) { // captures key clicks
    // Converts all key clicks to uppercase letters... because that's more FUN.
      var letterGuessed = String.fromCharCode(event.which).toUpperCase();

    // Runs the code to check for correctness.
      checkGuess(letter);

    // Runs the code after each round is done.
      updateScreen();
};