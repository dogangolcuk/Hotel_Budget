const { HesapSinif } = require('../db/models')
const { Op } = require('sequelize')

const getHesapSinifAll = async () => {
  return await HesapSinif.findAll({ order: [['id', 'ASC']] })
}

const getHesapSinifAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await HesapSinif.findAll({ order: ordercontext })
}

const getHesapSinifAllFieldSearch = async (searchterms) => {
  const { kod, ad } = searchterms

  return await HesapSinif.findAll({
    where: {
      [Op.or]: {
        kod: { [Op.iLike]: `%${kod}%` },
        ad: { [Op.iLike]: `%${ad}%` },
      },
    },
    order: [['id', 'DESC']],
  })
}

const getHesapSinif = async (id) => {
  return await HesapSinif.findByPk(id)
}

const getHesapSinifForSelect = async () => {
  return await HesapSinif.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveHesapSinif = async (data) => {
  const { id, kod, ad } = data

  if (id && id > 0) {
    const row = await HesapSinif.findByPk(id)
    row.id = id
    row.kod = kod
    row.ad = ad

    await row.save()
    return row
  } else {
    return await HesapSinif.create({
      id: Date.now(),
      kod: kod,
      ad: ad,
    })
  }
}

const delHesapSinif = async (id) => {
  const row = await HesapSinif.findByPk(id)
  return row.destroy()
}

module.exports = {
  getHesapSinifAll,
  getHesapSinif,
  saveHesapSinif,
  delHesapSinif,
  getHesapSinifAllFieldSearch,
  getHesapSinifForSelect,
  getHesapSinifAllOrdered,
}
