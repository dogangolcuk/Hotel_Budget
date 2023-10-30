"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const Oda = db.define("oda", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tipi: {
    type: sequelize.TEXT,
  },
  adet: {
    type: sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  satilabilir_yatak: {
    type: sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  konum: {
    type: sequelize.TEXT,
  },
});

module.exports = Oda;
