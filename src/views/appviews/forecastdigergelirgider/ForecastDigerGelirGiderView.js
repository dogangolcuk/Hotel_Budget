import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilBurn } from '@coreui/icons'
import { CAlert, CAlertHeading, CCard, CCardBody, CCardTitle } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const ForecastDigerGelirGiderView = () => {
  const [data, setData] = useState([])
  const [departmanSelectData, setDepartmanSelectData] = useState([])
  const [butceperiodSelectData, setButcePeriodSelectData] = useState([])
  const [hesapAltKartSelectData, setHesapAltKartSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const [alertVisible, setalertVisible] = useState(true)
  const tableinfo = {
    tablecaption: 'Diğer Gelir/Gider Beklentileri',
    apiSearch: '/forecastdigergelirgider/search',
    apiOrder: '/forecastdigergelirgider/order',
    apiSave: '/forecastdigergelirgider',
    apiDelete: '/forecastdigergelirgider',
    argSearch: {
      id: 'number',
      ad: 'text',
      departmanad: 'text',
      butceperiodad: 'text',
      hesapaltkartad: 'text',
      gelir_miktar: 'number',
      gider_miktar: 'number',
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
        md: '8',
      },
      departmanId: {
        model: 'Departman',
        header: 'Departman Adı',
        fieldEditableName: 'departmanId',
        fieldReadOnlyName: 'departman.ad',
        fieldType: 'select',
        className: 'col-1',
        options: departmanSelectData,
        md: '4',
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
      gelir_miktar: {
        model: 'self',
        header: 'Beklenen Gelir',
        fieldEditableName: 'gelir_miktar',
        fieldReadOnlyName: 'gelir_miktar',
        fieldType: 'currency',
        className: 'col-1',
        md: '4',
      },
      gider_miktar: {
        model: 'self',
        header: 'Beklenen Gider',
        fieldEditableName: 'gider_miktar',
        fieldReadOnlyName: 'gider_miktar',
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
    const departmanPromise = getSelectOptions('/departman/forselect')
    const butcePeriodPromise = getSelectOptions('/butceperiod/forselect')
    const hesapAltKartPromise = getSelectOptions('/hesapaltkart/forselect')
    //const hesapaltkart = await hesapAltKartPromise

    const [departman, butceperiod, hesapaltkart] = await Promise.all([
      departmanPromise,
      butcePeriodPromise,
      hesapAltKartPromise,
    ])

    setDepartmanSelectData(departman)
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
              Aynı gelir ve gideri başka bölümde girdiyseniz, buraya girmeyin. Diğer kısımların
              haricinde olan gelir ve giderleri buraya giriniz.
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

export default ForecastDigerGelirGiderView
