'use strict';

const should = require('chai').should();
const { Margin } = require('../index');

describe('a Margin instance', function() {
  const top = 1;
  const right = 1;
  const bottom = 1;
  const left = 1;

  it('should have defaults.', () => {
    const margin = new Margin();

    margin.top.should.equal(0);
    margin.right.should.equal(0);
    margin.bottom.should.equal(0);
    margin.left.should.equal(0);
  });

  it('should validate negative top', () => {
    (
      () => new Margin(-1, right, bottom, left)
    ).should.throw(RangeError);
  });

  it('should validate top type', () => {
    (
      () => new Margin("1", right, bottom, left)
    ).should.throw(RangeError);
  });

  it('should validate negative right', () => {
    (
      () => new Margin(top, -1, bottom, left)
    ).should.throw(RangeError);
  });

  it('should validate right type', () => {
    (
      () => new Margin(top, "1", bottom, left)
    ).should.throw(RangeError);
  });

  it('should validate negative bottom', () => {
    (
      () => new Margin(top, right, -1, left)
    ).should.throw(RangeError);
  });

  it('should validate bottom type', () => {
    (
      () => new Margin(top, right, "1", left)
    ).should.throw(RangeError);
  });

  it('should validate negative left', () => {
    (
      () => new Margin(top, right, bottom, -1)
    ).should.throw(RangeError);
  });

  it('should validate left type', () => {
    (
      () => new Margin(top, right, bottom, "1")
    ).should.throw(RangeError);
  });

  it('should set top to bottom if top is missing', () => {
    const margin = new Margin(undefined, right, bottom, left)
    margin.top.should.equal(bottom);
    margin.bottom.should.equal(bottom);
  });

  it('should set bottom to top if bottom is missing', () => {
    const margin = new Margin(top, right, undefined, left)
    margin.top.should.equal(top);
    margin.bottom.should.equal(top);
  });

  it('should set left to right if left is missing', () => {
    const margin = new Margin(top, right, bottom, undefined)
    margin.right.should.equal(right);
    margin.left.should.equal(right);
  });

  it('should set right to left if right is missing', () => {
    const margin = new Margin(top, undefined, bottom, left)
    margin.right.should.equal(left);
    margin.left.should.equal(left);
  });
});
