"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const DepartmanGrup = db.define("departmangrup", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = DepartmanGrup;
