'use strict'

var path = require('path'),
  blessed = require('blessed')

var Tweet = require(path.join(__dirname, 'Tweet.js'))

var TweetContainer = function (data) {
  var element = blessed.text({
    label: ['By', data.user.screen_name, 'at', data.created_at].join(' '),
    shrink: true,
    left: 0,
    height: 3,
    width: '100%-1',
    border: 'line',
    style: {
      focus: {
        // fg: 'red',
        bg: 'red',
      },
    },
  })

  var tweet = Tweet(data),
    screen = element.screen

  screen.debug('TweetContainer: tweetContainer.append')
  // element.append(tweet.element)
  element.setText(tweet.data.text)

  // Give focus to the Tweet
  element.key('enter', function (ch, key) {
    screen.debug('TweetContainer: enter')
    element.parent.children[element.parent.data.currentTweetIndex].children[1].focus()
    screen.render()
  })

  // Reload timeline
  element.key('r', function (ch, key) {
    screen.debug('TweetContainer: r')
    //var tweetsData = twitter.refreshHomeTimeline()
  })

  // Focus next Tweet container (not the Tweet itself)
  element.key('j', function (ch, key) {
    screen.debug('TweetContainer: j')

    if (element.parent.data.currentTweetIndex + 1 === element.parent.children.length) {
      screen.debug('TweetContainer: j: Already at bottom')
      return
    }

    element.parent.data.currentTweetIndex += 1

    element.parent.children[element.parent.data.currentTweetIndex].focus()
    screen.render()
  })

  // Focus previous Tweet
  element.key('k', function (ch, key) {
    screen.debug('TweetContainer: k')

    if (element.parent.data.currentTweetIndex === 1) {
      screen.debug('TweetContainer: k: Already at top')
      return
    }

    element.parent.data.currentTweetIndex -= 1

    element.parent.children[element.parent.data.currentTweetIndex].focus()
    screen.render()
  })

  element.on('focus', function (e) {
    screen.debug('TweetContainer: tweetContainer focused')
  })

  return element
}

module.exports = TweetContainer
