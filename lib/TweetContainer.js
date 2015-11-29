'use strict'

var path = require('path'),
  blessed = require('blessed')

var Tweet = require(path.join(__dirname, 'Tweet.js'))

var TweetContainer = function (data) {
  var element = blessed.text({
    // label: ['By', '@' + data.user.screen_name, 'at', data.created_at].join(' '),
    shrink: true,
    left: 0,
    tags: true,
    border: 'line',
  })

  var tweet = Tweet(data),
    screen = element.screen,
    height = 1 + 2 + tweet.data.text.split('\n').length

  element.height = height
  element.content = ['{green-bg}By', '@' + data.user.screen_name, 'at', data.created_at + '{/green-bg}'].join(' '),
  element.content += ['\n{red-bg}', tweet.data.text, '{/red-bg}'].join('')

  element.on('focus', function (e) {
    screen.debug('TweetContainer: tweetContainer focused')
  })

  element.on('prerender', function (e) {
    if (element.data.newestTweet) {
      element.style.border.fg = 'yellow'
    }
  })

  return element
}

module.exports = TweetContainer
