const { DovizTarihce, DovizCinsi } = require('../db/models')

const getDovizTarihceAll = async () => {
  return await DovizTarihce.findAll({
    include: {
      model: DovizCinsi,
    },
  })
}

const getDovizTarihce = async (id) => {
  return await DovizTarihce.findByPk(id, {
    include: {
      model: DovizCinsi,
    },
  })
}

const saveDovizTarihce = async (data) => {
  const { id, tarih, alis, satis, efektif_alis, efektif_satis, parite, dovizcinsiId } = data

  if (id && id > 0) {
    const row = await DovizTarihce.findByPk(id)
    row.tarih = tarih
    row.alis = alis
    row.satis = satis
    row.efektif_alis = efektif_alis
    row.efektif_satis = efektif_satis
    row.parite = parite
    row.dovizcinsiId = dovizcinsiId
    await row.save()
    return row
  } else {
    return await DovizTarihce.create({
      tarih: tarih,
      alis: alis,
      satis: satis,
      efektif_alis: efektif_alis,
      efektif_satis: efektif_satis,
      parite: parite,
      dovizcinsiId: dovizcinsiId,
    })
  }
}

const delDovizTarihce = async (id) => {
  const row = await DovizTarihce.findByPk(id)
  return row.destroy()
}

module.exports = {
  getDovizTarihceAll,
  getDovizTarihce,
  saveDovizTarihce,
  delDovizTarihce,
}
