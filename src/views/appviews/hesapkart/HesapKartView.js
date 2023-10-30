import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const HesapKartView = () => {
  const [data, setData] = useState([])
  const [hesapAltHesapSelectData, setHesapAltHesapSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Gelir / Gider Kartları',
    apiSearch: '/hesapkart/search',
    apiOrder: '/hesapkart/order',
    apiSave: '/hesapkart',
    apiDelete: '/hesapkart',
    argSearch: {
      kod: 'text',
      ad: 'text',
      hesapalthesapad: 'text',
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
        header: 'Kart Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      hesapalthesapId: {
        model: 'HesapAltHesap',
        header: 'Bağlı Alt Hesap ([###][XX])',
        fieldEditableName: 'hesapalthesapId',
        fieldReadOnlyName: 'hesapalthesap.ad',
        fieldType: 'select',
        className: 'col-4',
        options: hesapAltHesapSelectData,
        md: '5',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/hesapalthesap/forselect').then((value) => setHesapAltHesapSelectData(value))
  }, [])

  useEffect(() => {
    getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
  }, [orderField, recordDeleted, recordEdited, tableinfo.apiOrder])

  return (
    <>
      <CCard className="mb-3" style={{ display: 'block', height: '700px', overflowY: 'auto' }}>
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

export default HesapKartView
