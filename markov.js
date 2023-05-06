/** Textual markov chain generator */


module.exports = class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeChains() {
    this.chains = {};
    const wordSet = new Set(Object.values(this.words));
    for (const word of wordSet) {
      this.chains[`${word}`] = [];
    }
    for (const [k, word] of Object.entries(this.words)) {
      if (this.words[(parseInt(k)+1)] && !this.chains[word].includes(this.words[(parseInt(k)+1)])) {
        this.chains[word].push(this.words[(parseInt(k)+1)]);
      }
    }
  }

  // Get a random value from an array.
  randomValue(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
  }

  // Get a random property from an object.
  randomProperty(obj) {
    const keys = Object.keys(obj);
    return this.randomValue(keys);
  };

  /** return random text from chains */
  makeText(numWords = 100) {
    // Initiate word array with a random word from chains.
    let markovText = [this.randomProperty(this.chains)];
    // Add words from chains until specified number of words has been reached.
    while (markovText.length < numWords) {
      // Get the last word in the array.
      const currentWord = markovText[(markovText.length - 1)];
      // The next word is taken from the last word's chain,
      let nextWord;
      if (this.chains[`${currentWord}`].length > 0) {
        nextWord = this.randomValue(this.chains[`${currentWord}`]);
      } 
      // Or if the last word has an empty chain, 
      // a new random word is added from the chains.
      else {
        nextWord = this.randomProperty(this.chains);
      }
      // Add the next word to the array.
      markovText.push(nextWord);
    }
    // Return a string of the array, with words separated by a space.
    return markovText.join(' ')
  }
}

// const mm = new MarkovMachine('the cat in the hat');
// console.log(mm.makeText(10));
