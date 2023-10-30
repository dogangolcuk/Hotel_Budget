"use strict";

const { DataTypes } = require("sequelize");
const db = require("../index");
const {
  list_hesapsinif,
  list_hesapgrup,
  list_hesapanahesap,
  list_hesapalthesap,
  list_hesapkart,
  list_hesapaltkart,
} = require("../seeder/initialData");
const HesapSinif = require("./HesapSinif");
const HesapGrup = require("./HesapGrup");
const HesapAnaHesap = require("./HesapAnaHesap");
const HesapAltHesap = require("./HesapAltHesap");
const HesapKart = require("./HesapKart");
const HesapAltKart = require("./HesapAltKart");

const Tenant = db.define(
  "tenant",
  {
    ad: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.TEXT,
    },
  },
  {
    disableMultitenant: true,
  }
);
Tenant.addHook("afterCreate", async (instance, options) => {
  const diff = Date.now();
  await HesapSinif.bulkCreate(list_hesapsinif(instance.id, diff));
  await HesapGrup.bulkCreate(list_hesapgrup(instance.id, diff));
  await HesapAnaHesap.bulkCreate(list_hesapanahesap(instance.id, diff));
  await HesapAltHesap.bulkCreate(list_hesapalthesap(instance.id, diff));
  await HesapKart.bulkCreate(list_hesapkart(instance.id, diff));
  await HesapAltKart.bulkCreate(list_hesapaltkart(instance.id, diff));
});

module.exports = Tenant;
