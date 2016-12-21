'use strict';

module.exports = class Util {
  static *positiveNumbers(max) {
    let i = 1;

    while (!max || i <= max) {
      yield i;
      i++;
    }
  }
};
