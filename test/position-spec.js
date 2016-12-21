'use strict';

const should = require('chai').should();
const { Position } = require('../index');

describe('a Position instance', function() {
  const index1 = 1;
  const index2 = 2;
  const col1 = 1;
  const col2 = 2;
  const row1 = 1;
  const row2 = 2;

  const x1 = 1;
  const y1 = 1;
  const x2 = 2;
  const y2 = 2;

  it('should be equal to self.', () => {
    const position = new Position(x1, y1, index1, col1, row1);

    position.equals(position).should.be.true;
  });

  it('should be equal only if coordinates are identical.', () => {
    const position1 = new Position(x1, y1, index1, col1, row1);
    const position2 = new Position(x1, y1, index1, col1, row1);
    const position3 = new Position(x1, y2, index1, col1, row1);
    const position4 = new Position(x2, y1, index1, col1, row1);
    const position5 = new Position(x2, y2, index1, col1, row1);

    position1.equals(position2).should.be.true;
    position2.equals(position1).should.be.true;
    position1.equals(position3).should.be.false;
    position3.equals(position1).should.be.false;
    position1.equals(position4).should.be.false;
    position4.equals(position1).should.be.false;
    position1.equals(position5).should.be.false;
    position5.equals(position1).should.be.false;
  });

  it('should be equal even when index, column and row is not identical.', () => {
    const position1 = new Position(x1, y1, index1, col1, row1);
    const position2 = new Position(x1, y1, index2, col2, row2);

    position1.equals(position2).should.be.true;
    position2.equals(position1).should.be.true;
  });

  it('should throw range error when x is negative.', () => {
    (
      () => new Position(-1, y1, index1, col1, row1)
    ).should.throw(RangeError);
  });

  it('should throw range error when y is negative.', () => {
    (
      () => new Position(x1, -1, index1, col1, row1)
    ).should.throw(RangeError);
  });

  it('should throw range error when index is negative.', () => {
    (
      () => new Position(x1, y1, -1, col1, row1)
    ).should.throw(RangeError);
  });

  it('should throw range error when col is negative.', () => {
    (
      () => new Position(x1, y1, index1, -1, row1)
    ).should.throw(RangeError);
  });

  it('should throw range error when row is negative.', () => {
    (
      () => new Position(x1, y1, index1, col1, -1)
    ).should.throw(RangeError);
  });
});
