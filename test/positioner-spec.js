'use strict';

const should = require('chai').should();
const { Box, Positioner, Margin } = require('../index');

function testPosition(position, x, y, index, col, row) {
  position.x.should.equal(x);
  position.y.should.equal(y);
  position.index.should.equal(index);
  position.col.should.equal(col);
  position.row.should.equal(row);
}

describe('Positioner', function() {
  beforeEach(function() {
  });

  it('should generate correct positions for container without margin and spacing.', () => {
    const container = new Box(100, 40);
    const elm = new Box(20, 20);
    const positioner = new Positioner(container, elm);
    const positions = positioner.positions();

    testPosition(positions.next().value, 0, 0, 0, 1, 1);
    testPosition(positions.next().value, 20, 0, 1, 2, 1);
    testPosition(positions.next().value, 40, 0, 2, 3, 1);
    testPosition(positions.next().value, 60, 0, 3, 4, 1);
    testPosition(positions.next().value, 80, 0, 4, 5, 1);

    testPosition(positions.next().value, 0, 20, 5, 1, 2);
    testPosition(positions.next().value, 20, 20, 6, 2, 2);
    testPosition(positions.next().value, 40, 20, 7, 3, 2);
    testPosition(positions.next().value, 60, 20, 8, 4, 2);
    testPosition(positions.next().value, 80, 20, 9, 5, 2);

    const lastPosition = positions.next();
    lastPosition.done.should.be.true;
    should.not.exist(lastPosition.value);
  });

  it('should generate correct positions for container with margin but without spacing.', () => {
    const container = new Box(100, 60, new Margin(10, 10));
    const elm = new Box(20, 20);

    const positioner = new Positioner(container, elm);
    const positions = positioner.positions();

    testPosition(positions.next().value, 10, 10, 0, 1, 1);
    testPosition(positions.next().value, 30, 10, 1, 2, 1);
    testPosition(positions.next().value, 50, 10, 2, 3, 1);
    testPosition(positions.next().value, 70, 10, 3, 4, 1);

    testPosition(positions.next().value, 10, 30, 4, 1, 2);
    testPosition(positions.next().value, 30, 30, 5, 2, 2);
    testPosition(positions.next().value, 50, 30, 6, 3, 2);
    testPosition(positions.next().value, 70, 30, 7, 4, 2);

    const lastPosition = positions.next();
    lastPosition.done.should.be.true;
    should.not.exist(lastPosition.value);
  });

  it('should generate correct positions for container with margin and spacing.', () => {
    const container = new Box(115, 65, new Margin(10, 10), 5);
    const elm = new Box(20, 20);

    const positioner = new Positioner(container, elm);
    const positions = positioner.positions();

    testPosition(positions.next().value, 10, 10, 0, 1, 1);
    testPosition(positions.next().value, 35, 10, 1, 2, 1);
    testPosition(positions.next().value, 60, 10, 2, 3, 1);
    testPosition(positions.next().value, 85, 10, 3, 4, 1);

    testPosition(positions.next().value, 10, 35, 4, 1, 2);
    testPosition(positions.next().value, 35, 35, 5, 2, 2);
    testPosition(positions.next().value, 60, 35, 6, 3, 2);
    testPosition(positions.next().value, 85, 35, 7, 4, 2);

    const lastPosition = positions.next();
    lastPosition.done.should.be.true;
    should.not.exist(lastPosition.value);
  });

  it('should not generate positions when there is not enought horizontal space for container without margin and spacing.', () => {
    const container = new Box(19, 20);
    const elm = new Box(20, 20);

    const positioner = new Positioner(container, elm);
    const positions = positioner.positions();

    const lastPosition = positions.next();
    lastPosition.done.should.be.true;
    should.not.exist(lastPosition.value);
  });

  it('should not generate positions when there is not enought vertical space for container without margin and spacing.', () => {
    const container = new Box(20, 19);
    const elm = new Box(20, 20);

    const positioner = new Positioner(container, elm);
    const positions = positioner.positions();

    const lastPosition = positions.next();
    lastPosition.done.should.be.true;
    should.not.exist(lastPosition.value);
  });

  it('should not generate positions when there is not enought space for container with margin but without spacing.', () => {
    const container = new Box(20, 20, new Margin(1, 1));
    const elm = new Box(19, 19);

    const positioner = new Positioner(container, elm);
    const positions = positioner.positions();

    const lastPosition = positions.next();
    lastPosition.done.should.be.true;
    should.not.exist(lastPosition.value);
  });

  it('should be able to fill out margins when 1 element', () => {
    const container = new Box(20, 20, new Margin(2, 2));
    const elm = new Box(10, 10);

    const positioner = new Positioner(container, elm);
    positioner.letMarginFillUnusedSpaceInContainer();
    positioner.containerBox.margin.left.should.equal(5);
    positioner.containerBox.margin.right.should.equal(5);
    positioner.containerBox.margin.top.should.equal(5);
    positioner.containerBox.margin.bottom.should.equal(5);

  });

  it('should be able to fill out margins when more than 1 element and with spacing', () => {
    const container = new Box(105, 105, new Margin(2, 2), 4);
    const elm = new Box(10, 15);

    const positioner = new Positioner(container, elm);
    positioner.letMarginFillUnusedSpaceInContainer();
    positioner.containerBox.margin.left.should.equal(5.5);
    positioner.containerBox.margin.right.should.equal(5.5);
    positioner.containerBox.margin.top.should.equal(7);
    positioner.containerBox.margin.bottom.should.equal(7);

  });
});
