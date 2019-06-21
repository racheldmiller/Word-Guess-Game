// ------------------------------------ GLOBAL VARIABLES ---------------------------------------

// Some of my favorite 90s shows! To make it easier, they're listed without spaces in-between.
var words = [
  "sistersister",
  "savedbythebell",
  "familymatters",
  "allthat",
  "friends",
  "thefreshprinceofbelair"
];

// Game counters
var blanks = 0; // blanks
var wins = 0; // number of wins
var losses = 0; // number of losess
var maxGuesses = 10; // how many guesses the player has initially
var guessesRemaining = 0; // how many guesses are left

// Players guesses
var blanksLetters = []; // both blank and solved letters
var guessedLetters = []; // stores guessed letters
var wrongGuesses = []; // stores wrong guesses
var ansWordArr = [];
var ansWord = ""; // the chosen word

// Booleans
isFinished = true;
letterInWord = true;

// ------------------------------------ HELPER FUNCTIONS ----------------------------------------

// Start game
function setup() {
  // start game w/ 10 attempts remaining
  maxGuesses = 10;

  // after each round, wrong guesses, guessed letters, and blanks should be empty
  blanksLetters = [];
  guessedLetters = [];
  wrongGuesses = [];

  // document.getElementById("ss").style.visibility = "hidden";
  // document.getElementById("at").style.visibility = "hidden";
  // document.getElementById("fm").style.visibility = "hidden";
  // document.getElementById("f").style.visibility = "hidden";
  // document.getElementById("tfpob").style.visibility = "hidden";
  // document.getElementById("sbtb").style.visibility = "hidden";

  // word is randomly chosen from the list
  ansWord = words[Math.floor(Math.random() * words.length)];

  // split word into individual letters
  ansWordArr = ansWord.split("");

  // count number of letters in word
  // by setting ansWordArr.length to var blanks, it'll make it easier to reference in my for loop
  blanks = ansWordArr.length;

  // adds "_" to blanks
  // this is my for loop
  for (var i = 0; i < blanks; i++) {
    blanksLetters.push("_");
  }

  console.log(ansWord); // check to see if word prints
  console.log(blanksLetters); // check to see if the blanks print

  // Update the HTML
  document.getElementById("wins").innerHTML = wins; // prints wins, restarts game
  document.getElementById("losses").innerHTML = losses; // prints losses, restarts game
  // document.getElementById("guesses").innerHTML = guessesRemaining; // prints guesses left
  document.getElementById("ansWord").innerHTML = blanksLetters.join(" "); // prints blanks and guesses
  document.getElementById("wrongGuesses").innerHTML = maxGuesses; // prints incorrect letters
  document.getElementById("guessedLetters").innerHTML = guessedLetters; // prints guessed letters
}

// Create a function to evaluate the letters a user guesses
function checkGuess(letter) {
  // current state
  var letterInWord = false;

  // If letter is in the word...
  for (var i = 0; i < blanks; i++) {
    console.log(ansWord);
    if (ansWord[i] === letter) {
      letterInWord = true;
      blanksLetters[i] = letter;
    }
  }

  // If letter isn't in the word, decrease the amount of guesses left by 1
  // Push wrong letters into guessed letters
  if (!letterInWord) {
    wrongGuesses.push(letter);
    maxGuesses--;
  }

  // Update the HTML
  document.getElementById("ansWord").innerHTML = blanksLetters.join(" "); // prints blanks and guesses
  document.getElementById("guessedLetters").innerHTML = wrongGuesses; // prints incorrect letters
  document.getElementById("wrongGuesses").innerHTML = maxGuesses; // prints guessed letters

  // Depending on how the game goes, the winner or loser function will run
  winner();
  loser();
}

// Create a function to check for winning
function winner() {
  // add +1 to the player's score, given that there's no more "_" in ansWord.
  //   console.log(ansWord);
  console.log(blanksLetters.toString());
  console.log(ansWordArr.toString());
  if (ansWordArr.toString() === blanksLetters.toString()) {
    wins++;
    // alert("BOO-YAH!!!");
    isFinished = true;

    // If answer is correct, play gif of that show
    // ** still need to figure this out **

    // switch (ansWord) {
    //   case "sistersister":
    //     document.getElementById("ss").style.visibility = "visible";
    //     break;
    //   case "savedbythebell":
    //     document.getElementById("sbtb").style.visibility = "visible";
    //     break;
    //   case "familymatters":
    //     document.getElementById("fm").style.visibility = "visible";
    //     break;
    //   case "allthat":
    //     document.getElementById("at").style.visibility = "visible";
    //     break;
    //   case "friends":
    //     document.getElementById("f").style.visibility = "visible";
    //     break;
    //   case "thefreshprinceofbelair":
    //     document.getElementById("tfpob").style.visibility = "visible";
    //     break;
    // }

    // Reset the game
    setup();
  }
}

// Conversely, create a function to check for losing
function loser() {
  // if guessesRemaining = 0, add +1 to losses
  if (maxGuesses === 0) {
    losses++;
    // alert("As If!");
    isFinished = true;

    // Reset the game
    setup();
  }
}

// ------------------------------------ Main Process -----------------------------------------

// Start/reset the game
setup();

// Capture key clicks
document.onkeyup = function(event) {
  // check to make sure that the key pressed was a letter
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters
    var letter = String.fromCharCode(event.which).toLowerCase();
    // Run the code to check for correctness.
    checkGuess(letter);
  }
};
