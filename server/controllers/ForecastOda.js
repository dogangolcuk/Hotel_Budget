const { ForecastOda, Oda, ButcePeriod, Butce, HesapAltKart, HesapKart } = require('../db/models')
const { Op } = require('sequelize')

const getForecastOdaAll = async () => {
  return await ForecastOda.findAll({
    include: [
      { model: Oda, as: 'oda' },
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

const getForecastOdaAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Oda':
      ordercontext = [[{ model: Oda }, `${field}`, `${ascdesc}`]]
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
  return await ForecastOda.findAll({
    include: [
      { model: Oda, as: 'oda' },
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

const getForecastOdaAllFieldSearch = async (searchterms) => {
  const { id, ad, odaad, butceperiodad, hesapaltkartad, doluluk_oran, gelir_miktar, gider_miktar } =
    searchterms

  return await ForecastOda.findAll({
    include: [
      { model: Oda, as: 'oda' },
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
        { '$oda.ad$': { [Op.iLike]: `%${odaad}%` } },
        { '$butceperiod.ad$': { [Op.iLike]: `%${butceperiodad}%` } },
        { '$hesapaltkart.ad$': { [Op.iLike]: `%${hesapaltkartad}%` } },
        { doluluk_oran: { [Op.eq]: `${doluluk_oran}` } },
        { gelir_miktar: { [Op.eq]: `${gelir_miktar}` } },
        { gider_miktar: { [Op.eq]: `${gider_miktar}` } },
      ],
      [Op.and]: [{ '$butceperiod.butce.aktif$': { [Op.eq]: true } }],
    },
    order: [['id', 'DESC']],
  })
}

const getForecastOda = async (id) => {
  return await ForecastOda.findByPk(id, {
    include: [
      { model: Oda },
      { model: ButcePeriod, include: { model: Butce } },
      { model: HesapAltKart, include: { model: HesapKart } },
    ],
  })
}

const getForecastOdaForSelect = async () => {
  return await ForecastOda.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveForecastOda = async (data) => {
  const {
    id,
    ad,
    doluluk_oran,
    gelir_miktar,
    gider_miktar,
    aktif,
    odaId,
    butceperiodId,
    hesapaltkartId,
  } = data

  if (id && id > 0) {
    const row = await ForecastOda.findByPk(id)
    row.ad = ad
    row.doluluk_oran = doluluk_oran
    row.gelir_miktar = gelir_miktar
    row.gider_miktar = gider_miktar
    row.aktif = aktif
    row.odaId = odaId
    row.butceperiodId = butceperiodId
    row.hesapaltkartId = hesapaltkartId

    await row.save()
    return row
  } else {
    return await ForecastOda.create({
      ad: ad,
      doluluk_oran: doluluk_oran,
      gelir_miktar: gelir_miktar,
      gider_miktar: gider_miktar,
      aktif: aktif,
      odaId: odaId,
      butceperiodId: butceperiodId,
      hesapaltkartId: hesapaltkartId,
    })
  }
}

const delForecastOda = async (id) => {
  const row = await ForecastOda.findByPk(id)
  return row.destroy()
}

module.exports = {
  getForecastOdaAll,
  getForecastOda,
  saveForecastOda,
  delForecastOda,
  getForecastOdaAllFieldSearch,
  getForecastOdaForSelect,
  getForecastOdaAllOrdered,
}
