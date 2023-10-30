"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const DovizCinsi = db.define("dovizcinsi", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = DovizCinsi;
