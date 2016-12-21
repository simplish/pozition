'use strict';

const should = require('chai').should();
const { Box, Margin } = require('../index');

describe('a Box instance', function() {
  const width = 1;
  const height = 1;
  const margin = new Margin(1, 1, 1, 1);
  const spacing = 1;

  it('should have defaults.', () => {
    const box = new Box(width, height);

    box.margin.top.should.equal(0);
    box.margin.right.should.equal(0);
    box.margin.bottom.should.equal(0);
    box.margin.left.should.equal(0);

    box.spacing.should.equal(0);
  });

  it('should require width', () => {
    (
      () => new Box(undefined, height)
    ).should.throw(RangeError);
  });

  it('should require height', () => {
    (
      () => new Box(width, undefined)
    ).should.throw(RangeError);
  });

  it('should validate negative height', () => {
    (
      () => new Box(width, -1)
    ).should.throw(RangeError);
  });

  it('should validate height type', () => {
    (
      () => new Box(width, "1")
    ).should.throw(RangeError);
  });

  it('should validate negative width', () => {
    (
      () => new Box(-1, height)
    ).should.throw(RangeError);
  });

  it('should validate width type', () => {
    (
      () => new Box("1", height)
    ).should.throw(RangeError);
  });

  it('should validate negative spacing', () => {
    (
      () => new Box(width, height, margin, -1)
    ).should.throw(RangeError);
  });

  it('should validate spacing type', () => {
    (
      () => new Box(width, height, margin, "1")
    ).should.throw(RangeError);
  });

  it('should validate margin type', () => {
    (
      () => new Box(width, height, { top: 1, right: 1})
    ).should.throw(RangeError);
  });
});
