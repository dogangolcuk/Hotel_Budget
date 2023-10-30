const { Yemek, YemekGrup, Birim } = require('../db/models')
const { Op } = require('sequelize')

const getYemekAll = async () => {
  return await Yemek.findAll({
    include: [
      { model: YemekGrup, as: 'yemekgrup' },
      { model: Birim, as: 'birim' },
    ],
    order: [['id', 'DESC']],
  })
}

const getYemekAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'YemekGrup':
      ordercontext = [[{ model: YemekGrup }, `${field}`, `${ascdesc}`]]
      break
    case 'Birim':
      ordercontext = [[{ model: Birim }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Yemek.findAll({
    include: [
      { model: YemekGrup, as: 'yemekgrup' },
      { model: Birim, as: 'birim' },
    ],
    order: ordercontext,
  })
}

const getYemekAllFieldSearch = async (searchterms) => {
  const { id, ad, aciklama, yemekgrupad, birimad } = searchterms

  return await Yemek.findAll({
    include: [
      {
        model: YemekGrup,
        as: 'yemekgrup',
      },
      {
        model: Birim,
        as: 'birim',
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { aciklama: { [Op.iLike]: `%${aciklama}%` } },
        { '$yemekgrup.ad$': { [Op.iLike]: `%${yemekgrupad}%` } },
        { '$birim.ad$': { [Op.iLike]: `%${birimad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getYemek = async (id) => {
  return await Yemek.findByPk(id, {
    include: [{ model: YemekGrup }, { model: Birim }],
  })
}

const getYemekBirim = async (id) => {
  return await Yemek.findByPk(id, {
    attributes: ['ad', 'birim.ad'],
    include: [{ model: Birim, as: 'birim' }],
  })
}

const getYemekForSelect = async () => {
  return await Yemek.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveYemek = async (data) => {
  const { id, ad, aciklama, yemekgrupId, birimId } = data

  if (id && id > 0) {
    const row = await Yemek.findByPk(id)
    row.ad = ad
    row.aciklama = aciklama
    row.yemekgrupId = yemekgrupId
    row.birimId = birimId

    await row.save()
    return row
  } else {
    return await Yemek.create({
      ad: ad,
      aciklama: aciklama,
      yemekgrupId: yemekgrupId,
      birimId: birimId,
    })
  }
}

const delYemek = async (id) => {
  const row = await Yemek.findByPk(id)
  return row.destroy()
}

module.exports = {
  getYemekAll,
  getYemek,
  saveYemek,
  delYemek,
  getYemekAllFieldSearch,
  getYemekForSelect,
  getYemekAllOrdered,
  getYemekBirim,
}
