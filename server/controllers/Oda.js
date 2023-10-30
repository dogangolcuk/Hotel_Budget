const { Oda } = require('../db/models')
const { Op } = require('sequelize')

const getOdaAll = async () => {
  return await Oda.findAll({
    order: [['id', 'DESC']],
  })
}

const getOdaAllOrdered = async (orderby) => {
  const { model, field, ascdesc } = orderby
  let ordercontext = null
  switch (model) {
    case 'self':
      ordercontext = [[`${field}`, `${ascdesc}`]]
      break
    default:
      break
  }
  return await Oda.findAll({
    order: ordercontext,
  })
}

const getOdaAllFieldSearch = async (searchterms) => {
  const { id, ad, tipi, adet, satilabilir_yatak, konum } = searchterms

  return await Oda.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.eq]: `${id}` } },
        { ad: { [Op.iLike]: `%${ad}%` } },
        { tipi: { [Op.iLike]: `%${tipi}%` } },
        { adet: { [Op.eq]: `${adet}` } },
        { satilabilir_yatak: { [Op.eq]: `${satilabilir_yatak}` } },
        { konum: { [Op.iLike]: `%${konum}%` } },
      ],
    },
    order: [['id', 'DESC']],
  })
}

const getOda = async (id) => {
  return await Oda.findByPk(id)
}

const getOdaForSelect = async () => {
  return await Oda.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveOda = async (data) => {
  const { id, ad, tipi, adet, satilabilir_yatak, konum } = data

  if (id && id > 0) {
    const row = await Oda.findByPk(id)

    row.ad = ad
    row.tipi = tipi
    row.adet = adet
    row.satilabilir_yatak = satilabilir_yatak
    row.konum = konum
    await row.save()
    return row
  } else {
    return await Oda.create({
      ad: ad,
      tipi: tipi,
      adet: adet,
      satilabilir_yatak: satilabilir_yatak,
      konum: konum,
    })
  }
}

const delOda = async (id) => {
  const row = await Oda.findByPk(id)
  return row.destroy()
}

module.exports = {
  getOdaAll,
  getOda,
  saveOda,
  delOda,
  getOdaAllFieldSearch,
  getOdaForSelect,
  getOdaAllOrdered,
}
