'use strict';

/**
 * A proof of concept script showing the bot logic
 * that guesses a valid random bulls and cows number
 *
 * The script is configured to use only 4 digit numbers,
 * from 1023 to 9876
 */

const GameEngine = require('./index');

// Random number to be guessed
const secret = GameEngine.pickRandom();

// A set of possible numbers containing the secret number
let set = GameEngine.getDefaultSet();

// Number of attempts at guessing the corrent number
let attempt = 0;
let guess, bulls, cows, score;

console.log('-------------------------------------------------');
console.log(`Secret number to guess: ${secret}`);
console.log('-------------------------------------------------');

while (true) {
  // get next guess from set of possiblities
  guess = GameEngine.pickRandom(set);
  attempt++;

  console.log(`Attempt ${attempt}: ${guess} remaining possibilities: ${set.length}`);

  // get the bulls & cows score of the guess versus the secret
  score = GameEngine.compareNumbers(guess, secret);

  // 4 bulls === win
  if (score.bulls === 4) {
    console.log('-------------------------------------------------');
    console.log(`Number found in ${attempt} attempts!\n`);
    break;
  }

  // based on the score, filter the possibilities set
  set = GameEngine.filterSet(set, guess, score);

  bulls = score.bulls !== 1 ? score.bulls + ' bulls' : 'a bull';
  cows = score.cows !== 1 ? score.cows + ' cows' : 'a cow';

  console.log(`Found: ${bulls} and ${cows}\n`);
}
