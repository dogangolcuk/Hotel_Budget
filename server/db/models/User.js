'use strict'

const sequelize = require('sequelize')
const db = require('../index')
const User = db.define(
  'user',
  {
    ad: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    email: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    pwd: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    disableMultitenant: true,
  },
)

module.exports = User
