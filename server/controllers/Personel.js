const { Personel, Departman } = require('../db/models')
const { Op } = require('sequelize')

const getPersonelAll = async () => {
  return await Personel.findAll({
    include: { model: Departman, as: 'departman' },
    order: [['id', 'DESC']],
  })
}

const getPersonelAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    case 'Departman':
      ordercontext = [[{ model: Departman }, `${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Personel.findAll({
    include: { model: Departman, as: 'departman' },
    order: ordercontext,
  })
}

const getPersonelAllFieldSearch = async (searchterms) => {
  const { id, ad, soyad, gorev_unvan, statu, departmanad } = searchterms

  return await Personel.findAll({
    include: { model: Departman, as: 'departman' },

    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { soyad: { [Op.iLike]: `%${soyad}%` } },
        { gorev_unvan: { [Op.iLike]: `%${gorev_unvan}%` } },
        { statu: { [Op.iLike]: `%${statu}%` } },
        { '$departman.ad$': { [Op.iLike]: `%${departmanad}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getPersonel = async (id) => {
  return await Personel.findByPk(id, {
    include: { model: Departman, as: 'departman' },
  })
}

const getPersonelForSelect = async () => {
  return await Personel.findAll({
    include: { model: Departman, as: 'departman' },
    attributes: ['id', 'ad', 'soyad'],
    order: [['id', 'DESC']],
  })
}

const savePersonel = async (data) => {
  const { id, ad, soyad, gorev_unvan, statu, departmanId } = data

  if (id && id > 0) {
    const row = await Personel.findByPk(id)
    row.ad = ad
    row.soyad = soyad
    row.gorev_unvan = gorev_unvan
    row.statu = statu
    row.departmanId = departmanId
    await row.save()
    return row
  } else {
    return await Personel.create({
      ad: ad,
      soyad: soyad,
      gorev_unvan: gorev_unvan,
      statu: statu,
      departmanId: departmanId,
    })
  }
}

const delPersonel = async (id) => {
  const row = await Personel.findByPk(id)
  return row.destroy()
}

module.exports = {
  getPersonelAll,
  getPersonel,
  savePersonel,
  delPersonel,
  getPersonelAllFieldSearch,
  getPersonelAllOrdered,
  getPersonelForSelect,
}
