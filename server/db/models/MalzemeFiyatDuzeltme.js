"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const MalzemeFiyatDuzeltme = db.define("malzemefiyatduzeltme", {
  duzeltme_oran: {
    type: sequelize.DOUBLE,
    defaultValue: 0.0,
  },
});

module.exports = MalzemeFiyatDuzeltme;
