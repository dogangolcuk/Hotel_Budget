import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const HesapAnaHesapView = () => {
  const [data, setData] = useState([])
  const [hesapGrupSelectData, setHesapGrupSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Hesap Planı -ANA HESAP-',
    apiSearch: '/hesapanahesap/search',
    apiOrder: '/hesapanahesap/order',
    apiSave: '/hesapanahesap',
    apiDelete: '/hesapanahesap',
    argSearch: {
      kod: 'text',
      ad: 'text',
      hesapgrupad: 'text',
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
        header: 'AnaHesap Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      hesapgrupId: {
        model: 'HesapGrup',
        header: 'Bağlı Grup (##)',
        fieldEditableName: 'hesapgrupId',
        fieldReadOnlyName: 'hesapgrup.ad',
        fieldType: 'select',
        className: 'col-4',
        options: hesapGrupSelectData,
        md: '5',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/hesapgrup/forselect').then((value) => setHesapGrupSelectData(value))
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

export default HesapAnaHesapView
