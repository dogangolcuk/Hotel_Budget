"use strict";

const sequelize = require("sequelize");
const db = require("../index");
const DovizTarihce = db.define("doviztarihce", {
  tarih: {
    type: sequelize.DATE,
  },
  alis: {
    type: sequelize.DECIMAL,
  },
  satis: {
    type: sequelize.DECIMAL,
  },
  efektif_alis: {
    type: sequelize.DECIMAL,
  },
  efektif_satis: {
    type: sequelize.DECIMAL,
  },
  parite: {
    type: sequelize.DECIMAL,
  },
});

module.exports = DovizTarihce;
