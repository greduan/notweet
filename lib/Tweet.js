'use strict'

var blessed = require('blessed')

var Tweet = function (data) {
  var element = blessed.text({
    shrink: true,
    content: data.text,
    style: {
      focus: {
        fg: 'blue',
      },
    },
  })

  var screen = element.screen

  screen.debug('Initializing Tweet')

  // Give focus to the container
  element.key('escape', function (ch, key) {
    screen.debug('Tweet: escape')
    element.parent.focus()
  })

  // Retweet
  element.key('r', function (ch, key) {
    screen.debug('Tweet: r')
  })

  // Quote
  element.key('q', function (ch, key) {
    screen.debug('Tweet: q')
  })

  // Heart
  element.key('*', function (ch, key) {
    screen.debug('Tweet: *')
  })

  // Reply
  element.key('enter', function (ch, key) {
    screen.debug('Tweet: enter')
  })

  element.on('focus', function (e) {
    screen.debug('Tweet: tweet focused')
  })

  return {
    element: element,

    data: data,
  }
}

module.exports = Tweet
