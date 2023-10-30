"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const Departman = db.define("departman", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Departman;
