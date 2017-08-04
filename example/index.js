/*eslint no-console: 0 */
'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const Handlebars  = require('handlebars');

const { Box, Positioner, Margin } = require('../index');


// Example 1
const containerExample1 = new Box(500, 500, new Margin(100, 100), 20);
const elmExample1 = new Box(50, 50);
const positionerExample1 = new Positioner(containerExample1, elmExample1);

// Example 2
const containerExample2 = new Box(500, 500, new Margin(23, 23), 20);
const elmExample2 = new Box(53, 53);
const positionerExample2 = new Positioner(containerExample2, elmExample2);
positionerExample2.letMarginFillUnusedSpaceInContainer();

// Example 3
const containerExample3 = new Box(500, 500, new Margin(20, 20), 10);
const elmExample3 = new Box(50, 50);
const positionerExample3 = new Positioner(containerExample3, elmExample3);
positionerExample3.maxNumElements = 8;


// Example 4
const containerExample4 = new Box(500, 500, new Margin(20, 20), 10);
const elmExample4 = new Box(50, 50);
const positionerExample4 = new Positioner(containerExample4, elmExample4);
positionerExample4.maxNumColumns = 3;

// Example 5
const containerExample5 = new Box(500, 500, new Margin(20, 20), 10);
const elmExample5 = new Box(50, 50);
const positionerExample5 = new Positioner(containerExample5, elmExample5);
positionerExample5.maxNumRows = 4;

var app = express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: 'example/views/layouts/',
  handlebars: Handlebars,
  helpers: {
    generateBoxes: function(positioner) {
      const box = positioner.elementBox;
      const container = positioner.containerBox;
      const boxes = [];
      for (let position of positioner.positions()) {
        boxes.push(`<div class="box" style="width: ${box.width}px; height: ${box.height}px; top: ${position.y}px; left: ${position.x}px">${position.index}</div>`);
      }
      return new Handlebars.SafeString(`<div class="container" style="width: ${container.width}px; height: ${container.height}px">
        <div class="content" style="top: ${container.margin}px; bottom: ${container.margin}px; left: ${container.margin}px; right: ${container.margin}px;"></div>
        ${boxes.join('')}
      </div>`);
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', 'example/views/');


app.get('/', function (req, res) {
  res.render('home', {});
});

app.get('/example1', function (req, res) {
  res.render('example', {
    description: 'description',
    exampleIndex: 1,
    positioner: positionerExample1
  });
});

app.get('/example2', function (req, res) {
  res.render('example', {
    description: 'description',
    exampleIndex: 2,
    positioner: positionerExample2
  });
});

app.get('/example3', function (req, res) {
  res.render('example', {
    description: 'With maximal number of elements set to 8.',
    exampleIndex: 3,
    positioner: positionerExample3
  });
});

app.get('/example4', function (req, res) {
  res.render('example', {
    description: 'With maximal number of columns set to 3.',
    exampleIndex: 4,
    positioner: positionerExample4
  });
});

app.get('/example5', function (req, res) {
  res.render('example', {
    description: 'With maximal number of rows set to 4.',
    exampleIndex: 5,
    positioner: positionerExample5
  });
});
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
  console.log('Please visit http://localhost:' + app.get('port'));
});
