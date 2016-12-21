'use strict';

module.exports = class Margin {

    constructor(top = 0, right = 0, bottom = 0, left = 0) {
      if (
        typeof top    !== 'number'  || top < 0    ||
        typeof right  !== 'number'  || right < 0  ||
        typeof bottom !== 'number'  || bottom < 0 ||
        typeof left   !== 'number'  || left < 0
      ) {
        throw new RangeError('top, right, bottom and left must all be non-negative numbers.');
      }

      top = top || bottom || 0;
      bottom = bottom || top || 0;
      left = left || right || 0;
      right = right || left || 0;

      this.top = top;
      this.right = right;
      this.bottom = bottom;
      this.left = left;
    }
};
