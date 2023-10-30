"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const ButcePeriod = db.define("butceperiod", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  baslama_tarihi: {
    type: sequelize.DATE,
  },
  bitis_tarihi: {
    type: sequelize.DATE,
  },
  tahmini_enflasyon: {
    type: sequelize.DECIMAL,
    defaultValue: 0,
  },
});

module.exports = ButcePeriod;
