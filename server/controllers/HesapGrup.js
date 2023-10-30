const { Op } = require('sequelize')
const { HesapGrup, HesapSinif } = require('../db/models')

const getHesapGrupAll = async () => {
  return await HesapGrup.findAll({
    include: {
      model: HesapSinif,
      as: 'hesapsinif',
    },
    order: [['id', 'DESC']],
  })
}

const getHesapGrupAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'HesapSinif':
      ordercontext = [[{ model: HesapSinif }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await HesapGrup.findAll({
    include: {
      model: HesapSinif,
      as: 'hesapsinif',
    },
    order: ordercontext,
  })
}

const getHesapGrupAllFieldSearch = async (searchterms) => {
  const { kod, ad, hesapsinifad } = searchterms

  return await HesapGrup.findAll({
    include: [
      {
        model: HesapSinif,
        as: 'hesapsinif',
      },
    ],
    where: {
      [Op.or]: [
        { kod: { [Op.iLike]: `%${kod}%` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$hesapsinif.ad$': { [Op.iLike]: `%${hesapsinifad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getHesapGrup = async (id) => {
  return await HesapGrup.findByPk(id, {
    include: {
      model: HesapSinif,
      as: 'hesapsinif',
    },
  })
}

const getHesapGrupForSelect = async () => {
  return await HesapGrup.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveHesapGrup = async (data) => {
  const { id, kod, ad, hesapsinifId } = data

  if (id && id > 0) {
    const row = await HesapGrup.findByPk(id)
    row.id = id
    row.kod = kod
    row.ad = ad
    row.hesapsinifId = hesapsinifId

    await row.save()
    return row
  } else {
    return await HesapGrup.create({
      id: Date.now(),
      kod: kod,
      ad: ad,
      hesapsinifId: hesapsinifId,
    })
  }
  // }
}

const delHesapGrup = async (id) => {
  const row = await HesapGrup.findByPk(id)
  return row.destroy()
}

module.exports = {
  getHesapGrupAll,
  getHesapGrup,
  saveHesapGrup,
  delHesapGrup,
  getHesapGrupAllFieldSearch,
  getHesapGrupForSelect,
  getHesapGrupAllOrdered,
}
