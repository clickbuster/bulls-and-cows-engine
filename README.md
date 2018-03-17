# Bulls and Cows game engine
**Bulls and Cows** is a popular number guessing game for kids. Rules are pretty simple:

* Each plyaer thinks of a random 4 digit number, not starting with a 0 (e.g. 0123 is not a valid number)
* All digits in the number should be unique - 1234 is OK, 1233 is not
* One player starts first and tries to guess the other player's number
* If the player guessed any of the other player's digits, the other player is required to say how did they match
* If a digit is at the same position, it's called a bull, if it's at a different position, it's called a cow

### Example scenario

* Secret number: 4512
* Guess: 4682 - 2 bulls
* Guess: 4203 - 1 bull and 1 cow
* Guess: 4125 - 1 bull and 3 cows

# Usage
Just include in your npm package by installing from this repo:

```sh
npm install https://github.com/clickbuster/bulls-and-cows-engine.git
```

# API
How to use the `GameEngine` object

### `GameEngine.isValidNumber(num: string|integer): boolean`
Returns `true` if the provided number is a valid guess (e.g. 4 digits, non-repeated).

### `GameEngine.pickRandom(set?: []): number`
Returns a random number from a set of available numbers, if no set is provided, a number from the default set of all possible answers is selected.

### `GameEngine.getDefaultSet(): array`
Returns a copy of the default set, containing all possible game answers, generated at runtime, containing all 4536 possibilities

### `GameEngine.compareNumbers(a: number, b:number): Score`
Returns a scopre from comparing two numbers, example:

```javascript
const score = GameEngine.compareNumbers(1234, 4230);
score.bulls === 2;
score.cows === 1;
```

### `GameEngine.filterSet(set: array = [], guess: number, score: Score): PossibilitySet`
Get all possibilites from a set, which have the same amount of bulls and cows as the guess provided

### `GameEngine.filterTurns(set: array, turns: array): PossibilitySet`
Applies previously played turns to get the current state of the game state (used when resuming games)

# Proof of concept
A script which plays a solo guessing game, proving the effectiveness of the guessing algorithm, which should guess in under 10 attempts. To run it:

```sh
npm start
```