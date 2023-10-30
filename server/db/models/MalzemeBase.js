"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const MalzemeBase = db.define("malzemebase", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  fire_orani: {
    type: sequelize.DOUBLE,
    defaultValue: 0.0,
  },
});

module.exports = MalzemeBase;
