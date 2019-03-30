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
var blanksLetters = []; // both blank and solved letters
var guessedLetters = []; // stores guessed letters
var wrongGuesses = []; // stores wrong guesses
var ansWordArr = [];
var ansWord = "";

// the token booleans
isFinished = true; 
letterInWord = true;

// start game 
function setup() {

    // start game
    maxGuesses = 10;

    // word is randomly chosen from the list
    ansWord = words[Math.floor(Math.random() * words.length)];

    // split word into individual letters
    ansWordArr = ansWord.split("");

    // count number of letters in word
    blanks = ansWordArr.length;

    // adds "_" to blanks ... here's my for loop
    for (var i = 0; i < blanks; i++) { 
        blanksLetters.push("_");
    }

    // resetting after rounds
    blanksLetters = [];
    gessesRemaining = maxGuesses; 
    guessedLetters = [];
    wrongGuesses = []; 

    // testing
    console.log(ansWord); // to print word in console 
    console.log(blanksLetters); // to print blanks in console

    // to warn the player of running out of guesses
    document.getElementById("numGuesses").style.color = "";

    //show the selected elements on the screen 
    updateScreen();

    // updating HTML 
    function updateScreen() {
        document.getElementById("wins").innerText = Wins; // prints wins, restarts game
        document.getElementById("losses").innerText = Losses; // prints losses, restarts game
        document.getElementById("guesses").innerText = guessesRemaining; // prints guesses left
        document.getElementById("ansWord").innerText = ansWordArr.join(""); // prints blanks and guesses 
        document.getElementById("wrongGuesses").innerText = wrongGuesses.join(""); // prints incorrect letters
        document.getElementById("guessedLetters").innerText = guessedLetters; // prints guessed letters
    };

    // display gifs of shows 
    document.getElementById("giphy-embed").src = "";
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

// key activity 
function checkGuess(letter) {
    
    // current state
    var letterInWord = false;
    
    // If letter is in the word
    if (letterInWord) {
        for (var i = 0; i < blanks; i++) {
            if (ansWord[i] === letter) {
                blanksLetters[i] = letter;
            }
        }
    }

    else {
        wrongGuesses.push(letter);
        maxGuesses--; 
    };
}; 

// check for losers 
function loser() {
    // if guessesRemaining = 0, add +1 to losses
    if (maxGuesses === 0) {
        losses++;
        alert("As If!");
        isFinished = true;

        //play the loser gif
        document.getElementById("giphy-embed").src = "https://giphy.com/gifs/3og0IEeKFFlzaykixW/html5";
        document.getElementById("losses").style.color = "#FF0000";
    }
};

// other important functionality for keys
document.onkeyup = function(event) { // captures key clicks
    // Converts all key clicks to uppercase letters... because that's more FUN.
    var guessedLetters = String.fromCharCode(event.which).toUpperCase();

    // Runs the code to check for correctness.
    checkGuess(letter);
};
