"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const Personel = db.define("personel", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  soyad: {
    type: sequelize.TEXT,
  },

  gorev_unvan: {
    type: sequelize.TEXT,
  },
  statu: {
    type: sequelize.TEXT,
  },
});

module.exports = Personel;
