'use strict'
const sequelize = require('sequelize')
const db = require('../index')
const Birim = db.define('birim', {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Birim
