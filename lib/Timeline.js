'use strict'

var path = require('path'),
  config = require(path.join(__dirname, '../config.js')),
  blessed = require('blessed')

var TweetContainer = require(path.join(__dirname, 'TweetContainer.js'))
var twitter = require(path.join(__dirname, 'Twitter.js'))(config)

var Timeline = function () {
  // Our main box where the focus will be a lot of the time
  var element = blessed.box({
    label: 'Your Twitter home timeline',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'line',
    scrollable: true,
    style: {
      border: {
        fg: 'blue',
      },
      scrollbar: {
        bg: 'red',
        fg: 'blue',
      },
    },
    scrollbar: true,
    keys: true,
    vi: true,
  })

  element.screen.debug('Initializing Timeline')
  element.data.currentTweetIndex = 1
  element.focus()

  var screen = element.screen

  screen.debug('Creating initial timeline')

  twitter.getHomeTimeline(function (err, tweetsData) {
    if (err) { throw err }
    screen.debug('Fetched Tweets')

    var tweetContainers = tweetsData.map(TweetContainer)

    tweetContainers.forEach(function (container) {
      element.append(container)
    })

    //element.children[0].focus()
    screen.render()
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

  return element
}

module.exports = Timeline
