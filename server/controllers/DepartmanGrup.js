const { DepartmanGrup } = require('../db/models')
const { Op } = require('sequelize')

const getDepartmanGrupAll = async () => {
  return await DepartmanGrup.findAll({ order: [['id', 'ASC']] })
}

const getDepartmanGrupAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await DepartmanGrup.findAll({ order: ordercontext })
}

const getDepartmanGrupAllFieldSearch = async (searchterms) => {
  const { id, ad } = searchterms

  return await DepartmanGrup.findAll({
    where: {
      [Op.or]: {
        id: { [Op.eq]: `${id}` },
        ad: { [Op.iLike]: `%${ad}%` },
      },
    },
    order: [['id', 'DESC']],
  })
}

const getDepartmanGrup = async (id) => {
  return await DepartmanGrup.findByPk(id)
}

const getDepartmanGrupForSelect = async () => {
  return await DepartmanGrup.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveDepartmanGrup = async (data) => {
  const { id, ad } = data

  if (id && id > 0) {
    const row = await DepartmanGrup.findByPk(id)
    row.ad = ad
    await row.save()
    return row
  } else {
    return await DepartmanGrup.create({
      ad: ad,
    })
  }
}

const delDepartmanGrup = async (id) => {
  const row = await DepartmanGrup.findByPk(id)
  return row.destroy()
}

module.exports = {
  getDepartmanGrupAll,
  getDepartmanGrup,
  saveDepartmanGrup,
  delDepartmanGrup,
  getDepartmanGrupAllFieldSearch,
  getDepartmanGrupForSelect,
  getDepartmanGrupAllOrdered,
}
