class Hangman {
  DICTIONARY = ['cat', 'dog', 'bootcamp', 'pizza'];

  constructor() {
    this.secretWord = this.randomWord();
    this.attemptedChars = new Set();
    this.remainingIncorrectGuesses = 5;
    this.guessWord = this.secretWord.split('').map(() => '_');
  }

  randomWord = () => {
    return this.DICTIONARY[Math.floor(Math.random() * this.DICTIONARY.length)];
  };

  alreadyAttemptedChar(c) {
    return this.attemptedChars.has(c);
  }

  // https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array
  getMatchingIndices(targetChar) {
    return this.secretWord
      .split('')
      .map((c, i) => {
        return c === targetChar ? i : -1;
      })
      .filter(i => {
        return i != -1;
      });
  }

  fillIndices(replacementChar, replacementIndices) {
    this.guessWord = this.guessWord.map((c, i) => {
      if (replacementIndices.includes(i)) {
        return replacementChar;
      } else {
        return c;
      }
    });
  }

  tryGuess(c) {
    if (this.alreadyAttemptedChar(c)) {
      console.log('that has already been attempted');
      return false;
    }

    this.attemptedChars.add(c);
    let indices = this.getMatchingIndices(c);
    if (indices.length === 0) {
      this.remainingIncorrectGuesses--;
    } else {
      this.fillIndices(c, indices);
    }

    return true;
  }

  askUserForGuess() {
    console.log(
      `Incorrect Guesses Remaining: ${this.remainingIncorrectGuesses}`
    );
    console.log(`Attempted Chars: ${Array.from(this.attemptedChars)}`);
    console.log(`Word: ${this.guessWord}`);
    let c = prompt('Enter a char:');
    console.log(c);
    this.tryGuess(c);
  }

  isWin() {
    if (this.secretWord === this.guessWord.join('')) {
      console.log('YOU WIN');
      return true;
    }
    return false;
  }

  isLoss() {
    if (this.remainingIncorrectGuesses === 0) {
      console.log('YOU LOSE');
      return true;
    }
    return false;
  }

  isGameOver() {
    if (this.isWin() || this.isLoss()) {
      console.log(`The word was ${this.secretWord}`);
      return true;
    }
    return false;
  }

  start() {
    console.log(JSON.stringify(this));
    while (!this.isGameOver()) {
      this.askUserForGuess();
    }
  }
}

const game = new Hangman();
game.start();
