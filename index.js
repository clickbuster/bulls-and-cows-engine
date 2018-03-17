const VALID_NUMBER_REGEX = /^(?!0)(?!.*(.).*\1)[\d]{4}$/;
const DEFAULT_SET = [];

class GameEngine {
  constructor() {
    for(let i = 1023; i < 9877; i++) {
      if(this.isValidNumber(i)) {
        DEFAULT_SET.push(i);
      }
    }
  }

  isValidNumber(num) {
    return VALID_NUMBER_REGEX.test(num);
  }

  pickRandom(set) {
    set = set || DEFAULT_SET;

    const random = Math.floor(Math.random() * set.length);
    return set[random];
  }

  getDefaultSet() {
    return DEFAULT_SET.slice(0);
  }

  compareNumbers(a, b) {
    let bulls = 0;
    let cows = 0;

    a = String(a);
    b = String(b);

    for(let i = 0; i < a.length; i++) {
      if(a[i] === b[i]) {
        bulls++;
      } else if (b.indexOf(a[i]) !== -1) {
        cows++;
      }
    }

    return { bulls, cows };
  }

  filterSet(set = [], guess, score) {
    return set.filter(num => {
      const testScore = this.compareNumbers(num, guess);
      return score.bulls === testScore.bulls && score.cows === testScore.cows;
    });
  }

  filterTurns(set, turns) {
    turns.forEach(turn => set = this.filterSet(set, turn.guess, turn.score));
    return set;
  }
}

module.exports = new GameEngine();