const {
  ForecastPersonel,
  ButcePeriod,
  Butce,
  Personel,
  Departman,
  HesapAltKart,
  HesapKart,
} = require('../db/models')
const { Op } = require('sequelize')

const getForecastPersonelAll = async () => {
  return await ForecastPersonel.findAll({
    include: [
      { model: Personel, as: 'personel' },
      {
        model: ButcePeriod,
        as: 'butceperiod',
        include: {
          model: Butce,
          as: 'butce',
        },
      },
      {
        model: HesapAltKart,
        as: 'hesapaltkart',
        include: { model: HesapKart, as: 'hesapkart' },
      },
    ],
    order: [['id', 'DESC']],
    where: { '$butceperiod.butce.aktif$': { [Op.eq]: true } },
  })
}

const getForecastPersonelAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Personel':
      ordercontext = [[{ model: Personel }, `${field}`, `${ascdesc}`]]
      break
    case 'ButcePeriod':
      ordercontext = [[{ model: ButcePeriod }, `${field}`, `${ascdesc}`]]
      break
    case 'HesapAltKart':
      ordercontext = [[{ model: HesapAltKart }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await ForecastPersonel.findAll({
    include: [
      { model: Personel, as: 'personel' },
      {
        model: ButcePeriod,
        as: 'butceperiod',
        include: { model: Butce, as: 'butce' },
      },
      {
        model: HesapAltKart,
        as: 'hesapaltkart',
        include: { model: HesapKart, as: 'hesapkart' },
      },
    ],
    order: ordercontext,
    where: { '$butceperiod.butce.aktif$': { [Op.eq]: true } },
  })
}

const getForecastPersonelAllFieldSearch = async (searchterms) => {
  const { id, ad, personelad, personelsoyad, butceperiodad, hesapaltkartad, gunluk_maliyet } =
    searchterms

  return await ForecastPersonel.findAll({
    include: [
      { model: Personel, as: 'personel' },
      {
        model: ButcePeriod,
        as: 'butceperiod',
        include: { model: Butce, as: 'butce' },
      },
      {
        model: HesapAltKart,
        as: 'hesapaltkart',
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$personel.ad$': { [Op.iLike]: `%${personelad}%` } },
        { '$personel.soyad$': { [Op.iLike]: `%${personelsoyad}%` } },
        { '$butceperiod.ad$': { [Op.iLike]: `%${butceperiodad}%` } },
        { '$hesapaltkart.ad$': { [Op.iLike]: `%${hesapaltkartad}%` } },
        { gunluk_maliyet: { [Op.eq]: `${gunluk_maliyet}` } },
      ],
      [Op.and]: [{ '$butceperiod.butce.aktif$': { [Op.eq]: true } }],
    },
    order: [['id', 'DESC']],
  })
}

const getForecastPersonel = async (id) => {
  return await ForecastPersonel.findByPk(id, {
    include: [
      { model: ButcePeriod, include: { model: Butce } },
      { model: Personel, include: { model: Departman } },
      { model: HesapAltKart, include: { model: HesapKart } },
    ],
  })
}

const getForecastPersonelForSelect = async () => {
  return await ForecastPersonel.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveForecastPersonel = async (data) => {
  const { id, ad, gunluk_maliyet, aktif, butceperiodId, personelId, hesapaltkartId } = data

  if (id && id > 0) {
    const row = await ForecastPersonel.findByPk(id)
    row.ad = ad
    row.gunluk_maliyet = gunluk_maliyet
    row.aktif = aktif
    row.butceperiodId = butceperiodId
    row.personelId = personelId
    row.hesapaltkartId = hesapaltkartId

    await row.save()
    return row
  } else {
    return await ForecastPersonel.create({
      ad: ad,
      gunluk_maliyet: gunluk_maliyet,
      aktif: aktif,
      butceperiodId: butceperiodId,
      personelId: personelId,
      hesapaltkartId: hesapaltkartId,
    })
  }
}

const delForecastPersonel = async (id) => {
  const row = await ForecastPersonel.findByPk(id)
  return row.destroy()
}

module.exports = {
  getForecastPersonelAll,
  getForecastPersonel,
  saveForecastPersonel,
  delForecastPersonel,
  getForecastPersonelForSelect,
  getForecastPersonelAllFieldSearch,
  getForecastPersonelAllOrdered,
}
