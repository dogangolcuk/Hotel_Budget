"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const ForecastYemek = db.define("forecastyemek", {
  ad: {
    type: sequelize.TEXT,
  },
  miktar: {
    type: sequelize.DOUBLE,
    defaultValue: 0,
  },
  satis_fiyat: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  maliyet_fiyat: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  talep_oran: {
    type: sequelize.DOUBLE,
    defaultValue: 1,
    validate: {
      max: 1,
      min: 0,
    },
  },
  aktif: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForecastYemek;
