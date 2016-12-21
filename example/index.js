/*eslint no-console: 0 */
'use strict';

const express = require('express');
const exphbs  = require('express-handlebars');
const Handlebars  = require('handlebars');

const { Box, Positioner, Margin } = require('../index');

const container = new Box(500, 500, new Margin(100, 100), 20);
const elm = new Box(50, 50);
const positioner = new Positioner(container, elm);

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
  res.render('home', {
    description: 'description',
    exampleIndex: 1,
    positioner: positioner
  });
});

app.listen(app.get('port') || 3000, function () {
  console.log('Please visit http://localhost:' + (app.get('port') || 3000));
});
