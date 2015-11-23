'use strict'

var blessed = require('blessed')

var Screen = function () {
  var screen = blessed.screen({
    smartCSR: true,
    autoPadding: true,
    forceUnicode: true,
    debug: true,
  })

  screen.title = 'notweet'

  screen.key('C-c', function(ch, key) {
    return process.exit(0);
  })

  return screen
}

module.exports = Screen
