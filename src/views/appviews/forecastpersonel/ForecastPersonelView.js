import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilBurn } from '@coreui/icons'
import { CAlert, CAlertHeading, CCard, CCardBody, CCardTitle } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions, getSelectOptions3 } from '../../../util'
import { TableCustom } from '../../components'

const ForecastPersonelView = () => {
  const [data, setData] = useState([])
  const [personelSelectData, setPersonelSelectData] = useState([])
  const [butceperiodSelectData, setButcePeriodSelectData] = useState([])
  const [hesapAltKartSelectData, setHesapAltKartSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const [alertVisible, setalertVisible] = useState(true)
  const tableinfo = {
    tablecaption: 'Personel Bölümü Gelir/Gider Beklentileri',
    apiSearch: '/forecastpersonel/search',
    apiOrder: '/forecastpersonel/order',
    apiSave: '/forecastpersonel',
    apiDelete: '/forecastpersonel',
    argSearch: {
      id: 'number',
      ad: 'text',
      personelad: 'text',
      personelsoyad: 'text',
      butceperiodad: 'text',
      hesapaltkartad: 'text',
      gunluk_maliyet: 'number',
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
        className: 'col-2',
        md: '4',
      },
      personelId: {
        model: 'Personel',
        header: 'Personel Adı',
        fieldEditableName: 'personelId',
        fieldReadOnlyName: 'personel.ad',
        fieldType: 'select',
        className: 'col-1',
        options: personelSelectData,
        md: '4',
      },
      personelId2: {
        model: 'Personel',
        header: 'Personel Soyadı',
        fieldEditableName: 'personelId',
        fieldReadOnlyName: 'personel.soyad',
        fieldType: 'select',
        className: 'col-1',
        options: personelSelectData,
        md: '0',
      },
      butceperiodId: {
        model: 'ButcePeriod',
        header: 'Bütçe Period',
        fieldEditableName: 'butceperiodId',
        fieldReadOnlyName: 'butceperiod.ad',
        badge: 'butceperiod.butce.ad',
        fieldType: 'select',
        className: 'col-2 position-relative',
        options: butceperiodSelectData,
        md: '4',
      },
      hesapaltkartId: {
        model: 'HesapAltKart',
        header: 'Kategori',
        fieldEditableName: 'hesapaltkartId',
        fieldReadOnlyName: 'hesapaltkart.ad',
        fieldType: 'select',
        className: 'col-2',
        options: hesapAltKartSelectData,
        md: '8',
      },
      gunluk_maliyet: {
        model: 'self',
        header: 'Günlük Maliyet',
        fieldEditableName: 'gunluk_maliyet',
        fieldReadOnlyName: 'gunluk_maliyet',
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
    //https://www.youtube.com/watch?v=i1ktjumqT64
    const personelPromise = getSelectOptions3('/personel/forselect')
    const butcePeriodPromise = getSelectOptions('/butceperiod/forselect')
    const hesapAltKartPromise = getSelectOptions('/hesapaltkart/forselect')
    //const hesapaltkart = await hesapAltKartPromise

    const [oda, butceperiod, hesapaltkart] = await Promise.all([
      personelPromise,
      butcePeriodPromise,
      hesapAltKartPromise,
    ])

    setPersonelSelectData(oda)
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
    //getSelectOptions('/oda/forselect').then((value) => setOdaSelectData(value))
    //getSelectOptions('/butceperiod/forselect').then((value) => setButcePeriodSelectData(value))
    //getSelectOptions('/hesapaltkart/forselect').then((value) => setHesapAltKartSelectData(value))
  }, [])

  useEffect(() => {
    // getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
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

export default ForecastPersonelView
