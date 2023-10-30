const { Birim } = require('../db/models')
const { Op } = require('sequelize')

const getBirimAll = async () => {
  return await Birim.findAll({ order: [['id', 'DESC']] })
}

const getBirimAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Birim.findAll({ order: ordercontext })
}

const getBirimAllFieldSearch = async (searchterms) => {
  const { id, ad } = searchterms

  return await Birim.findAll({
    where: {
      [Op.or]: {
        id: { [Op.eq]: `${id}` },
        ad: { [Op.iLike]: `%${ad}%` },
      },
    },
    order: [['id', 'DESC']],
  })
}

const getBirim = async (id) => {
  return await Birim.findByPk(id)
}

const getBirimForSelect = async () => {
  return await Birim.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveBirim = async (data) => {
  const { id, ad } = data

  if (id && id > 0) {
    const row = await Birim.findByPk(id)
    row.ad = ad
    await row.save()
    return row
  } else {
    return await Birim.create({
      ad: ad,
    })
  }
}

const delBirim = async (id) => {
  const row = await Birim.findByPk(id)
  return row.destroy()
}

module.exports = {
  getBirimAll,
  getBirim,
  saveBirim,
  delBirim,
  getBirimAllFieldSearch,
  getBirimForSelect,
  getBirimAllOrdered,
}
