const { DovizCinsi } = require('../db/models')

const getDovizCinsiAll = async () => {
  return await DovizCinsi.findAll()
}

const getDovizCinsiForSelect = async () => {
  return await DovizCinsi.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const getDovizCinsi = async (id) => {
  return await DovizCinsi.findByPk(id)
}

const saveDovizCinsi = async (data) => {
  const { id, ad } = data

  if (id && id > 0) {
    const row = await DovizCinsi.findByPk(id)
    row.ad = ad
    await row.save()
    return row
  } else {
    return await DovizCinsi.create({
      ad: ad,
    })
  }
}

const delDovizCinsi = async (id) => {
  const row = await DovizCinsi.findByPk(id)
  return row.destroy()
}

module.exports = {
  getDovizCinsiAll,
  getDovizCinsi,
  saveDovizCinsi,
  delDovizCinsi,
  getDovizCinsiForSelect,
}
