var bespoke = require('bespoke'),
    classes = require('bespoke-classes'),
    keys = require('bespoke-keys'),
    bullets = require('bespoke-bullets'),
    hash = require('bespoke-hash'),
    nebula = require('bespoke-theme-nebula'),
    state = require('bespoke-state');

var deck = bespoke.from('#presentation', [
    classes(),
    keys(),
    bullets(),
    hash(),
    nebula(),
    state()
]);