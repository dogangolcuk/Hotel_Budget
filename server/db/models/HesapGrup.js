"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const HesapGrup = db.define("hesapgrup", {
  id: {
    type: sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  kod: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = HesapGrup;
