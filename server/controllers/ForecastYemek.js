const {
  ForecastYemek,
  ButcePeriod,
  Butce,
  HesapAltKart,
  HesapKart,
  Yemek,
  Birim,
} = require('../db/models')
const { Op } = require('sequelize')

const getForecastYemekAll = async () => {
  return await ForecastYemek.findAll({
    include: [
      {
        model: Yemek,
        as: 'yemek',
        include: { model: Birim, as: 'birim' },
      },
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
    order: [['id', 'DESC']],
    where: { '$butceperiod.butce.aktif$': { [Op.eq]: true } },
  })
}

const getForecastYemekAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Yemek':
      ordercontext = [[{ model: Yemek }, `${field}`, `${ascdesc}`]]
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
  return await ForecastYemek.findAll({
    include: [
      {
        model: Yemek,
        as: 'yemek',
        include: { model: Birim, as: 'birim' },
      },
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

const getForecastYemekAllFieldSearch = async (searchterms) => {
  const {
    id,
    ad,
    miktar,
    yemekad,
    butceperiodad,
    hesapaltkartad,
    talep_oran,
    satis_fiyat,
    maliyet_fiyat,
  } = searchterms

  return await ForecastYemek.findAll({
    include: [
      {
        model: Yemek,
        as: 'yemek',
        include: { model: Birim, as: 'birim' },
      },
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
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$yemek.ad$': { [Op.iLike]: `%${yemekad}%` } },
        { '$butceperiod.ad$': { [Op.iLike]: `%${butceperiodad}%` } },
        { '$hesapaltkart.ad$': { [Op.iLike]: `%${hesapaltkartad}%` } },
        { miktar: { [Op.eq]: `${miktar}` } },
        { talep_oran: { [Op.eq]: `${talep_oran}` } },
        { satis_fiyat: { [Op.eq]: `${satis_fiyat}` } },
        { maliyet_fiyat: { [Op.eq]: `${maliyet_fiyat}` } },
      ],
      [Op.and]: [{ '$butceperiod.butce.aktif$': { [Op.eq]: true } }],
    },
    order: [['id', 'DESC']],
  })
}

const getForecastYemek = async (id) => {
  return await ForecastYemek.findByPk(id, {
    include: [
      { model: Yemek },
      { model: ButcePeriod, include: { model: Butce } },
      { model: HesapAltKart, include: { model: HesapKart } },
    ],
  })
}

const getForecastYemekForSelect = async () => {
  return await ForecastYemek.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveForecastYemek = async (data) => {
  const {
    id,
    ad,
    miktar,
    satis_fiyat,
    maliyet_fiyat,
    talep_oran,
    aktif,
    yemekId,
    butceperiodId,
    hesapaltkartId,
  } = data

  if (id && id > 0) {
    const row = await ForecastYemek.findByPk(id)

    row.ad = ad
    row.miktar = miktar
    row.satis_fiyat = satis_fiyat
    row.maliyet_fiyat = maliyet_fiyat
    row.talep_oran = talep_oran
    row.aktif = aktif
    row.yemekId = yemekId
    row.butceperiodId = butceperiodId
    row.hesapaltkartId = hesapaltkartId

    await row.save()
    return row
  } else {
    return await ForecastYemek.create({
      ad: ad,
      miktar: miktar,
      satis_fiyat: satis_fiyat,
      maliyet_fiyat: maliyet_fiyat,
      talep_oran: talep_oran,
      aktif: aktif,
      yemekId: yemekId,
      butceperiodId: butceperiodId,
      hesapaltkartId: hesapaltkartId,
    })
  }
}

const delForecastYemek = async (id) => {
  const row = await ForecastYemek.findByPk(id)
  return row.destroy()
}

module.exports = {
  getForecastYemekAll,
  getForecastYemek,
  saveForecastYemek,
  delForecastYemek,
  getForecastYemekForSelect,
  getForecastYemekAllFieldSearch,
  getForecastYemekAllOrdered,
}
