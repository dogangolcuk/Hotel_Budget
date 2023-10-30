const {
  YemekMalzeme,
  Yemek,
  YemekGrup,
  Birim,
  MalzemeBase,
  MalzemeBaseGrup,
} = require('../db/models')
const { Op } = require('sequelize')

const getYemekMalzemeAll = async () => {
  return await YemekMalzeme.findAll({
    include: [
      {
        model: Yemek,
        as: 'yemek',
        include: {
          model: YemekGrup,
          as: 'yemekgrup',
        },
      },
      {
        model: MalzemeBase,
        as: 'malzemebase',
        include: {
          model: MalzemeBaseGrup,
        },
        include: {
          model: Birim,
          as: 'birim',
        },
      },
    ],
    order: [['id', 'DESC']],
  })
}

const getYemekMalzemeAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Yemek':
      ordercontext = [[{ model: Yemek }, `${field}`, `${ascdesc}`]]
      break
    case 'MalzemeBase':
      ordercontext = [[{ model: MalzemeBase }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await YemekMalzeme.findAll({
    include: [
      {
        model: Yemek,
        as: 'yemek',
        include: {
          model: YemekGrup,
          as: 'yemekgrup',
        },
      },
      {
        model: MalzemeBase,
        as: 'malzemebase',
        include: {
          model: MalzemeBaseGrup,
        },
        include: {
          model: Birim,
          as: 'birim',
        },
      },
    ],
    order: ordercontext,
  })
}

const getYemekMalzemeAllFieldSearch = async (searchterms) => {
  const { id, yemekad, malzemebasead, miktar } = searchterms

  return await YemekMalzeme.findAll({
    include: [
      {
        model: Yemek,
        as: 'yemek',
        include: {
          model: YemekGrup,
          as: 'yemekgrup',
        },
      },
      {
        model: MalzemeBase,
        as: 'malzemebase',
        include: {
          model: MalzemeBaseGrup,
        },
        include: {
          model: Birim,
          as: 'birim',
        },
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { '$yemek.ad$': { [Op.iLike]: `%${yemekad}%` } },
        { '$malzemebase.ad$': { [Op.iLike]: `%${malzemebasead}%` } },
        { miktar: { [Op.eq]: `${miktar}` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getYemekMalzemebyYemek = async (id) => {
  return await YemekMalzeme.findAll({
    where: { yemekId: id },
    include: [
      { model: Yemek, as: 'yemek' },
      {
        model: MalzemeBase,
        as: 'malzemebase',
        include: {
          model: MalzemeBaseGrup,
          as: 'malzemebasegrup',
        },
        include: {
          model: Birim,
          as: 'birim',
        },
      },
    ],
    order: [['id', 'DESC']],
  })
}
const getYemekMalzemebyMalzeme = async (id) => {
  return await YemekMalzeme.findAll({
    where: { malzemebaseId: id },
    include: [
      { model: Yemek },
      {
        model: MalzemeBase,
        include: {
          model: MalzemeBaseGrup,
        },
      },
    ],
  })
}

const saveYemekMalzeme = async (data) => {
  const { id, yemekId, malzemebaseId, miktar } = data

  if (id && id > 0) {
    const row = await YemekMalzeme.findByPk(id)
    row.yemekId = yemekId
    row.malzemebaseId = malzemebaseId
    row.miktar = miktar
    await row.save()
    return row
  } else {
    return await YemekMalzeme.create({
      yemekId: yemekId,
      malzemebaseId: malzemebaseId,
      miktar: miktar,
    })
  }
}

const delYemekMalzeme = async (id) => {
  const row = await YemekMalzeme.findByPk(id)
  return row.destroy()
}

module.exports = {
  getYemekMalzemeAll,
  getYemekMalzemebyMalzeme,
  getYemekMalzemebyYemek,
  saveYemekMalzeme,
  delYemekMalzeme,
  getYemekMalzemeAllFieldSearch,
  getYemekMalzemeAllOrdered,
}
