const { Tekrar } = require('../db/models')

const getTekrarAll = async () => {
  return await Tekrar.findAll()
}

const getTekrar = async (id) => {
  return await Tekrar.findByPk(id)
}

const getTekrarForSelect = async () => {
  return await Tekrar.findAll({
    attributes: ['id', 'ad'],
    order: [['id', 'DESC']],
  })
}

const saveTekrar = async (data) => {
  const { id, ad, tekrar_gun_sayisi } = data

  if (id && id > 0) {
    const row = await Tekrar.findByPk(id)
    row.ad = ad
    row.tekrar_gun_sayisi = tekrar_gun_sayisi
    await row.save()
    return row
  } else {
    return await Tekrar.create({
      ad: ad,
      tekrar_gun_sayisi: tekrar_gun_sayisi,
    })
  }
}

const delTekrar = async (id) => {
  const row = await Tekrar.findByPk(id)
  return row.destroy()
}

module.exports = {
  getTekrarAll,
  getTekrar,
  saveTekrar,
  delTekrar,
  getTekrarForSelect,
}
