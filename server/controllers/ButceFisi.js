const {
  ButceFisi,
  Departman,
  DovizCinsi,
  ForecastYemek,
  ForecastOda,
  ForecastPersonel,
  ForecastDigerGelirGider,
  Tekrar,
  Yemek,
  MaliyetHesapYontem,
  FiyatlamaYontem,
  ButcePeriod,
  HesapAltKart,
  Butce,
  YemekGrup,
  Birim,
  HesapKart,
  Oda,
} = require('../db/models')
const { Op } = require('sequelize')

const getButceFisiAll = async () => {
  return await ButceFisi.findAll({
    include: [
      {
        model: ForecastYemek,
        include: [
          { model: Yemek, include: [{ model: YemekGrup }, { model: Birim }] },
          {
            model: HesapAltKart,
            include: { model: HesapKart, as: 'hesapkart' },
          },
        ],
      },
      {
        model: ForecastOda,
        as: 'forecastoda',
        include: [
          { model: Oda, as: 'oda' },
          { model: ButcePeriod, as: 'butceperiod' },
          { model: HesapAltKart, as: 'hesapaltkart' },
        ],
      },
      { model: ForecastPersonel },
      { model: ForecastDigerGelirGider },
    ],
    order: [['id', 'DESC']],
  })
}

const getButceFisiOdaGelirAllOrdered = async (orderby) => {
  const { field, ascdesc, model, tf } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'DovizCinsi':
      ordercontext = [[{ model: DovizCinsi }, `${field}`, `${ascdesc}`]]
      break
    case 'ForecastOda':
      ordercontext = [[{ model: ForecastOda }, `${field}`, `${ascdesc}`]]
      break
    case 'Departman':
      ordercontext = [[{ model: Departman }, `${field}`, `${ascdesc}`]]
      break
    case 'Tekrar':
      ordercontext = [[{ model: Tekrar }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }

  return await ButceFisi.findAll({
    include: [
      {
        model: Departman,
        as: 'departman',
        include: { model: Departman, as: 'subdepartman' },
      },
      { model: DovizCinsi, as: 'dovizcinsi' },
      { model: ForecastOda, as: 'forecastoda' },
      { model: Tekrar, as: 'tekrar' },
    ],

    where: { gelirmi: { [Op.eq]: `${tf}` } },
    order: ordercontext,
  })
}

const getButceFisiOdaAllFieldSearch = async (searchterms) => {
  const { id, ad, dovizcinsiad, forecastodaad, departmanad, tekrarad, aciklama, tf } = searchterms
  return await ButceFisi.findAll({
    include: [
      {
        model: Departman,
        as: 'departman',
      },
      { model: DovizCinsi, as: 'dovizcinsi' },
      { model: ForecastOda, as: 'forecastoda' },
      { model: Tekrar, as: 'tekrar' },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$dovizcinsi.ad$': { [Op.iLike]: `%${dovizcinsiad}%` } },
        { '$forecastoda.ad$': { [Op.iLike]: `%${forecastodaad}%` } },
        {
          '$departman.ad$': {
            [Op.iLike]: `%${departmanad}%`,
          },
        },
        { '$tekrar.ad$': { [Op.iLike]: `%${tekrarad}%` } },
        { aciklama: { [Op.iLike]: `%${aciklama}%` } },
      ],
      [Op.and]: [{ gelirmi: { [Op.eq]: `${tf}` } }],
    },
    order: [['id', 'DESC']],
  })
}

const getButceFisi = async (id) => {
  return await ButceFisi.findByPk(id, {
    include: [
      { model: Departman, include: { model: Departman } },
      { model: DovizCinsi },
      {
        model: ForecastYemek,
        include: [
          { model: Yemek, include: [{ model: YemekGrup }, { model: Birim }] },
          { model: MaliyetHesapYontem },
          { model: FiyatlamaYontem },
          { model: ButcePeriod, include: { model: Butce } },
          { model: HesapAltKart, include: { model: HesapKart } },
        ],
      },
      { model: ForecastOda },
      { model: ForecastPersonel },
      { model: ForecastDigerGelirGider },
      { model: Tekrar },
    ],
  })
}

const saveButceFisi = async (data) => {
  const {
    id,
    ad,
    toplam_gelir,
    toplam_gider,
    actual_gelir,
    actual_gider,
    departmanId,
    dovizcinsiId,
    forecastyemekId,
    forecastodaId,
    forecastpersonelId,
    forecastdigergelirgiderId,
    tekrarId,
  } = data

  if (id && id > 0) {
    const row = await ButceFisi.findByPk(id)
    row.ad = ad
    row.toplam_gelir = toplam_gelir
    row.toplam_gider = toplam_gider
    row.actual_gelir = actual_gelir
    row.actual_gider = actual_gider
    row.departmanId = departmanId
    row.dovizcinsiId = dovizcinsiId
    row.forecastyemekId = forecastyemekId
    row.forecastodaId = forecastodaId
    row.forecastpersonelId = forecastpersonelId
    row.forecastdigergelirgiderId = forecastdigergelirgiderId
    row.tekrarId = tekrarId

    await row.save()
    return row
  } else {
    return await ButceFisi.create({
      ad: ad,
      toplam_gelir: toplam_gelir,
      toplam_gider: toplam_gider,
      actual_gelir: actual_gelir,
      actual_gider: actual_gider,
      departmanId: departmanId,
      dovizcinsiId: dovizcinsiId,
      forecastyemekId: forecastyemekId,
      forecastodaId: forecastodaId,
      forecastpersonelId: forecastpersonelId,
      forecastdigergelirgiderId: forecastdigergelirgiderId,
      tekrarId: tekrarId,
    })
  }
}

const delButceFisi = async (id) => {
  const row = await ButceFisi.findByPk(id)
  return row.destroy()
}

module.exports = {
  getButceFisiAll,
  getButceFisi,
  saveButceFisi,
  delButceFisi,
  getButceFisiOdaGelirAllOrdered,
  getButceFisiOdaAllFieldSearch,
}
