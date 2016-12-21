'use strict';

const Margin = require('./margin.js');

module.exports = class Box {

    constructor(width, height, margin = new Margin(), spacing = 0) {
      if (
        typeof width        !== 'number'  || width < 0   ||
        typeof height       !== 'number'  || height < 0  ||
        margin.constructor  !== Margin    ||
        typeof spacing      !== 'number'  || spacing < 0
      ) {
        throw new RangeError('width, height and spacing must all be non-negative numbers and margin an Margin.');
      }
      
      this.width = width;
      this.height = height;
      this.margin = margin;
      this.spacing = spacing;
    }
};
