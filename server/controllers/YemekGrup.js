const { YemekGrup } = require('../db/models')
const { Op } = require('sequelize')

const getYemekGrupAll = async () => {
  return await YemekGrup.findAll({ order: [['id', 'ASC']] })
}

const getYemekGrupAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await YemekGrup.findAll({ order: ordercontext })
}

const getYemekGrupAllFieldSearch = async (searchterms) => {
  const { id, ad } = searchterms

  return await YemekGrup.findAll({
    where: {
      [Op.or]: {
        id: { [Op.eq]: `${id}` },
        ad: { [Op.iLike]: `%${ad}%` },
      },
    },
    order: [['id', 'DESC']],
  })
}

const getYemekGrup = async (id) => {
  return await YemekGrup.findByPk(id)
}

const getYemekGrupForSelect = async () => {
  return await YemekGrup.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveYemekGrup = async (data) => {
  const { id, ad } = data

  if (id && id > 0) {
    const row = await YemekGrup.findByPk(id)
    row.ad = ad
    await row.save()
    return row
  } else {
    return await YemekGrup.create({
      ad: ad,
    })
  }
}

const delYemekGrup = async (id) => {
  const row = await YemekGrup.findByPk(id)
  return row.destroy()
}

module.exports = {
  getYemekGrupAll,
  getYemekGrup,
  saveYemekGrup,
  delYemekGrup,
  getYemekGrupAllFieldSearch,
  getYemekGrupForSelect,
  getYemekGrupAllOrdered,
}
