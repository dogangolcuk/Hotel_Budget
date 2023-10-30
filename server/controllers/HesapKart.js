const { HesapKart, HesapAltHesap, HesapAnaHesap, HesapGrup, HesapSinif } = require('../db/models')
const { Op } = require('sequelize')

const getHesapKartAll = async () => {
  return await HesapKart.findAll({
    order: [['id', 'DESC']],
  })
}

const getHesapKartAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'HesapAltHesap':
      ordercontext = [[{ model: HesapAltHesap }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await HesapKart.findAll({
    include: {
      model: HesapAltHesap,
      as: 'hesapalthesap',
    },
    order: ordercontext,
  })
}

const getHesapKartAllFieldSearch = async (searchterms) => {
  const { kod, ad, hesapalthesapad } = searchterms

  return await HesapKart.findAll({
    include: [
      {
        model: HesapAltHesap,
        as: 'hesapalthesap',
      },
    ],
    where: {
      [Op.or]: [
        { kod: { [Op.iLike]: `%${kod}%` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$hesapalthesap.ad$': { [Op.iLike]: `%${hesapalthesapad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getHesapKart = async (id) => {
  return await HesapKart.findByPk(id, {
    include: {
      model: HesapAltHesap,
      include: {
        model: HesapAnaHesap,
        include: {
          model: HesapGrup,
          include: {
            model: HesapSinif,
          },
        },
      },
    },
  })
}

const getHesapKartForSelect = async () => {
  return await HesapKart.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveHesapKart = async (data) => {
  const { id, kod, ad, hesapalthesapId } = data

  if (id && id > 0) {
    const row = await HesapKart.findByPk(id)
    row.id = id
    row.kod = kod
    row.ad = ad
    row.hesapalthesapId = hesapalthesapId

    await row.save()
    return row
  } else {
    return await HesapKart.create({
      id: Date.now(),
      kod: kod,
      ad: ad,
      hesapalthesapId: hesapalthesapId,
    })
  }
  // }
}

const delHesapKart = async (id) => {
  const row = await HesapKart.findByPk(id)
  return row.destroy()
}

module.exports = {
  getHesapKartAll,
  getHesapKart,
  saveHesapKart,
  delHesapKart,
  getHesapKartAllFieldSearch,
  getHesapKartForSelect,
  getHesapKartAllOrdered,
}
