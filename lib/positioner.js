'use strict';

const Position = require('./position.js');
const util = require('./util.js');

module.exports = class Positioner {
  constructor(containerBox, elementBox) {
    this.containerBox = containerBox;
    this.elementBox = elementBox;
  }

  *positions() {
    let index = 0;
    let x = this.resetX();
    let y = this.resetY();
    let col = 1;
    let row = 1;

    let thereIsSpaceLeftX = this.isThereSpaceLeftX(x, this.elementBox, this.containerBox);
    let thereIsSpaceLeftY = this.isThereSpaceLeftY(y, this.elementBox, this.containerBox);

    while (thereIsSpaceLeftY) {
      if (thereIsSpaceLeftX) {
        yield new Position(x, y, index, col, row);
        col++;
        index++;

        x += (this.elementBox.width + this.containerBox.spacing);
      } else {
        x = this.resetX();
        row++;
        col = 1;
        y += (this.elementBox.height + this.containerBox.spacing);
      }

      thereIsSpaceLeftX = this.isThereSpaceLeftX(x, this.elementBox, this.containerBox);
      thereIsSpaceLeftY = this.isThereSpaceLeftY(y, this.elementBox, this.containerBox);
    }
  }

  resetX() {
    return this.containerBox.margin.left;
  }

  resetY() {
    return this.containerBox.margin.top;
  }

  isThereSpaceLeftX(x, elementBox, containerBox) {
    let xSpaceLeft = containerBox.width - containerBox.margin.right - x;
    return xSpaceLeft >= elementBox.width;
  }

  isThereSpaceLeftY(y, elementBox, containerBox) {
    let ySpaceLeft = containerBox.height - containerBox.margin.bottom - y;
    return ySpaceLeft >= elementBox.height;
  }

  letMarginFillUnusedSpaceInContainer() {
    const horizontalUnusedSpaceForColumns = [];
    const verticalUnusedSpaceForRows = [];
    let numberOfColumns = 0;
    let numberOfRows = 0;

    const unusedSpace = function(containerWidth, firstMargin, secondMargin, elmWidth, spacing, n) {
      return containerWidth - firstMargin - secondMargin - (n * elmWidth) - ((n - 1) * spacing);
    };

    for (let col of util.positiveNumbers()) {
      let us = unusedSpace(this.containerBox.width,
        this.containerBox.margin.left,
        this.containerBox.margin.right,
        this.elementBox.width,
        this.containerBox.spacing,
        col
      );
      if (us >= 0) {
        horizontalUnusedSpaceForColumns[col - 1] = us;
        numberOfColumns = col;
      } else {
        break;
      }
    }

    const horizontalUnusedSpace = horizontalUnusedSpaceForColumns[numberOfColumns - 1];

    this.containerBox.margin.left += horizontalUnusedSpace / 2;
    this.containerBox.margin.right += horizontalUnusedSpace / 2;

    for (let row of util.positiveNumbers()) {
      let us = unusedSpace(this.containerBox.height,
        this.containerBox.margin.top,
        this.containerBox.margin.bottom,
        this.elementBox.height,
        this.containerBox.spacing,
        row
      );
      if (us >= 0) {
        verticalUnusedSpaceForRows[row - 1] = us;
        numberOfRows = row;
      } else {
        break;
      }
    }

    const verticalUnusedSpace = verticalUnusedSpaceForRows[numberOfRows - 1];

    this.containerBox.margin.top += verticalUnusedSpace / 2;
    this.containerBox.margin.bottom += verticalUnusedSpace / 2;
  }
};
