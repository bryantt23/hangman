class Hangman {
  DICTIONARY = ['cat', 'dog', 'bootcamp', 'pizza'];

  constructor() {
    this.secretWord = this.randomWord();
    this.attemptedChars = new Set();
    this.remainingIncorrectGuesses = 5;
    this.guessWord = this.secretWord.split('').map(() => '_');
  }

  randomWord = () => {
    return DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
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
    guessWord = guessWord.split('').map((c, i) => {
      if (replacementIndices.includes(i)) {
        return replacementChar;
      } else {
        return c;
      }
    });
  }
}
