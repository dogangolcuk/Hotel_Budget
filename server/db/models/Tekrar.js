"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const Tekrar = db.define("tekrar", {
  ad: { type: sequelize.TEXT },
  tekrar_gun_sayisi: {
    type: sequelize.INTEGER,
  },
});

module.exports = Tekrar;
