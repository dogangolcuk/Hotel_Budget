const { HesapAnaHesap, HesapGrup, HesapSinif } = require('../db/models')
const { Op } = require('sequelize')

const getHesapAnaHesapAll = async () => {
  return await HesapAnaHesap.findAll({
    order: [['id', 'DESC']],
  })
}

const getHesapAnaHesapAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'HesapGrup':
      ordercontext = [[{ model: HesapGrup }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await HesapAnaHesap.findAll({
    include: {
      model: HesapGrup,
      as: 'hesapgrup',
    },
    order: ordercontext,
  })
}

const getHesapAnaHesapAllFieldSearch = async (searchterms) => {
  const { kod, ad, hesapgrupad } = searchterms

  return await HesapAnaHesap.findAll({
    include: [
      {
        model: HesapGrup,
        as: 'hesapgrup',
      },
    ],
    where: {
      [Op.or]: [
        { kod: { [Op.iLike]: `%${kod}%` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$hesapgrup.ad$': { [Op.iLike]: `%${hesapgrupad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getHesapAnaHesap = async (id) => {
  return await HesapAnaHesap.findByPk(id, {
    include: {
      model: HesapGrup,
      as: 'hesapgrup',
      include: {
        model: HesapSinif,
        as: 'hesapsinif',
      },
    },
  })
}

const getHesapAnaHesapForSelect = async () => {
  return await HesapAnaHesap.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveHesapAnaHesap = async (data) => {
  const { id, kod, ad, hesapgrupId } = data

  if (id && id > 0) {
    const row = await HesapAnaHesap.findByPk(id)
    row.id = id
    row.kod = kod
    row.ad = ad
    row.hesapgrupId = hesapgrupId

    await row.save()
    return row
  } else {
    return await HesapAnaHesap.create({
      id: Date.now(),
      kod: kod,
      ad: ad,
      hesapgrupId: hesapgrupId,
    })
  }
}

const delHesapAnaHesap = async (id) => {
  const row = await HesapAnaHesap.findByPk(id)
  return row.destroy()
}

module.exports = {
  getHesapAnaHesapAll,
  getHesapAnaHesap,
  saveHesapAnaHesap,
  delHesapAnaHesap,
  getHesapAnaHesapForSelect,
  getHesapAnaHesapAllFieldSearch,
  getHesapAnaHesapAllOrdered,
}
