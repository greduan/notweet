'use strict'

var path = require('path'),
  config = require(path.join(__dirname, '../config.js')),
  blessed = require('blessed')

var TweetContainer = require(path.join(__dirname, 'TweetContainer.js'))
var twitter = require(path.join(__dirname, 'Twitter.js'))(config)

var Timeline = function () {
  // Our main box where the focus will be a lot of the time
  var element = blessed.box({
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'line',
    style: {
      border: {
        fg: 'blue',
      },
      scrollbar: {
        bg: 'red',
        fg: 'blue',
      },
    },
  })

  element.screen.debug('Initializing Timeline')
  element.data.currentTweetIndex = 0
  element.focus()

  var screen = element.screen

  screen.debug('Creating initial timeline')

  twitter.getHomeTimeline(function (err, tweetsData) {
    if (err) { throw err }
    screen.debug('Fetched Tweets')

    tweetsData.forEach(function (tweet) {
      element.append(TweetContainer(tweet))
    })

    return screen.render()
  })

  element.on('prerender', function (e) {
    var position = 1

    element.children.forEach(function (child, index) {
      child.top = position
      // child.top = 5
      // child.top = index * 2

      position += 3
    })

    return
  })

  // Add new Tweets to timeline.
  element.key('r', function (ch, key) {
    twitter.refreshHomeTimeline(function (err, tweets) {
      if (err) { throw err }
      screen.debug('Fetched newest Tweets')

      var reversed = tweets.reverse()

      element.children[0].data.newestTweet = true

      reversed.forEach(function (tweet) {
        element.prepend(TweetContainer(tweet))
      })

      return screen.render()
    })
  })

  return element
}

module.exports = Timeline
