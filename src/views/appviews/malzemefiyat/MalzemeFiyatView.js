import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions, getSelectOptions2 } from '../../../util'
import { TableCustom } from '../../components'

const MalzemeFiyatView = () => {
  const [data, setData] = useState([])
  const [malzemefiyatduzeltmeSelectData, setMalzemeFiyatDuzeltmeSelectData] = useState([])
  const [malzemebaseSelectData, setMalzemeBaseSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Malzeme Fiyatları',
    apiSearch: '/malzemefiyat/search',
    apiOrder: '/malzemefiyat/order',
    apiSave: '/malzemefiyat',
    apiDelete: '/malzemefiyat',
    argSearch: {
      id: 'number',
      butceperiodad: 'text',
      malzemebasead: 'text',
      birim_fiyat: 'number',
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
      malzemebaseId: {
        model: 'MalzemeBase',
        header: 'Malzeme Adı',
        fieldEditableName: 'malzemebaseId',
        fieldReadOnlyName: 'malzemebase.ad',
        fieldType: 'select',
        className: 'col-4',
        options: malzemebaseSelectData,
        md: '3',
      },
      birim_fiyat: {
        model: 'self',
        header: 'Malzeme Birim Fiyatı',
        fieldEditableName: 'birim_fiyat',
        fieldReadOnlyName: 'birim_fiyat',
        fieldType: 'currency',
        className: 'col-2',
        md: '4',
      },
      malzemefiyatduzeltmeId: {
        model: 'MalzemeFiyatDuzeltme',
        header: 'Düzeltme Oranı',
        fieldEditableName: 'malzemefiyatduzeltmeId',
        fieldReadOnlyName: 'malzemefiyatduzeltme.duzeltme_oran',
        badge: 'malzemefiyatduzeltme.butceperiod.ad',
        fieldType: 'select',
        className: 'col-4',
        options: malzemefiyatduzeltmeSelectData,
        md: '5',
      },
    },
  }

  useEffect(() => {
    getSelectOptions2('/malzemefiyatduzeltme/forselect').then((value) =>
      setMalzemeFiyatDuzeltmeSelectData(value),
    )
    getSelectOptions('/malzemebase/forselect').then((value) => setMalzemeBaseSelectData(value))
  }, [])

  useEffect(() => {
    getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
  }, [orderField, recordEdited, recordDeleted, tableinfo.apiOrder])

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

export default MalzemeFiyatView
