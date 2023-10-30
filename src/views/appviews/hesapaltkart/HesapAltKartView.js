import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CContainer } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const HesapAltKartView = () => {
  const [data, setData] = useState([])
  const [hesapKartSelectData, setHesapKartSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Gelir / Gider Kartları (Kategorileri)',
    apiSearch: '/hesapaltkart/search',
    apiOrder: '/hesapaltkart/order',
    apiSave: '/hesapaltkart',
    apiDelete: '/hesapaltkart',
    argSearch: {
      kod: 'text',
      ad: 'text',
      hesapkartad: 'text',
    },
    fields: {
      id: {
        model: 'self',
        header: '#',
        fieldEditableName: 'id',
        fieldReadOnlyName: 'id',
        fieldType: 'unchange',
        className: 'col-2',
        md: '0',
      },
      kod: {
        model: 'self',
        header: 'Hesap Kodu',
        fieldEditableName: 'kod',
        fieldReadOnlyName: 'kod',
        fieldType: 'hesapkod',
        className: 'col-2',
        md: '3',
      },
      ad: {
        model: 'self',
        header: 'Kategori',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      hesapkartId: {
        model: 'HesapKart',
        header: 'Bağlı Kart([###][XX][YY])',
        fieldEditableName: 'hesapkartId',
        fieldReadOnlyName: 'hesapkart.ad',
        fieldType: 'select',
        className: 'col-4',
        options: hesapKartSelectData,
        md: '5',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/hesapkart/forselect').then((value) => setHesapKartSelectData(value))
  }, [])

  useEffect(() => {
    getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
  }, [orderField, recordDeleted, recordEdited, tableinfo.apiOrder])

  return (
    <>
      <CCard className="mb-3" style={{ display: 'block', height: '700px', overflowY: 'auto' }}>
        <CCardBody>
          {/* <div className="mb-3" style={{ display: 'block', height: '700px', overflowY: 'auto' }}> */}
          <TableCustom
            data={data}
            tableinfo={tableinfo}
            setOrderField={setOrderField}
            setData={setData}
            setRecordEdited={setRecordEdited}
            setRecordDeleted={setRecordDeleted}
          />
          {/* </div> */}
        </CCardBody>
      </CCard>
    </>
  )
}

export default HesapAltKartView
