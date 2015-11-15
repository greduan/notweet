'use strict'

var blessed = require('blessed')

var TweetsContainer = function () {
  var box = blessed.box({
    label: 'Your Twitter timeline',
    align: 'left',
    valign: 'top',
    padding: 1,
    width: '100%',
    height: '100%',
    style: {
      fg: 'blue',
      bg: 'black',
      border: {
        fg: 'blue',
      },
      scrollbar: {
        bg: 'blue',
      },
      focus: {
        bg: 'red',
      },
    },
    content: 'Hello {bold}world{/bold}!',
  })

  return box
}

module.exports = TweetsContainer
