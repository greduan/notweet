'use strict'

var path = require('path'),
  blessed = require('blessed')

var Tweet = require(path.join(__dirname, 'Tweet.js'))

var TweetContainer = function (data) {
  var element = blessed.text({
    label: ['By', '@' + data.user.screen_name, 'at', data.created_at].join(' '),
    shrink: true,
    left: 0,
    height: 3,
    border: 'line',
    style: {
      bg: 'red',
    },
  })

  var tweet = Tweet(data),
    screen = element.screen

  element.setText(tweet.data.text)

  element.on('focus', function (e) {
    screen.debug('TweetContainer: tweetContainer focused')
  })

  element.on('prerender', function (e) {
    if (element.data.newestTweet) {
      element.style.bg = 'yellow'
    }
  })

  return element
}

module.exports = TweetContainer
