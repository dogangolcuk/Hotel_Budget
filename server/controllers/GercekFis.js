const { GercekFis, ButceFisi } = require('../db/models')

const getGercekFisAll = async () => {
  return await GercekFis.findAll({
    include: { model: ButceFisi },
  })
}

const getGercekFis = async (id) => {
  return await GercekFis.findByPk(id, {
    include: { model: ButceFisi },
  })
}

const saveGercekFis = async (data) => {
  const {
    id,
    ad,
    no,
    gelirmi,
    aciklama,
    gerceklenen_borc,
    gerceklenen_alacak,
    doviz_kur,
    gerceklenen_doviz_borc,
    gerceklenen_doviz_alacak,
    olusturma_tarihi,
    guncelleme_tarihi,
    butcefisiId,
  } = data

  if (id && id > 0) {
    const row = await GercekFis.findByPk(id)

    row.ad = ad
    row.no = no
    row.gelirmi = gelirmi
    row.aciklama = aciklama
    row.gerceklenen_borc = gerceklenen_borc
    row.gerceklenen_alacak = gerceklenen_alacak
    row.doviz_kur = doviz_kur
    row.gerceklenen_doviz_borc = gerceklenen_doviz_borc
    row.gerceklenen_doviz_alacak = gerceklenen_doviz_alacak
    row.olusturma_tarihi = olusturma_tarihi
    row.guncelleme_tarihi = guncelleme_tarihi
    row.butcefisiId = butcefisiId

    await row.save()
    return row
  } else {
    return await GercekFis.create({
      ad: ad,
      no: no,
      gelirmi: gelirmi,
      aciklama: aciklama,
      gerceklenen_borc: gerceklenen_borc,
      gerceklenen_alacak: gerceklenen_alacak,
      doviz_kur: doviz_kur,
      gerceklenen_doviz_borc: gerceklenen_doviz_borc,
      gerceklenen_doviz_alacak: gerceklenen_doviz_alacak,
      olusturma_tarihi: olusturma_tarihi,
      guncelleme_tarihi: guncelleme_tarihi,
      butcefisiId: butcefisiId,
    })
  }
}

const delGercekFis = async (id) => {
  const row = await GercekFis.findByPk(id)
  return row.destroy()
}

module.exports = {
  getGercekFisAll,
  getGercekFis,
  saveGercekFis,
  delGercekFis,
}
