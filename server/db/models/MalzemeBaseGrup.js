"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const MalzemeBaseGrup = db.define("malzemebasegrup", {
  ad: {
    type: sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = MalzemeBaseGrup;
