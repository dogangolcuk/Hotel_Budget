const { MalzemeFiyatDuzeltme, ButcePeriod } = require('../db/models')
const { Op } = require('sequelize')

const getMalzemeFiyatDuzeltmeAll = async () => {
  return await MalzemeFiyatDuzeltme.findAll({
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
      },
    ],
    order: [['id', 'DESC']],
  })
}

const getMalzemeFiyatDuzeltmeAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'ButcePeriod':
      ordercontext = [[{ model: ButcePeriod }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await MalzemeFiyatDuzeltme.findAll({
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
      },
    ],
    order: ordercontext,
  })
}

const getMalzemeFiyatDuzeltmeAllFieldSearch = async (searchterms) => {
  const { id, butceperiodad, duzeltme_oran } = searchterms

  return await MalzemeFiyatDuzeltme.findAll({
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
      },
    ],
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { '$butceperiod.ad$': { [Op.iLike]: `%${butceperiodad}%` } },
        { duzeltme_oran: { [Op.eq]: `${duzeltme_oran}` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getMalzemeFiyatDuzeltmebyButcePeriod = async (id) => {
  return await MalzemeFiyatDuzeltme.findAll({
    where: { butceperiodId: id },
    include: [
      {
        model: ButcePeriod,
        as: 'butceperiod',
      },
    ],
  })
}

const getMalzemeFiyatDuzeltmeForSelect = async (butceperiodId) => {
  return await MalzemeFiyatDuzeltme.findAll({
    attributes: ['id', 'duzeltme_oran', ['ad', 'butceperiod.ad']],
    include: [{ model: ButcePeriod, as: 'butceperiod', attributes: ['ad'] }],
    order: [['id', 'DESC']],
  })
}

const saveMalzemeFiyatDuzeltme = async (data) => {
  const { id, butceperiodId, duzeltme_oran } = data

  if (id && id > 0) {
    const row = await MalzemeFiyatDuzeltme.findByPk(id)
    row.butceperiodId = butceperiodId
    row.duzeltme_oran = duzeltme_oran
    await row.save()
    return row
  } else {
    return await MalzemeFiyatDuzeltme.create({
      butceperiodId: butceperiodId,
      duzeltme_oran: duzeltme_oran,
    })
  }
}

const delMalzemeFiyatDuzeltme = async (id) => {
  const row = await MalzemeFiyatDuzeltme.findByPk(id)
  return row.destroy()
}

module.exports = {
  getMalzemeFiyatDuzeltmeAll,
  getMalzemeFiyatDuzeltmebyButcePeriod,
  getMalzemeFiyatDuzeltmeForSelect,
  delMalzemeFiyatDuzeltme,
  getMalzemeFiyatDuzeltmeAllFieldSearch,
  getMalzemeFiyatDuzeltmeAllOrdered,
  saveMalzemeFiyatDuzeltme,
}
