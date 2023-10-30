const { HesapAltHesap, HesapAnaHesap, HesapGrup, HesapSinif } = require('../db/models')
const { Op } = require('sequelize')

const getHesapAltHesapAll = async () => {
  return await HesapAltHesap.findAll({
    order: [['id', 'DESC']],
  })
}

const getHesapAltHesapAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'HesapAnaHesap':
      ordercontext = [[{ model: HesapAnaHesap }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await HesapAltHesap.findAll({
    include: {
      model: HesapAnaHesap,
      as: 'hesapanahesap',
    },
    order: ordercontext,
  })
}

const getHesapAltHesapAllFieldSearch = async (searchterms) => {
  const { kod, ad, hesapanahesapad } = searchterms

  return await HesapAltHesap.findAll({
    include: [
      {
        model: HesapAnaHesap,
        as: 'hesapanahesap',
      },
    ],
    where: {
      [Op.or]: [
        { kod: { [Op.iLike]: `%${kod}%` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$hesapanahesap.ad$': { [Op.iLike]: `%${hesapanahesapad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getHesapAltHesap = async (id) => {
  return await HesapAltHesap.findByPk(id, {
    include: [
      {
        model: HesapAnaHesap,
        include: { model: HesapGrup, include: { model: HesapSinif } },
      },
    ],
  })
}

const getHesapAltHesapForSelect = async () => {
  return await HesapAltHesap.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveHesapAltHesap = async (data) => {
  const { id, kod, ad, hesapanahesapId } = data

  if (id && id > 0) {
    const row = await HesapAltHesap.findByPk(id)
    row.id = id
    row.kod = kod
    row.ad = ad
    row.hesapanahesapId = hesapanahesapId

    await row.save()
    return row
  } else {
    return await HesapAltHesap.create({
      id: Date.now(),
      kod: kod,
      ad: ad,
      hesapanahesapId: hesapanahesapId,
    })
  }
}

const delHesapAltHesap = async (id) => {
  const row = await HesapAltHesap.findByPk(id)
  return row.destroy()
}

module.exports = {
  getHesapAltHesapAll,
  getHesapAltHesap,
  saveHesapAltHesap,
  delHesapAltHesap,
  getHesapAltHesapAllFieldSearch,
  getHesapAltHesapForSelect,
  getHesapAltHesapAllOrdered,
}
