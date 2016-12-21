'use strict';

module.exports = class Position {

  constructor(x, y, index, col, row) {
    if (
          typeof x      !== 'number' || x < 0     ||
          typeof y      !== 'number' || y < 0     ||
          typeof index  !== 'number' || index < 0 ||
          typeof col    !== 'number' || col < 0   ||
          typeof row    !== 'number' || row < 0
        ) {
      throw new RangeError('x, y, index, col and row must all be non-negative numbers.');
    }

    this.x = x;
    this.y = y;
    this.index = index;
    this.col = col;
    this.row = row;
  }

  equals(position) {
    return  this.x === position.x &&
              this.y === position.y;
  }

  name() {
    return 'X: ${this.x}, Y: ${this.y}';
  }
};
