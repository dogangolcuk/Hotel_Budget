import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const MalzemeFiyatDuzeltmeView = () => {
  const [data, setData] = useState([])
  const [butceperiodSelectData, setButcePeriodSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Malzeme Fiyat Ayarlamaları',
    apiSearch: '/malzemefiyatduzeltme/search',
    apiOrder: '/malzemefiyatduzeltme/order',
    apiSave: '/malzemefiyatduzeltme',
    apiDelete: '/malzemefiyatduzeltme',
    argSearch: {
      id: 'number',
      butceperiodad: 'text',
      duzeltme_oran: 'number',
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
      butceperiodId: {
        model: 'ButcePeriod',
        header: 'İlgili Bütçe Periodu',
        fieldEditableName: 'butceperiodId',
        fieldReadOnlyName: 'butceperiod.ad',
        fieldType: 'select',
        className: 'col-6',
        options: butceperiodSelectData,
        md: '5',
      },
      duzeltme_oran: {
        model: 'self',
        header: 'Fiyat Düzeltmesi',
        fieldEditableName: 'duzeltme_oran',
        fieldReadOnlyName: 'duzeltme_oran',
        fieldType: 'inflation',
        className: 'col-3',
        md: '4',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/butceperiod/forselect').then((value) => setButcePeriodSelectData(value))
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

export default MalzemeFiyatDuzeltmeView
