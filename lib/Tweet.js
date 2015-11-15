'use strict'

var blessed = require('blessed')

var Tweet = function (tweetData) {
  return {
    tweetData: tweetData,

    tweetText: tweetData.text,
  }
}

module.exports = Tweet
