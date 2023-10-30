const { ButcePeriod, Butce } = require('../db/models')
const { Op } = require('sequelize')

const getButcePeriodAll = async () => {
  return await ButcePeriod.findAll({
    include: {
      model: Butce,
      as: 'butce',
    },
    order: [['id', 'DESC']],
  })
}

const getButcePeriodAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Butce':
      ordercontext = [[{ model: Butce }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await ButcePeriod.findAll({
    include: {
      model: Butce,
      as: 'butce',
    },
    order: ordercontext,
  })
}

const getButcePeriodAllFieldSearch = async (searchterms) => {
  const { id, ad, tahmini_enflasyon, butcead } = searchterms

  return await ButcePeriod.findAll({
    include: [
      {
        model: Butce,
        as: 'butce',
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { tahmini_enflasyon: { [Op.eq]: `${tahmini_enflasyon}` } },
        { '$butce.ad$': { [Op.iLike]: `%${butcead}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getButcePeriod = async (id) => {
  return await ButcePeriod.findByPk(id, {
    include: {
      model: Butce,
    },
  })
}

const getButcePeriodForSelect = async () => {
  return await ButcePeriod.findAll({
    include: [
      {
        model: Butce,
        as: 'butce',
      },
    ],
    attributes: ['id', 'ad'],
    where: { '$butce.aktif$': { [Op.eq]: true } },
    order: [['id', 'DESC']],
  })
}

const saveButcePeriod = async (data) => {
  const { id, ad, baslama_tarihi, bitis_tarihi, tahmini_enflasyon, butceId } = data

  if (id && id > 0) {
    const row = await ButcePeriod.findByPk(id)
    row.ad = ad
    row.baslama_tarihi = baslama_tarihi
    row.bitis_tarihi = bitis_tarihi
    row.tahmini_enflasyon = tahmini_enflasyon
    row.butceId = butceId
    await row.save()
    return row
  } else {
    return await ButcePeriod.create({
      ad: ad,
      baslama_tarihi: baslama_tarihi,
      bitis_tarihi: bitis_tarihi,
      tahmini_enflasyon: tahmini_enflasyon,
      butceId: butceId,
    })
  }
}

const delButcePeriod = async (id) => {
  const row = await ButcePeriod.findByPk(id)
  return row.destroy()
}

module.exports = {
  getButcePeriodAll,
  getButcePeriod,
  saveButcePeriod,
  delButcePeriod,
  getButcePeriodAllFieldSearch,
  getButcePeriodForSelect,
  getButcePeriodAllOrdered,
}
