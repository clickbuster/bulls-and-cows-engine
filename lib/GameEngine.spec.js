const GameEngine = require('./GameEngine');
const assert = require('assert');

const TOTAL_POSSIBILITIES = GameEngine.getDefaultSet().length;
const INVALID_NUMBERS = [null, undefined, [], 1, -1, false, true, {}, Infinity, [1234],
  'TEST', '123k', -1234,
  '0123', '2212', '2213', 2214, '04023'];

describe('GameEngine tests', () => {
  let defaultSet;
  beforeEach(() => {
    defaultSet = GameEngine.getDefaultSet();
  });

  describe('GameEngine.isValidNumber(num)', () => {
    it('should return true for valid values', () => {
      assert.strictEqual(true, GameEngine.isValidNumber(1234));
      assert.strictEqual(true, GameEngine.isValidNumber(2143));
      assert.strictEqual(true, GameEngine.isValidNumber('5678'));
      assert.strictEqual(true, GameEngine.isValidNumber('9084'));
    });

    it('should return false for invalid values', () => {
      INVALID_NUMBERS.forEach(num =>
        assert.strictEqual(false, GameEngine.isValidNumber(num), `Invalidating for: ${JSON.stringify(num)}`)
      );
    });
  });

  describe('GameEngine.getDefaultSet()', () => {
    it('should return a copy of the default set', () => {
      const setCopy = GameEngine.getDefaultSet();

      assert.notStrictEqual(setCopy, defaultSet);
      assert.deepStrictEqual(setCopy, defaultSet);
    });

    it('should provide a set with all valid numbers', () => {
      for(let i = 1023; i < 9877; i++) {
        if(GameEngine.isValidNumber(i)) {
          assert.notStrictEqual(defaultSet.indexOf(i), -1);
        } else {
          assert.strictEqual(defaultSet.indexOf(i), -1);
        }
      }
    });
  });

  describe('GameEngine.pickRandom(set)', () => {
    it('should pick a random member from a set of items', () => {
      const testSet = [123, 321, 567];
      const random = GameEngine.pickRandom(testSet);

      assert.notStrictEqual(testSet.indexOf(random), -1);
      assert.strictEqual(defaultSet.indexOf(random), -1);
    });

    it('should pick a random number from the default set, if no set is provided', () => {
      const random = GameEngine.pickRandom();
      assert.notStrictEqual(defaultSet.indexOf(random), -1);
    });
  });

  describe('GameEngine.compareNumbers(a, b)', () => {
    const testValid = [
      '1234,1205,2,0',
      '1234,1243,2,2',
      '1234,5678,0,0',
      '1234,5672,0,1',
      '1234,5621,0,2'
    ];

    const testInvalid = [
      undefined, null, [], -123, '0123', '41231', '01234', 01234, Infinity, {}, false, true
    ];

    it('should provide valid score for valid values', () => {
      testValid.forEach(test => {
        const [a, b, bulls, cows] = test.split(',');
        assert.deepEqual(GameEngine.compareNumbers(a, b), { bulls, cows });
      });
    });

    it('should provide 0 hit score for invalid values', () => {
      testInvalid.forEach(test => {
        assert.deepStrictEqual(GameEngine.compareNumbers(test, test), { bulls: 0, cows: 0 });
      });
    });
  });

  describe('GameEngine.filterSet(set, guess, score)', () => {
    const testGuess = [1234, 5678, 1467, 7162, 9172, 4712];
    const baseGuess = 6713;

    it('should provide a new set and not affect the old one', () => {
      const set = GameEngine.filterSet(defaultSet, 1234, { bulls: 4, cows: 0 });
      assert.deepStrictEqual(set, [1234]);
      assert.strictEqual(defaultSet.length, TOTAL_POSSIBILITIES);
    });

    it('should trims the set to values to values that have only the provided score, versus the guess', () => {
      let maxCows, cows;
      const testScores = [];

      for(let bulls = 0; bulls < 5; bulls++) {
        for(i = 0; i < 5; i++) {
          maxCows = bulls > 0 ? 4 - bulls : 4;
          cows = i > maxCows ? maxCows : i;

          testScores.push({ bulls, cows });
        }
      }

      testScores.forEach(score => {
        const setBase = GameEngine.filterSet(defaultSet, baseGuess, score);
        testGuess.forEach(guess => {
          const setTest = GameEngine.filterSet(defaultSet, guess, score);

          assert.strictEqual(setBase.length, setTest.length,
              'when filtering from the default set, guesses with same score, ' +
              'should produce a filtered set with the same length');
        });
      });
    });
  });
});