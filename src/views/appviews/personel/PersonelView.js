import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const PersonelView = () => {
  const [data, setData] = useState([])
  const [departmanSelectData, setDepartmanSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Personel Bilgileri',
    apiSearch: '/personel/search',
    apiOrder: '/personel/order',
    apiSave: '/personel',
    apiDelete: '/personel',
    argSearch: {
      id: 'number',
      ad: 'text',
      soyad: 'text',
      gorev_unvan: 'text',
      statu: 'text',
      departmanad: 'text',
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
        header: 'Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-2',
        md: '3',
      },
      soyad: {
        model: 'self',
        header: 'Soyadı',
        fieldEditableName: 'soyad',
        fieldReadOnlyName: 'soyad',
        fieldType: 'text',
        className: 'col-2',
        md: '3',
      },
      gorev_unvan: {
        model: 'self',
        header: 'Görev Ünvanı',
        fieldEditableName: 'gorev_unvan',
        fieldReadOnlyName: 'gorev_unvan',
        fieldType: 'text',
        className: 'col-2',
        md: '3',
      },
      statu: {
        model: 'self',
        header: 'Statü',
        fieldEditableName: 'statu',
        fieldReadOnlyName: 'statu',
        fieldType: 'text',
        className: 'col-2',
        md: '3',
      },
      departmanId: {
        model: 'Departman',
        header: 'Bağlı Departman',
        fieldEditableName: 'departmanId',
        fieldReadOnlyName: 'departman.ad',
        fieldType: 'select',
        className: 'col-2',
        options: departmanSelectData,
        md: '5',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/departman/forselect').then((value) => setDepartmanSelectData(value))
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

export default PersonelView
