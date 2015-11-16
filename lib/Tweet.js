'use strict'

var blessed = require('blessed')

var Tweet = function (tweetData) {
  return {
    tweetData: tweetData,
  }
}

module.exports = Tweet
