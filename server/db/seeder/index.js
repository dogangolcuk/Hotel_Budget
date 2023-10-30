const db = require('..')
const {
  list_butceperiod,
  list_butce,
  list_yemek,
  list_yemekmalzeme,
  list_forecastyemek,
  list_oda,
  list_forecastoda,
  list_personel,
  list_forecastpersonel,
  list_forecastdigergelirgider,
} = require('./geciciData')

const {
  list_hesapsinif,
  list_hesapgrup,
  list_hesapanahesap,
  list_hesapalthesap,
  list_hesapkart,
  list_hesapaltkart,
  list_birim,
  list_departman,
  list_departmangrup,
  list_malzemebase,
  list_yemekgrup,
  list_malzemebasegrup,
} = require('./kaliciData')

const {
  HesapSinif,
  Birim,
  HesapGrup,
  HesapAnaHesap,
  HesapAltHesap,
  HesapKart,
  HesapAltKart,
  Butce,
  ButcePeriod,
  Departman,
  MalzemeBase,
  YemekGrup,
  Yemek,
  YemekMalzeme,
  ForecastYemek,
  Oda,
  ForecastOda,
  Personel,
  ForecastPersonel,
  ForecastDigerGelirGider,
  MalzemeBaseGrup,
  DepartmanGrup,
  User,
} = require('../models')

const list_user = [
  {
    ad: 'superadmin',
    email: 'superadmin@',
    pwd: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  },
]
const createTables = async (tenant_id) => {
  try {
    await db.didSync.then(() => db.sync({ force: true }))

    //Kalıcı datalar
    await Birim.bulkCreate(list_birim)
    await DepartmanGrup.bulkCreate(list_departmangrup)
    await Departman.bulkCreate(list_departman)
    await HesapSinif.bulkCreate(list_hesapsinif)
    await HesapGrup.bulkCreate(list_hesapgrup)
    await HesapAnaHesap.bulkCreate(list_hesapanahesap)
    await HesapAltHesap.bulkCreate(list_hesapalthesap)
    await HesapKart.bulkCreate(list_hesapkart)
    await HesapAltKart.bulkCreate(list_hesapaltkart)
    await MalzemeBaseGrup.bulkCreate(list_malzemebasegrup)
    await MalzemeBase.bulkCreate(list_malzemebase)
    await YemekGrup.bulkCreate(list_yemekgrup)
    await Butce.bulkCreate(list_butce)
    //Geçici Data
    await ButcePeriod.bulkCreate(list_butceperiod)
    await Yemek.bulkCreate(list_yemek)
    await YemekMalzeme.bulkCreate(list_yemekmalzeme)
    await ForecastYemek.bulkCreate(list_forecastyemek)
    await Oda.bulkCreate(list_oda)
    await ForecastOda.bulkCreate(list_forecastoda)
    await Personel.bulkCreate(list_personel)
    await ForecastPersonel.bulkCreate(list_forecastpersonel)
    await ForecastDigerGelirGider.bulkCreate(list_forecastdigergelirgider)
  } catch (error) {}
  await db.close()
}

const makeEmptyTables = async () => {
  try {
    await db.didSync.then(() => db.sync({ force: true }))
    await User.bulkCreate(list_user)
  } catch (error) {}
  await db.close()
}

//createTables();
makeEmptyTables()
