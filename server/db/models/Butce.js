"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const Butce = db.define("butce", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  yil: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },
  onay_durumu: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
  },
  aktif: {
    type: sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Butce;
