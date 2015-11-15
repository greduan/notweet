'use strict'

var blessed = require('blessed')

var Screen = function () {
  var screen = blessed.screen({
    smartCSR: true,
  })

  screen.key(['C-c'], function(ch, key) {
    return process.exit(0);
  })

  return {
    append: function (element) {
      screen.append(element)
      screen.render()
    },
  }
}

module.exports = Screen
