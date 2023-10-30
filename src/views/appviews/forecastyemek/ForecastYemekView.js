import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilBurn } from '@coreui/icons'
import { CAlert, CAlertHeading, CCard, CCardBody, CCardTitle } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const ForecastYemekView = () => {
  const [data, setData] = useState([])
  const [yemekSelectData, setYemekSelectData] = useState([])
  const [butceperiodSelectData, setButcePeriodSelectData] = useState([])
  const [hesapAltKartSelectData, setHesapAltKartSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const [alertVisible, setalertVisible] = useState(true)
  const tableinfo = {
    tablecaption: 'Yemek Bölümü Gelir/Gider Beklentileri',
    apiSearch: '/forecastyemek/search',
    apiOrder: '/forecastyemek/order',
    apiSave: '/forecastyemek',
    apiDelete: '/forecastyemek',
    argSearch: {
      id: 'number',
      ad: 'text',
      yemekad: 'text',
      butceperiodad: 'text',
      hesapaltkartad: 'text',
      talep_oran: 'number',
      satis_fiyat: 'number',
      maliyet_fiyat: 'number',
      miktar: 'number',
    },
    fields: {
      id: {
        model: 'self',
        header: '#',
        fieldEditableName: 'id',
        fieldReadOnlyName: 'id',
        fieldType: 'unchange',
        className: 'col-1',
        md: '0',
      },
      ad: {
        model: 'self',
        header: 'Açıklama',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-1',
        md: '4',
      },
      yemekId: {
        model: 'Yemek',
        header: 'Yemek Adı',
        fieldEditableName: 'yemekId',
        fieldReadOnlyName: 'yemek.ad',
        fieldType: 'select',
        className: 'col-2',
        options: yemekSelectData,
        md: '4',
      },
      butceperiodId: {
        model: 'ButcePeriod',
        header: 'Bütçe Period',
        fieldEditableName: 'butceperiodId',
        fieldReadOnlyName: 'butceperiod.ad',
        badge: 'butceperiod.butce.ad',
        fieldType: 'select',
        className: 'col-1 position-relative',
        options: butceperiodSelectData,
        md: '4',
      },
      hesapaltkartId: {
        model: 'HesapAltKart',
        header: 'Kategori',
        fieldEditableName: 'hesapaltkartId',
        fieldReadOnlyName: 'hesapaltkart.ad',
        fieldType: 'select',
        className: 'col-1',
        options: hesapAltKartSelectData,
        md: '4',
      },
      talep_oran: {
        model: 'self',
        header: 'Talep Oranı Tahmini',
        fieldEditableName: 'talep_oran',
        fieldReadOnlyName: 'talep_oran',
        fieldType: 'percent',
        className: 'col-1',
        md: '4',
      },
      miktar: {
        model: 'self',
        header: 'Tahmini Miktar',
        fieldEditableName: 'miktar',
        fieldReadOnlyName: 'miktar',
        fieldType: 'yemekmiktar_tavsiyeli',
        badge: 'yemek.birim.ad',
        className: 'col-1',
        md: '4',
      },
      maliyet_fiyat: {
        model: 'self',
        header: 'Birim Maliyet Fiyatı',
        fieldEditableName: 'maliyet_fiyat',
        fieldReadOnlyName: 'maliyet_fiyat',
        fieldType: 'currency_tavsiyeli',
        className: 'col-1',
        md: '4',
      },
      satis_fiyat: {
        model: 'self',
        header: 'Birim Satış Fiyatı',
        fieldEditableName: 'satis_fiyat',
        fieldReadOnlyName: 'satis_fiyat',
        fieldType: 'currency',
        className: 'col-1',
        md: '4',
      },

      aktif: {
        model: 'self',
        header: 'Bütçeye Girme Durumu',
        fieldEditableName: 'aktif',
        fieldReadOnlyName: 'aktif',
        fieldType: 'approval',
        className: 'col-1',
        md: '0',
      },
    },
  }

  const fetchDataForSelect = async () => {
    const yemekPromise = getSelectOptions('/yemek/forselect')
    const butcePeriodPromise = getSelectOptions('/butceperiod/forselect')
    const hesapAltKartPromise = getSelectOptions('/hesapaltkart/forselect')
    const [yemek, butceperiod, hesapaltkart] = await Promise.all([
      yemekPromise,
      butcePeriodPromise,
      hesapAltKartPromise,
    ])

    setYemekSelectData(yemek)
    setButcePeriodSelectData(butceperiod)
    setHesapAltKartSelectData(hesapaltkart)
  }
  const fetchDataForTable = async (apiOrder, orderField) => {
    const tableDataPromise = getOrderedDataForTable(apiOrder, orderField)
    const tableData = await tableDataPromise
    setData(tableData)
  }

  useEffect(() => {
    fetchDataForSelect()
  }, [])

  useEffect(() => {
    fetchDataForTable(tableinfo.apiOrder, orderField)
  }, [orderField, recordDeleted, recordEdited, tableinfo.apiOrder])

  return (
    <>
      <CCard className="mb-3" style={{ display: 'block', height: '700px', overflowY: 'auto' }}>
        <CCardTitle>
          <CAlert
            className="text-center"
            color="danger"
            dismissible
            visible={alertVisible}
            onClose={() => setalertVisible(false)}
          >
            <CAlertHeading tag="h4">
              <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
              Gelir/Giderleri <b>BÜTÇE BAŞLANGICI</b>
              {"'"}nda düşündüğünüz fiyatlara göre giriniz!!!
            </CAlertHeading>
            <p>
              Örneğin; Bütçe başlangıcını Ocak ayını baz alırsanız,Ocak ayının parasal durumuna göre
              100 birim gelir elde etmeyi düşünüyorsanız, Şubat , Mart, Nisan,...Aralık ayları
              içinde 100 birim giriniz.
            </p>
            <hr />
            <p className="mb-0">
              Periot tanımlanırken girdiğiniz fiyat artış oranları otomatik yansıtılacaktır.Örneğin
              Mart ayı için girilen Bütçe Başlangıcı Ocaktan itibaren %10 enflasyon tahmini ile 100
              birim girilen gelir/gider 110 birim olarak dikkate alınacakır.
            </p>
          </CAlert>
        </CCardTitle>
        <CCardBody>
          <TableCustom
            data={data}
            tableinfo={tableinfo}
            setOrderField={setOrderField}
            setData={setData}
            setRecordEdited={setRecordEdited}
            setRecordDeleted={setRecordDeleted}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default ForecastYemekView
