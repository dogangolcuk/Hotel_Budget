"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const Yemek = db.define("yemek", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  aciklama: {
    type: sequelize.TEXT,
  },
});

module.exports = Yemek;
