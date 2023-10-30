"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const ForecastOda = db.define("forecastoda", {
  ad: {
    type: sequelize.TEXT,
  },
  doluluk_oran: {
    type: sequelize.DOUBLE,
    validate: {
      max: 1,
      min: 0,
    },
    defaultValue: 1,
  },
  gelir_miktar: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  gider_miktar: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  gerceklenen_gelir: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  gerceklenen_gider: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
  aktif: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForecastOda;
