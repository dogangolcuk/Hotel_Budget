const {
  Birim,
  MalzemeBase,
  MalzemeBaseGrup,
  MalzemeFiyat,
  MalzemeFiyatDuzeltme,
  ButcePeriod,
} = require('../db/models')
const { Op } = require('sequelize')

const getMalzemeFiyatAll = async () => {
  return await MalzemeFiyat.findAll({
    include: [
      {
        model: MalzemeFiyatDuzeltme,
        as: 'malzemefiyatduzeltme',
        include: {
          model: ButcePeriod,
          as: 'butceperiod',
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

const getMalzemeFiyatAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'MalzemeBase':
      ordercontext = [[{ model: MalzemeBase }, `${field}`, `${ascdesc}`]]
      break
    case 'MalzemeFiyatDuzeltme':
      ordercontext = [[{ model: MalzemeFiyatDuzeltme }, `${field}`, `${ascdesc}`]]
      break
    case 'ButcePeriod':
      ordercontext = [[{ model: ButcePeriod }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await MalzemeFiyat.findAll({
    include: [
      {
        model: MalzemeFiyatDuzeltme,
        as: 'malzemefiyatduzeltme',
        include: {
          model: ButcePeriod,
          as: 'butceperiod',
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

const getMalzemeFiyatAllFieldSearch = async (searchterms) => {
  const { id, butceperiodad, malzemebasead, birim_fiyat } = searchterms

  return await MalzemeFiyat.findAll({
    include: [
      {
        model: MalzemeFiyatDuzeltme,
        as: 'malzemefiyatduzeltme',
        include: {
          model: ButcePeriod,
          as: 'butceperiod',
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
        {
          '$malzemefiyatduzeltme.butceperiod.ad$': {
            [Op.iLike]: `%${butceperiodad}%`,
          },
        },
        { '$malzemebase.ad$': { [Op.iLike]: `%${malzemebasead}%` } },
        { birim_fiyat: { [Op.eq]: `${birim_fiyat}` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getMalzemeFiyatbyMalzeme = async (id) => {
  return await MalzemeFiyat.findAll({
    where: {
      [Op.and]: [{ malzemebaseId: id }, { malzemefiyatduzeltmeId: null }],
    },

    include: [
      {
        model: MalzemeFiyatDuzeltme,
        as: 'malzemefiyatduzeltme',
        include: {
          model: ButcePeriod,
          as: 'butceperiod',
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
  })
}

const saveMalzemeFiyat = async (data) => {
  const { id, malzemefiyatduzeltmeId, malzemebaseId, birim_fiyat } = data

  if (id && id > 0) {
    const row = await MalzemeFiyat.findByPk(id)
    row.malzemefiyatduzeltmeId = malzemefiyatduzeltmeId
    row.malzemebaseId = malzemebaseId
    row.birim_fiyat = birim_fiyat
    await row.save()
    return row
  } else {
    return await MalzemeFiyat.create({
      malzemefiyatduzeltmeId: malzemefiyatduzeltmeId,
      malzemebaseId: malzemebaseId,
      birim_fiyat: birim_fiyat,
    })
  }
}

const delMalzemeFiyat = async (id) => {
  const row = await MalzemeFiyat.findByPk(id)
  return row.destroy()
}

module.exports = {
  getMalzemeFiyatAll,
  getMalzemeFiyatbyMalzeme,
  saveMalzemeFiyat,
  delMalzemeFiyat,
  getMalzemeFiyatAllFieldSearch,
  getMalzemeFiyatAllOrdered,
}
