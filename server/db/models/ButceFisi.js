"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const ButceFisi = db.define("butcefisi", {
  ad: {
    type: sequelize.TEXT,
  },
  toplam_gelir: {
    type: sequelize.DECIMAL,
  },

  toplam_gider: {
    type: sequelize.DECIMAL,
  },

  actual_gelir: {
    type: sequelize.DECIMAL,
  },

  actual_gider: {
    type: sequelize.DECIMAL,
  },
});

module.exports = ButceFisi;
