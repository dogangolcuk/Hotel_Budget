const { rawdb } = require('../db/models')

const getYemekMalzemeDistinct = async (id, _tenant_id) => {
  let list_malzeme = await rawdb.query(
    'SELECT * FROM view_yemek_icerik_distinct WHERE yemek_id =:id and tenant_id=:_tenant_id',
    {
      replacements: { id: id, _tenant_id: _tenant_id },
      type: rawdb.QueryTypes.SELECT,
    },
  )

  return list_malzeme
}

const getYemekMalzemeMaliyet = async (_yemek_id, _butceperiod_id, _tenant_id) => {
  try {
    const response = []
    const malzeme_with_duzeltme = []
    const malzeme_with_duzeltmesiz = []
    let list_malzeme = await rawdb.query(
      'SELECT malzemebase_id FROM view_yemek_icerik_distinct WHERE yemek_id =:_yemek_id and tenant_id=:_tenant_id',
      {
        replacements: { _yemek_id: _yemek_id, _tenant_id: _tenant_id },
        type: rawdb.QueryTypes.SELECT,
      },
    )

    let result_duzeltmeli = await Promise.all(
      list_malzeme.map(async (malzeme) => {
        let recs = Promise.all(
          await rawdb.query(
            'SELECT * FROM view_yemek_icerik_maliyet WHERE yemek_id =:_yemek_id and malzemebase_id=:_malzemebase_id  and butce_periodid=:_butceperiod_id and tenant_id=:_tenant_id',
            {
              replacements: {
                _yemek_id: _yemek_id,
                _malzemebase_id: malzeme['malzemebase_id'],
                _butceperiod_id: _butceperiod_id,
                _tenant_id: _tenant_id,
              },
              type: rawdb.QueryTypes.SELECT,
            },
          ),
        ).then((value) => {
          if (value[0]) {
            malzeme_with_duzeltme.push(value[0]['malzemebase_id'])
          } else {
            malzeme_with_duzeltmesiz.push(malzeme['malzemebase_id'])
          }

          return value
        })
        return recs
      }),
    )

    let result_duzeltmesiz = await Promise.all(
      malzeme_with_duzeltmesiz.map(async (malzeme) => {
        let recs = Promise.all(
          await rawdb.query(
            'SELECT * FROM view_yemek_icerik_maliyet WHERE yemek_id =:_yemek_id and malzemebase_id=:_malzemebase_id  and butce_periodid=:_butceperiod_id and tenant_id=:_tenant_id',
            {
              replacements: {
                _yemek_id: _yemek_id,
                _malzemebase_id: malzeme,
                _butceperiod_id: 0,
                _tenant_id: _tenant_id,
              },
              type: rawdb.QueryTypes.SELECT,
            },
          ),
        ).then((value) => {
          return value
        })
        return recs
      }),
    )

    result_duzeltmeli.forEach((element) => {
      if (element.length > 0) {
        response.push(element[0])
      }
    })

    result_duzeltmesiz.forEach((element) => {
      if (element.length > 0) {
        response.push(element[0])
      }
    })

    return response
  } catch (error) {}
}

const getYemekMaliyet = async (_yemek_id, _butceperiod_id, _tenant_id) => {
  let son_fiyat = 0
  const yemekMalzemeMaliyetPromise = getYemekMalzemeMaliyet(_yemek_id, _butceperiod_id, _tenant_id)
  const yemekMalzemeMaliyet = await yemekMalzemeMaliyetPromise
  yemekMalzemeMaliyet.forEach((element) => {
    son_fiyat = son_fiyat + parseFloat(element['malzeme_maliyet'])
  })
  return son_fiyat.toString()
}

const getTahminiMusteriSayisi = async (_butceperiod_id, _tenant_id) => {
  const tahmini_miktarPromise = await rawdb
    .query(
      'SELECT * FROM view_tahmini_musteri_sayisi_3 WHERE butceperiod_id=:_butceperiod_id and tenant_id=:_tenant_id',
      {
        replacements: {
          _butceperiod_id: _butceperiod_id,
          _tenant_id: _tenant_id,
        },
        type: rawdb.QueryTypes.SELECT,
      },
    )
    .then((value) => {
      return value
    })

  if (tahmini_miktarPromise.length > 0) {
    return tahmini_miktarPromise
  } else {
    return [
      {
        butceperiod_id: '0',
        musteri_sayisi: '0',
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getOdaSayisi = async (_tenant_id) => {
  const oda_sayisiPromise = await rawdb
    .query('SELECT * FROM view_oda_sayisi WHERE tenant_id=:_tenant_id', {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    })
    .then((value) => {
      return value
    })
  if (oda_sayisiPromise.length > 0) {
    return oda_sayisiPromise
  } else {
    return [
      {
        oda_sayisi: '0',
        sat_yat_sayisi: '0',
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getGecelemeSayisi = async (_tenant_id) => {
  const geceleme_sayisiPromise = await rawdb.query(
    'select * from view_tahmini_geceleme_3 vtg WHERE tenant_id=:_tenant_id ',
    {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    },
  )
  if (geceleme_sayisiPromise.length > 0) {
    return geceleme_sayisiPromise
  } else {
    return [
      {
        butce_ad: 'Veri Yok',
        toplam_geceleme: 0,
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getTumGelirGider = async (_tenant_id) => {
  const dataPromise = await rawdb.query(
    'select * from view_tum_gelir_gider_5 vtgg WHERE tenant_id=:_tenant_id order by ad',
    {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    },
  )
  if (dataPromise.length > 0) {
    return dataPromise
  } else {
    return [
      {
        ad: 'Veri Yok',
        toplam_gelir: 0,
        toplam_gider: 0,
        toplam_fark: 0,
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getPersonelSayisi = async (_tenant_id) => {
  const dataPromise = await rawdb.query(
    'select * from view_personel_sayisi WHERE tenant_id=:_tenant_id',
    {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    },
  )
  if (dataPromise.length > 0) {
    return dataPromise
  } else {
    return [
      {
        count: '0',
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getGecelemeMusteriSayisi = async (_tenant_id) => {
  const dataPromise = await rawdb.query(
    'select * from view_tahmini_musteri_geceleme_sayisi_1 WHERE tenant_id=:_tenant_id',
    {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    },
  )
  if (dataPromise.length > 0) {
    return dataPromise
  } else {
    return [
      {
        butce_ad: 'Veri Yok',
        toplam_geceleme: 0,
        musteri_sayisi: 0,
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getKategoriGelirGider = async (_tenant_id) => {
  const dataPromise = await rawdb.query(
    'select * from view_forecast_union_3 WHERE tenant_id=:_tenant_id',
    {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    },
  )
  if (dataPromise.length > 0) {
    return dataPromise
  } else {
    return [
      {
        bütçe_kısmı: 'Veri Yok',
        kategori: 'Veri Yok',
        alt_kategori: 'Veri Yok ',
        bütçe_periodu: 'Veri Yok',
        gelir: '0',
        gider: '0',
        fark: '0',
        tenant_id: _tenant_id,
      },
    ]
  }
}

const getTumGelirGiderNumber = async (_tenant_id) => {
  const dataPromise = await rawdb.query(
    'select * from view_tum_gelir_gider_2 WHERE tenant_id=:_tenant_id',
    {
      type: rawdb.QueryTypes.SELECT,
      replacements: {
        _tenant_id: _tenant_id,
      },
    },
  )
  if (dataPromise.length > 0) {
    return dataPromise
  } else {
    return [
      {
        toplam_gelir: '0',
        toplam_gider: '0',
        toplam_fark: '0',
        tenant_id: _tenant_id,
      },
    ]
  }
}

module.exports = {
  getYemekMalzemeDistinct,
  getYemekMalzemeMaliyet,
  getYemekMaliyet,
  getTahminiMusteriSayisi,
  getOdaSayisi,
  getGecelemeSayisi,
  getTumGelirGider,
  getPersonelSayisi,
  getGecelemeMusteriSayisi,
  getKategoriGelirGider,
  getTumGelirGiderNumber,
}
