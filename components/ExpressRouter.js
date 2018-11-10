const express = require('express')

// const { _ } = require('../utils')

class ExpressRouter {

  constructor() {
    this.router = express.Router();
  }
}

module.exports = ExpressRouter