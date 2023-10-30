const {
  ForecastDigerGelirGider,
  ButcePeriod,
  HesapAltKart,
  Butce,
  Departman,
  HesapKart,
} = require('../db/models')
const { Op } = require('sequelize')

const getForecastDigerGelirGiderAll = async () => {
  return await ForecastDigerGelirGider.findAll({
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
        include: { model: Butce, as: 'butce' },
      },
      {
        model: Departman,
        as: 'departman',
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

const getForecastDigerGelirGiderAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Departman':
      ordercontext = [[{ model: Departman }, `${field}`, `${ascdesc}`]]
      break
    case 'ButcePeriod':
      ordercontext = [[{ model: ButcePeriod }, `${field}`, `${ascdesc}`]]
      break
    case 'HesapAltKart':
      ordercontext = [[{ model: HesapAltKart }, `${field}`, `${ascdesc}`]]
      break
    default:
  }
  return await ForecastDigerGelirGider.findAll({
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
        include: { model: Butce, as: 'butce' },
      },
      {
        model: Departman,
        as: 'departman',
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

const getForecastDigerGelirGiderAllFieldSearch = async (searchterms) => {
  const { id, ad, departmanad, butceperiodad, hesapaltkartad, gelir_miktar, gider_miktar } =
    searchterms

  return await ForecastDigerGelirGider.findAll({
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
        include: { model: Butce, as: 'butce' },
      },
      {
        model: Departman,
        as: 'departman',
      },
      {
        model: HesapAltKart,
        as: 'hesapaltkart',
        include: { model: HesapKart, as: 'hesapkart' },
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$departman.ad$': { [Op.iLike]: `%${departmanad}%` } },
        { '$butceperiod.ad$': { [Op.iLike]: `%${butceperiodad}%` } },
        { '$hesapaltkart.ad$': { [Op.iLike]: `%${hesapaltkartad}%` } },
        { gelir_miktar: { [Op.eq]: `${gelir_miktar}` } },
        { gider_miktar: { [Op.eq]: `${gider_miktar}` } },
      ],
      [Op.and]: [{ '$butceperiod.butce.aktif$': { [Op.eq]: true } }],
    },
    order: [['id', 'DESC']],
  })
}

const getForecastDigerGelirGider = async (id) => {
  return await ForecastDigerGelirGider.findByPk(id, {
    include: [
      { model: ButcePeriod, include: { model: Butce } },
      {
        model: Departman,
      },
      { model: HesapAltKart, include: { model: HesapKart } },
    ],
  })
}

const getForecastDigerGelirGiderForSelect = async () => {
  return await ForecastDigerGelirGider.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveForecastDigerGelirGider = async (data) => {
  const { id, ad, gelir_miktar, gider_miktar, aktif, butceperiodId, departmanId, hesapaltkartId } =
    data

  if (id && id > 0) {
    const row = await ForecastDigerGelirGider.findByPk(id)

    row.ad = ad
    row.gelir_miktar = gelir_miktar
    row.gider_miktar = gider_miktar
    row.aktif = aktif
    row.butceperiodId = butceperiodId
    row.departmanId = departmanId
    row.hesapaltkartId = hesapaltkartId

    await row.save()
    return row
  } else {
    return await ForecastDigerGelirGider.create({
      ad: ad,
      gelir_miktar: gelir_miktar,
      gider_miktar: gider_miktar,
      aktif: aktif,
      butceperiodId: butceperiodId,
      departmanId: departmanId,
      hesapaltkartId: hesapaltkartId,
    })
  }
}

const delForecastDigerGelirGider = async (id) => {
  const row = await ForecastDigerGelirGider.findByPk(id)
  return row.destroy()
}

module.exports = {
  getForecastDigerGelirGiderAll,
  getForecastDigerGelirGider,
  saveForecastDigerGelirGider,
  delForecastDigerGelirGider,
  getForecastDigerGelirGiderForSelect,
  getForecastDigerGelirGiderAllFieldSearch,
  getForecastDigerGelirGiderAllOrdered,
}
