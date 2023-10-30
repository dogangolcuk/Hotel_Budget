const { Departman, DepartmanGrup } = require('../db/models')
const { Op } = require('sequelize')

const getDepartmanAll = async () => {
  return await Departman.findAll({
    include: {
      model: DepartmanGrup,
      as: 'departmangrup',
    },
    order: [['id', 'DESC']],
  })
}

const getDepartmanAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Departman.findAll({
    include: {
      model: DepartmanGrup,
      as: 'departmangrup',
    },
    order: ordercontext,
  })
}

const getDepartmanAllFieldSearch = async (searchterms) => {
  const { id, ad, departmangrupad } = searchterms

  return await Departman.findAll({
    include: {
      model: DepartmanGrup,
      as: 'departmangrup',
    },
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { '$departmangrup.ad$': { [Op.iLike]: `%${departmangrupad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getDepartmanForSelect = async () => {
  return await Departman.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const getDepartman = async (id) => {
  return await Departman.findByPk(id, {
    include: {
      model: DepartmanGrup,
      as: 'departmangrup',
    },
  })
}

const saveDepartman = async (data) => {
  const { id, ad, departmangrupId } = data

  if (id && id > 0) {
    const row = await Departman.findByPk(id)
    row.ad = ad
    row.departmangrupId = departmangrupId
    await row.save()
    return row
  } else {
    return await Departman.create({
      ad: ad,
      departmangrupId: departmangrupId,
    })
  }
}

const delDepartman = async (id) => {
  const row = await Departman.findByPk(id)
  return row.destroy()
}

module.exports = {
  getDepartmanAll,
  getDepartman,
  saveDepartman,
  delDepartman,
  getDepartmanAllFieldSearch,
  getDepartmanForSelect,
  getDepartmanAllOrdered,
}
