"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const YemekGrup = db.define("yemekgrup", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = YemekGrup;
