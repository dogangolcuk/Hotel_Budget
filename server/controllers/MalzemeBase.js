const { MalzemeBase, Birim, MalzemeBaseGrup } = require('../db/models')
const { Op } = require('sequelize')

const getMalzemeBaseAll = async () => {
  return await MalzemeBase.findAll({
    include: [
      { model: MalzemeBaseGrup, as: 'malzemebasegrup' },
      { model: Birim, as: 'birim' },
    ],
    order: [['id', 'DESC']],
  })
}

const getMalzemeBaseAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'MalzemeBaseGrup':
      ordercontext = [[{ model: MalzemeBaseGrup }, `${field}`, `${ascdesc}`]]
      break
    case 'Birim':
      ordercontext = [[{ model: Birim }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await MalzemeBase.findAll({
    include: [
      { model: MalzemeBaseGrup, as: 'malzemebasegrup' },
      { model: Birim, as: 'birim' },
    ],
    order: ordercontext,
  })
}

const getMalzemeBaseAllFieldSearch = async (searchterms) => {
  const { id, ad, fire_orani, malzemebasegrupad, birimad } = searchterms

  return await MalzemeBase.findAll({
    include: [
      { model: MalzemeBaseGrup, as: 'malzemebasegrup' },
      { model: Birim, as: 'birim' },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { fire_orani: { [Op.eq]: `${fire_orani}` } },
        { '$malzemebasegrup.ad$': { [Op.iLike]: `%${malzemebasegrupad}%` } },
        { '$birim.ad$': { [Op.iLike]: `%${birimad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getMalzemeBase = async (id) => {
  return await MalzemeBase.findByPk(id, {
    include: [{ model: MalzemeBase }, { model: Birim }],
  })
}

const getMalzemeBaseBirim = async (id) => {
  return await MalzemeBase.findByPk(id, {
    attributes: ['ad', 'birim.ad'],
    include: [{ model: Birim, as: 'birim' }],
  })
}

const getMalzemeBaseForSelect = async () => {
  return await MalzemeBase.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveMalzemeBase = async (data) => {
  const { id, ad, fire_orani, birimId, malzemebasegrupId } = data

  if (id && id > 0) {
    const row = await MalzemeBase.findByPk(id)

    row.ad = ad
    row.fire_orani = fire_orani
    row.birimId = birimId
    row.malzemebasegrupId = malzemebasegrupId
    await row.save()
    return row
  } else {
    return await MalzemeBase.create({
      ad: ad,
      fire_orani: fire_orani,
      birimId: birimId,
      malzemebasegrupId: malzemebasegrupId,
    })
  }
}

const delMalzemeBase = async (id) => {
  const row = await MalzemeBase.findByPk(id)
  return row.destroy()
}

module.exports = {
  getMalzemeBaseAll,
  getMalzemeBase,
  saveMalzemeBase,
  delMalzemeBase,
  getMalzemeBaseAllFieldSearch,
  getMalzemeBaseForSelect,
  getMalzemeBaseAllOrdered,
  getMalzemeBaseBirim,
}
