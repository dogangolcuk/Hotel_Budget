'use strict'

const sequelize = require('sequelize')
const db = require('../index')
const YemekMalzeme = db.define(
  'yemekmalzeme',
  {
    miktar: {
      type: sequelize.DOUBLE,
      defaultValue: 0.0,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['yemek_id', 'malzemebase_id'],
      },
    ],
  },
)

module.exports = YemekMalzeme
