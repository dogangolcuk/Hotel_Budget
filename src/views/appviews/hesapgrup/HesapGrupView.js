import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const HesapGrupView = () => {
  const [data, setData] = useState([])
  const [hesapSinifSelectData, setHesapSinifSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Hesap Planı -GRUP-',
    apiSearch: '/hesapgrup/search',
    apiOrder: '/hesapgrup/order',
    apiSave: '/hesapgrup',
    apiDelete: '/hesapgrup',
    argSearch: {
      kod: 'text',
      ad: 'text',
      hesapsinifad: 'text',
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
        md: '4',
      },
      ad: {
        model: 'self',
        header: 'Grup Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-4',
        md: '4',
      },
      hesapsinifId: {
        model: 'HesapSinif',
        header: 'Bağlı Hesap Sınıfı (#)',
        fieldEditableName: 'hesapsinifId',
        fieldReadOnlyName: 'hesapsinif.ad',
        fieldType: 'select',
        className: 'col-3',
        options: hesapSinifSelectData,
        md: '4',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/hesapsinif/forselect').then((value) => setHesapSinifSelectData(value))
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

export default HesapGrupView
