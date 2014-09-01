// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  cube = require('bespoke-theme-cube'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  state = require('bespoke-state'),
  fancy = require('bespoke-theme-fancy');

// Bespoke.js
bespoke.from('article', [
  fancy(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  scale(),
  hash(),
  progress(),
  state()
]);
