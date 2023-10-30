const {
  HesapAltKart,
  HesapKart,
  HesapAltHesap,
  HesapAnaHesap,
  HesapGrup,
  HesapSinif,
} = require('../db/models')
const { Op } = require('sequelize')

const getHesapAltKartAll = async () => {
  return await HesapAltKart.findAll({
    order: [['id', 'DESC']],
  })
}

const getHesapAltKartAllAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'HesapKart':
      ordercontext = [[{ model: HesapKart }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await HesapAltKart.findAll({
    include: {
      model: HesapKart,
      as: 'hesapkart',
    },
    order: ordercontext,
  })
}

const getHesapAltKartAllFieldSearch = async (searchterms) => {
  const { kod, ad, hesapkartad } = searchterms

  return await HesapAltKart.findAll({
    include: [
      {
        model: HesapKart,
        as: 'hesapkart',
      },
    ],
    where: {
      [Op.or]: [
        { kod: { [Op.iLike]: `%${kod}%` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$hesapkart.ad$': { [Op.iLike]: `%${hesapkartad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getHesapAltKart = async (id) => {
  return await HesapAltKart.findByPk(id, {
    include: [
      {
        model: HesapKart,
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
      },
    ],
  })
}

const getHesapAltKartForSelect = async () => {
  return await HesapAltKart.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveHesapAltKart = async (data) => {
  const { id, kod, ad, hesapkartId } = data

  if (id && id > 0) {
    const row = await HesapAltKart.findByPk(id)
    row.id = id
    row.kod = kod
    row.ad = ad
    row.hesapkartId = hesapkartId

    await row.save()
    return row
  } else {
    return await HesapAltKart.create({
      id: Date.now(),
      kod: kod,
      ad: ad,
      hesapkartId: hesapkartId,
    })
  }
}

const delHesapAltKart = async (id) => {
  const row = await HesapAltKart.findByPk(id)
  return row.destroy()
}

module.exports = {
  getHesapAltKartAll,
  getHesapAltKart,
  saveHesapAltKart,
  delHesapAltKart,
  getHesapAltKartAllFieldSearch,
  getHesapAltKartForSelect,
  getHesapAltKartAllAllOrdered,
}
