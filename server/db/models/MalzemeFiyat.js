'use strict'

const sequelize = require('sequelize')
const db = require('../index')
const MalzemeFiyat = db.define(
  'malzemefiyat',
  {
    birim_fiyat: {
      type: sequelize.DECIMAL,
      defaultValue: 0.0,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['malzemefiyatduzeltme_id', 'malzemebase_id'],
      },
    ],
  },
)

module.exports = MalzemeFiyat
