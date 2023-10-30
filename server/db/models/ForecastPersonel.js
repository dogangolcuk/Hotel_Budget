"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const ForecastPersonel = db.define("forecastpersonel", {
  ad: {
    type: sequelize.TEXT,
  },
  gunluk_maliyet: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  aktif: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForecastPersonel;
