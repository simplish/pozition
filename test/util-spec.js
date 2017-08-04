'use strict';

require('chai').should();
const util = require('../lib/util');

describe('Utils positive numbers', () => {
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

describe('Utils assert number', () => {
  it('should not throw error for a number', () => {
    util.assertNum(1).should.be.true;
    util.assertNum(-5).should.be.true;
  });

  it('should throw error if input is a string', () => {
    (
      () => util.assertNum('a')
    ).should.throw(TypeError);
  });

  it('should throw error if input is a too small number', () => {
    (
      () => util.assertNum(1, 2)
    ).should.throw(TypeError);
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
