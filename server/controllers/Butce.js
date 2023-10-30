const { Butce } = require('../db/models')
const { Op } = require('sequelize')

const getButceAll = async () => {
  return await Butce.findAll({
    order: [['id', 'DESC']],
  })
}

const getButceAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Butce.findAll({
    order: ordercontext,
  })
}

const getButceAllFieldSearch = async (searchterms) => {
  const { id, ad, yil } = searchterms

  return await Butce.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { yil: { [Op.iLike]: `%${yil}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getButce = async (id) => {
  return await Butce.findByPk(id)
}

const getButceForSelect = async () => {
  return await Butce.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const getButceAllFieldSearchOnay = async (bool) => {
  const { tf } = bool
  return await Butce.findAll({
    where: { onay_durumu: { [Op.eq]: `${tf}` } },
    order: [['id', 'DESC']],
  })
}

const saveButce = async (data) => {
  const { id, ad, yil, onay_durumu, aktif } = data

  if (id && id > 0) {
    const row = await Butce.findByPk(id)
    row.ad = ad
    row.yil = yil
    row.onay_durumu = onay_durumu
    row.aktif = aktif
    await row.save()
    return row
  } else {
    return await Butce.create({
      ad: ad,
      yil: yil,
      onay_durumu: onay_durumu,
      aktif: aktif,
    })
  }
}

const delButce = async (id) => {
  const row = await Butce.findByPk(id)
  return row.destroy()
}

module.exports = {
  getButceAll,
  getButce,
  saveButce,
  delButce,
  getButceAllFieldSearch,
  getButceForSelect,
  getButceAllOrdered,
  getButceAllFieldSearchOnay,
}
