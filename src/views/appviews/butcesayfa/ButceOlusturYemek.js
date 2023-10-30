import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { currencyFormat, getDataByRoute2 } from '../../../util'
import stc from 'string-to-color'

const ButceOlusturYemek = () => {
  const [data, setData] = useState([])
  const [kumuletifGelir, setKumuletifGelir] = useState(0)
  const [kumuletifGider, setKumuletifGider] = useState(0)
  const [kumuletifBalance, setKumuletifBalance] = useState(0)
  const [aktifBütce, setaktifBütce] = useState([])

  const Hesapla = () => {
    getDataByRoute2('/forecastyemek')
      .then((result) => {
        let kum_gelir = 0
        let kum_gider = 0
        let kum_balance = 0
        let butceler = new Set()
        const butce_data = result.data.map((row) => {
          if (
            row !== undefined &&
            row !== null &&
            row.aktif &&
            row.yemek &&
            row.hesapaltkart &&
            row.butceperiod
          ) {
            let gelir = row.talep_oran * row.satis_fiyat * row.miktar
            let enflasyon_düzeltmesi_gelir = gelir * row.butceperiod.tahmini_enflasyon
            let gider = row.talep_oran * row.maliyet_fiyat * row.miktar
            let enflasyon_düzeltmesi_gider = gider * row.butceperiod.tahmini_enflasyon
            let duzeltilmis_gelir = gelir + enflasyon_düzeltmesi_gelir
            let duzeltilmis_gider = gider + enflasyon_düzeltmesi_gider

            kum_gelir = kum_gelir + duzeltilmis_gelir
            kum_gider = kum_gider + duzeltilmis_gider
            kum_balance = kum_balance + duzeltilmis_gelir - duzeltilmis_gider

            butceler.add(' <' + row.butceperiod.butce.ad + '>')
            return {
              ad: 'YEMEK#' + row.id + '#' + row.ad,
              kategori: row.hesapaltkart.ad,
              toplam_gelir: currencyFormat(duzeltilmis_gelir),
              toplam_gider: currencyFormat(duzeltilmis_gider),
              balans: duzeltilmis_gelir - duzeltilmis_gider,
              ekle: true,
            }
          } else {
            return { ekle: false }
          }
        })
        setaktifBütce(butceler)
        setKumuletifGelir(kum_gelir)
        setKumuletifGider(kum_gider)
        setKumuletifBalance(kum_balance)
        setData(butce_data)
      })
      .catch((error) => {})
  }

  useEffect(() => {
    Hesapla()
  }, [])

  const ReadOnlyRow = (rowData) => {
    if (rowData.ekle) {
      return (
        <CTableRow className="">
          <CTableDataCell className="col-3">{rowData.ad}</CTableDataCell>
          <CTableDataCell className="col-3">{rowData.kategori}</CTableDataCell>
          <CTableDataCell className="col-2">{rowData.toplam_gelir}</CTableDataCell>
          <CTableDataCell className="col-2">{rowData.toplam_gider}</CTableDataCell>
          <CTableDataCell className="col-2" color={rowData.balans <= 0 ? 'danger' : 'info'}>
            {currencyFormat(rowData.balans)}
          </CTableDataCell>
        </CTableRow>
      )
    }
  }
  return (
    <>
      {/* <CCard className="mb-3" style={{ display: 'block', height: 'auto', overflowY: 'auto' }}>
        <CCardBody> */}
      <CTable
        color="white"
        hover
        small
        // bordered
        responsive="sm"
        align="middle"
        caption="top"
        className="text-wrap mb-3"
      >
        <CTableCaption>
          <b style={{ color: stc('Yemek Kısmı Bütçesi') }}>Yemek Kısmı Bütçesi</b>{' '}
          <span style={{ textDecoration: 'underline' }}> Gösterilen Bütçeler </span>
          {aktifBütce.map((item) => {
            // eslint-disable-next-line react/jsx-key
            return <b style={{ color: stc(item) }}>{item}</b>
          })}
        </CTableCaption>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="col-3">#</CTableHeaderCell>
            <CTableHeaderCell className="col-3">KATEGORİ</CTableHeaderCell>
            <CTableHeaderCell className="col-2">TOPLAM GELİR</CTableHeaderCell>
            <CTableHeaderCell className="col-2">TOPLAM GİDER</CTableHeaderCell>
            <CTableHeaderCell className="col-2">FARK</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {data?.map((rowData) => (
            <>{ReadOnlyRow(rowData)}</>
          ))}
          <CTableRow>
            <CTableDataCell className="col-3"></CTableDataCell>
            <CTableDataCell className="col-3"></CTableDataCell>
            <CTableDataCell className="col-2">{currencyFormat(kumuletifGelir)}</CTableDataCell>
            <CTableDataCell className="col-2">{currencyFormat(kumuletifGider)}</CTableDataCell>
            <CTableDataCell
              className="col-2"
              style={{
                fontSize: '22px',
                color: kumuletifBalance <= 0 ? 'red' : 'blue',
              }}
              color={kumuletifBalance <= 0 ? 'danger' : 'info'}
            >
              {currencyFormat(kumuletifBalance)}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      {/* </CCardBody>
      </CCard> */}
    </>
  )
}

export default ButceOlusturYemek
