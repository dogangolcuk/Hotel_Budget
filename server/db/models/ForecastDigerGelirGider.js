"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const ForecastDigerGelirGider = db.define("forecastdigergelirgider", {
  ad: {
    type: sequelize.TEXT,
  },
  gelir_miktar: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  gider_miktar: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  aktif: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForecastDigerGelirGider;
