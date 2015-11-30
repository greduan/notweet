'use strict'

var path = require('path'),
  blessed = require('blessed'),
  wrap = require('word-wrap')

var Tweet = require(path.join(__dirname, 'Tweet.js'))

var TweetContainer = function (data) {
  var element = blessed.text({
    left: 0,
    tags: true,
    border: 'line',
  })

  var tweet = Tweet(data),
    screen = element.screen

  element.on('focus', function (e) {
    screen.debug('TweetContainer: tweetContainer focused')
    screen.title = tweet.data.text.slice(0, 19) + ' - notweet'
  })

  // Check for .newestTweet
  element.on('prerender', function (e) {
    if (element.data.newestTweet) {
      element.style.border.fg = 'yellow'
    }
  })

  // Content, Height and Width
  element.on('prerender', function (e) {
    // GET ELEMENT WIDTH
    var maxElementWidth = element.parent.width - 2 // borders
    element.width = maxElementWidth

    // GET ELEMENT CONTENT
    var metaText = ['By', '@' + data.user.screen_name, 'at', data.created_at].join(' '),
      wrapOptions = {
        width: maxElementWidth,
        newline: '',
        indent: '',
      },
      wrappedMeta = wrap(metaText, wrapOptions),
      wrappedText = wrap(tweet.data.text, wrapOptions)

    element.content = ['{bold}', wrappedMeta, '{/bold}'].join(''),
    element.content += ['\n', wrappedText].join('')

    // GET ELEMENT HEIGHT
    var lines = wrappedText.split('\n'),
      height = 1 + 2 + lines.length // meta, borders, content

    element.height = height
  })

  return element
}

module.exports = TweetContainer
