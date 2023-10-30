////////////////////////YEMEK KISMI//////////////////////////
const YemekGrup = require("./YemekGrup");
const Yemek = require("./Yemek");
const MalzemeFiyat = require("./MalzemeFiyat");
const MalzemeBase = require("./MalzemeBase");
const MalzemeBaseGrup = require("./MalzemeBaseGrup");
const MalzemeFiyatDuzeltme = require("./MalzemeFiyatDuzeltme");
const ForecastYemek = require("./ForecastYemek");
const YemekMalzeme = require("./YemekMalzeme");

/////////////////////////GENEL TANIMLAMALAR KISMI///////////////////////
const Birim = require("./Birim");
const DovizCinsi = require("./DovizCinsi");
const DovizTarihce = require("./DovizTarihce");
const Departman = require("./Departman");
const DepartmanGrup = require("./DepartmanGrup");

/////////////////////////DİĞER GELİR GİDERLER KISMI///////////////////////
const ForecastDigerGelirGider = require("./ForecastDigerGelirGider");

/////////////////////////PERSONEL KISMI///////////////////////
const Personel = require("./Personel");
const ForecastPersonel = require("./ForecastPersonel");

/////////////////////////ODA KISMI///////////////////////
const Oda = require("./Oda");
const ForecastOda = require("./ForecastOda");

/////////////////////////HESAP PLANI KISMI///////////////////////
const HesapSinif = require("./HesapSinif");
const HesapGrup = require("./HesapGrup");
const HesapAnaHesap = require("./HesapAnaHesap");
const HesapAltHesap = require("./HesapAltHesap");
const HesapKart = require("./HesapKart");
const HesapAltKart = require("./HesapAltKart");

/////////////////////////BÜTÇE KISMI///////////////////////
const Butce = require("./Butce");
const ButcePeriod = require("./ButcePeriod");
const ButceFisi = require("./ButceFisi");
const Tekrar = require("./Tekrar");

/////////////////////////DİĞER KISIM///////////////////////

const rawdb = require("./Raw");
const Tenant = require("./Tenant");
const User = require("./User");

/////////////////////////ASSOCIATIONS///////////////////////
//Associations of "YemekGrup" model
YemekGrup.hasMany(Yemek, {
  foreignKey: {
    allowNull: false,
  },
});
Yemek.belongsTo(YemekGrup, {
  as: "yemekgrup",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "Yemek" model
Birim.hasMany(Yemek, {
  foreignKey: {
    allowNull: false,
  },
});
Yemek.belongsTo(Birim, {
  as: "birim",
  foreignKey: {
    allowNull: false,
  },
});

MalzemeBase.hasMany(MalzemeFiyat, {
  foreignKey: {
    allowNull: false,
  },
});
MalzemeFiyat.belongsTo(MalzemeBase, {
  as: "malzemebase",
  foreignKey: {
    allowNull: false,
  },
});

MalzemeFiyatDuzeltme.hasMany(MalzemeFiyat);
MalzemeFiyat.belongsTo(MalzemeFiyatDuzeltme, { as: "malzemefiyatduzeltme" });

MalzemeFiyatDuzeltme.belongsTo(ButcePeriod, { as: "butceperiod" });
ButcePeriod.hasMany(MalzemeFiyatDuzeltme);

YemekMalzeme.belongsTo(Yemek, {
  as: "yemek",
  foreignKey: {
    allowNull: false,
  },
});
Yemek.hasMany(YemekMalzeme, {
  foreignKey: {
    allowNull: false,
  },
});

YemekMalzeme.belongsTo(MalzemeBase, {
  as: "malzemebase",
  foreignKey: {
    allowNull: false,
  },
});
MalzemeBase.hasMany(YemekMalzeme, {
  foreignKey: {
    allowNull: false,
  },
});

MalzemeBaseGrup.hasMany(MalzemeBase, {
  foreignKey: {
    allowNull: false,
  },
});
MalzemeBase.belongsTo(MalzemeBaseGrup, {
  as: "malzemebasegrup",
  foreignKey: {
    allowNull: false,
  },
});
//
Birim.hasMany(MalzemeBase);
MalzemeBase.belongsTo(Birim, { as: "birim" });

//Associations of "ForecastYemek" model
Yemek.hasMany(ForecastYemek, {
  as: "forecastyemek",
  foreignKey: {
    allowNull: false,
  },
});
ForecastYemek.belongsTo(Yemek, {
  as: "yemek",
  foreignKey: {
    allowNull: false,
  },
});

ButcePeriod.hasMany(ForecastYemek, {
  as: "forecastyemek",
  foreignKey: {
    allowNull: false,
  },
});
ForecastYemek.belongsTo(ButcePeriod, {
  as: "butceperiod",
  foreignKey: {
    allowNull: false,
  },
});

HesapAltKart.hasMany(ForecastYemek, {
  as: "forecastyemek",
  foreignKey: {
    allowNull: false,
  },
});
ForecastYemek.belongsTo(HesapAltKart, {
  as: "hesapaltkart",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "DovizCinsi" model
DovizCinsi.hasMany(DovizTarihce);
DovizTarihce.belongsTo(DovizCinsi);

//Associations of "DovizTarihce" model

//Associations of "Departman" mode
DepartmanGrup.hasMany(Departman, {
  foreignKey: {
    allowNull: false,
  },
});
Departman.belongsTo(DepartmanGrup, {
  as: "departmangrup",
  foreignKey: {
    allowNull: false,
  },
});

ButcePeriod.hasMany(ForecastDigerGelirGider, {
  as: "forecastdigergelirgider",
  foreignKey: {
    allowNull: false,
  },
});
ForecastDigerGelirGider.belongsTo(ButcePeriod, {
  as: "butceperiod",
  foreignKey: {
    allowNull: false,
  },
});

Departman.hasMany(ForecastDigerGelirGider, {
  as: "forecastdigergelirgider",
  foreignKey: {
    allowNull: false,
  },
});
ForecastDigerGelirGider.belongsTo(Departman, {
  as: "departman",
  foreignKey: {
    allowNull: false,
  },
});

HesapAltKart.hasMany(ForecastDigerGelirGider, {
  as: "forecastdigergelirgider",
  foreignKey: {
    allowNull: false,
  },
});
ForecastDigerGelirGider.belongsTo(HesapAltKart, {
  as: "hesapaltkart",
  foreignKey: {
    allowNull: false,
  },
});

Departman.hasMany(Personel);
Personel.belongsTo(Departman, {
  as: "departman",
});

ButcePeriod.hasMany(ForecastPersonel, {
  as: "forecastpersonel",
  foreignKey: {
    allowNull: false,
  },
});
ForecastPersonel.belongsTo(ButcePeriod, {
  as: "butceperiod",
  foreignKey: {
    allowNull: false,
  },
});

Personel.hasMany(ForecastPersonel, {
  as: "forecastpersonel",
  foreignKey: {
    allowNull: false,
  },
});
ForecastPersonel.belongsTo(Personel, {
  as: "personel",
  foreignKey: {
    allowNull: false,
  },
});

HesapAltKart.hasMany(ForecastPersonel, {
  as: "forecastpersonel",
  foreignKey: {
    allowNull: false,
  },
});
ForecastPersonel.belongsTo(HesapAltKart, {
  as: "hesapaltkart",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "Oda" model
Oda.hasMany(ForecastOda, {
  foreignKey: {
    allowNull: false,
  },
});
ForecastOda.belongsTo(Oda, {
  as: "oda",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "ForecastOda" model
ButcePeriod.hasMany(ForecastOda, {
  foreignKey: {
    allowNull: false,
  },
});
ForecastOda.belongsTo(ButcePeriod, {
  as: "butceperiod",
  foreignKey: {
    allowNull: false,
  },
});

HesapAltKart.hasMany(ForecastOda, {
  foreignKey: {
    allowNull: false,
  },
});
ForecastOda.belongsTo(HesapAltKart, {
  as: "hesapaltkart",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "HesapSinif" model

//Associations of "HesapGrup" model
HesapSinif.hasMany(HesapGrup, {
  foreignKey: {
    allowNull: false,
  },
});
HesapGrup.belongsTo(HesapSinif, {
  as: "hesapsinif",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "HesapAnaHesap" model
HesapGrup.hasMany(HesapAnaHesap, {
  foreignKey: {
    allowNull: false,
  },
});
HesapAnaHesap.belongsTo(HesapGrup, {
  as: "hesapgrup",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "HesapAltHesap" model
HesapAnaHesap.hasMany(HesapAltHesap, {
  foreignKey: {
    allowNull: false,
  },
});
HesapAltHesap.belongsTo(HesapAnaHesap, {
  as: "hesapanahesap",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "HesapKart" model
HesapAltHesap.hasMany(HesapKart, {
  foreignKey: {
    allowNull: false,
  },
});
HesapKart.belongsTo(HesapAltHesap, {
  as: "hesapalthesap",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "HesapAltKart" model
HesapKart.hasMany(HesapAltKart, {
  foreignKey: {
    allowNull: false,
  },
});
HesapAltKart.belongsTo(HesapKart, {
  as: "hesapkart",
  foreignKey: {
    allowNull: false,
  },
});

//Associations of "Butce" model

//Associations of "ButcePeriod" model
Butce.hasMany(ButcePeriod, {
  foreignKey: {
    allowNull: false,
  },
});
ButcePeriod.belongsTo(Butce, {
  as: "butce",
  foreignKey: {
    allowNull: false,
  },
});

Departman.hasMany(ButceFisi);
ButceFisi.belongsTo(Departman, { as: "departman" });

DovizCinsi.hasMany(ButceFisi);
ButceFisi.belongsTo(DovizCinsi, { as: "dovizcinsi" });

ForecastYemek.hasMany(ButceFisi);
ButceFisi.belongsTo(ForecastYemek);

ForecastOda.hasMany(ButceFisi);
ButceFisi.belongsTo(ForecastOda, { as: "forecastoda" });

ForecastPersonel.hasMany(ButceFisi);
ButceFisi.belongsTo(ForecastPersonel);

ForecastDigerGelirGider.hasMany(ButceFisi);
ButceFisi.belongsTo(ForecastDigerGelirGider);

Tekrar.hasMany(ButceFisi);
ButceFisi.belongsTo(Tekrar, { as: "tekrar" });

// Associations of "Tenant" model
Tenant.hasMany(User);
User.belongsTo(Tenant, { as: "tenant" });

//Column Based Multi Tenancy
YemekGrup.belongsTo(Tenant);
Yemek.belongsTo(Tenant);
ForecastYemek.belongsTo(Tenant);
Birim.belongsTo(Tenant);
Departman.belongsTo(Tenant);
DepartmanGrup.belongsTo(Tenant);
ForecastDigerGelirGider.belongsTo(Tenant);
Personel.belongsTo(Tenant);
ForecastPersonel.belongsTo(Tenant);
Oda.belongsTo(Tenant);
ForecastOda.belongsTo(Tenant);
HesapSinif.belongsTo(Tenant, { onDelete: "RESTRICT" });
HesapGrup.belongsTo(Tenant);
HesapAnaHesap.belongsTo(Tenant);
HesapAltHesap.belongsTo(Tenant);
HesapKart.belongsTo(Tenant);
HesapAltKart.belongsTo(Tenant);
Butce.belongsTo(Tenant);
ButcePeriod.belongsTo(Tenant);
MalzemeBase.belongsTo(Tenant);
YemekMalzeme.belongsTo(Tenant);
MalzemeBaseGrup.belongsTo(Tenant);
MalzemeFiyatDuzeltme.belongsTo(Tenant);
MalzemeFiyat.belongsTo(Tenant);

//Column Based Multi Tenancy
Tenant.hasMany(YemekGrup);
Tenant.hasMany(Yemek);
Tenant.hasMany(ForecastYemek);
Tenant.hasMany(Birim);
Tenant.hasMany(Departman);
Tenant.hasMany(DepartmanGrup);
Tenant.hasMany(ForecastDigerGelirGider);
Tenant.hasMany(Personel);
Tenant.hasMany(ForecastPersonel);
Tenant.hasMany(Oda);
Tenant.hasMany(ForecastOda);
Tenant.hasMany(HesapSinif);
Tenant.hasMany(HesapGrup);
Tenant.hasMany(HesapAnaHesap);
Tenant.hasMany(HesapAltHesap);
Tenant.hasMany(HesapKart);
Tenant.hasMany(HesapAltKart);
Tenant.hasMany(Butce);
Tenant.hasMany(ButcePeriod);
Tenant.hasMany(MalzemeBase);
Tenant.hasMany(YemekMalzeme);
Tenant.hasMany(MalzemeBaseGrup);
Tenant.hasMany(MalzemeFiyatDuzeltme);
Tenant.hasMany(MalzemeFiyat);

module.exports = {
  YemekGrup,
  Yemek,
  ForecastYemek,
  Birim,
  Departman,
  DepartmanGrup,
  ForecastDigerGelirGider,
  Personel,
  ForecastPersonel,
  Oda,
  ForecastOda,
  HesapSinif,
  HesapGrup,
  HesapAnaHesap,
  HesapAltHesap,
  HesapKart,
  HesapAltKart,
  Butce,
  ButcePeriod,
  MalzemeBase,
  YemekMalzeme,
  MalzemeBaseGrup,
  MalzemeFiyatDuzeltme,
  MalzemeFiyat,
  rawdb,
  Tenant,
  User,
};
