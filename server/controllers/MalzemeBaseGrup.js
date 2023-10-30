const { MalzemeBaseGrup } = require('../db/models')
const { Op } = require('sequelize')

const getMalzemeBaseGrupAll = async () => {
  return await MalzemeBaseGrup.findAll({ order: [['id', 'ASC']] })
}

const getMalzemeBaseGrupAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await MalzemeBaseGrup.findAll({ order: ordercontext })
}

const getMalzemeBaseGrupAllFieldSearch = async (searchterms) => {
  const { id, ad } = searchterms

  return await MalzemeBaseGrup.findAll({
    where: {
      [Op.or]: {
        id: { [Op.eq]: `${id}` },
        ad: { [Op.iLike]: `%${ad}%` },
      },
    },
    order: [['id', 'DESC']],
  })
}

const getMalzemeBaseGrup = async (id) => {
  return await MalzemeBaseGrup.findByPk(id)
}

const getMalzemeBaseGrupForSelect = async () => {
  return await MalzemeBaseGrup.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveMalzemeBaseGrup = async (data) => {
  const { id, ad } = data

  if (id && id > 0) {
    const row = await MalzemeBaseGrup.findByPk(id)
    row.ad = ad
    await row.save()
    return row
  } else {
    return await MalzemeBaseGrup.create({
      ad: ad,
    })
  }
}

const delMalzemeBaseGrup = async (id) => {
  const row = await MalzemeBaseGrup.findByPk(id)
  return row.destroy()
}

module.exports = {
  getMalzemeBaseGrupAll,
  getMalzemeBaseGrup,
  saveMalzemeBaseGrup,
  delMalzemeBaseGrup,
  getMalzemeBaseGrupAllFieldSearch,
  getMalzemeBaseGrupForSelect,
  getMalzemeBaseGrupAllOrdered,
}
