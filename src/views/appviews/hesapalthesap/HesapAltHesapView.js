import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const HesapAltHesapView = () => {
  const [data, setData] = useState([])
  const [hesapAnaHesapSelectData, setHesapAnaHesapSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Hesap Planı -ALT HESAP-',
    apiSearch: '/hesapalthesap/search',
    apiOrder: '/hesapalthesap/order',
    apiSave: '/hesapalthesap',
    apiDelete: '/hesapalthesap',
    argSearch: {
      kod: 'text',
      ad: 'text',
      hesapanahesapad: 'text',
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
        header: 'AltHesap Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      hesapanahesapId: {
        model: 'HesapAnaHesap',
        header: 'Bağlı Ana Hesap (###)',
        fieldEditableName: 'hesapanahesapId',
        fieldReadOnlyName: 'hesapanahesap.ad',
        fieldType: 'select',
        className: 'col-4',
        options: hesapAnaHesapSelectData,
        md: '5',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/hesapanahesap/forselect').then((value) => setHesapAnaHesapSelectData(value))
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

export default HesapAltHesapView
