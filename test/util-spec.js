'use strict';

require('chai').should();
const util = require('../lib/util');

describe('Utils positive numbers', function() {
  it('should generate finite set.', () => {
    const numbers = util.positiveNumbers(5);
    numbers.next().value.should.equal(1);
    numbers.next().value.should.equal(2);
    numbers.next().value.should.equal(3);
    numbers.next().value.should.equal(4);
    numbers.next().value.should.equal(5);

    numbers.next().done.should.be.true;
  });

  it('should generate "infinite" set.', () => {
    const numbers = util.positiveNumbers();
    const testNum = getRandomInt(1, 10000);

    while (numbers.next().value < testNum) { /* empty */ }

    numbers.next().value.should.equal(testNum + 1);
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
