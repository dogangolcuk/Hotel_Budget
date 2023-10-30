import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable } from '../../../util'
import { TableCustom } from '../../components'

const ButceView = () => {
  const [data, setData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Bütçe Sayfası',
    apiSearch: '/butce/search',
    apiOrder: '/butce/order',
    apiSave: '/butce',
    apiDelete: '/butce',
    argSearch: {
      id: 'number',
      ad: 'text',
      yil: 'text',
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
      ad: {
        model: 'self',
        header: 'Bütçe Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-4',
        md: '6',
      },
      yil: {
        model: 'self',
        header: 'Bütçe Yılı',
        fieldEditableName: 'yil',
        fieldReadOnlyName: 'yil',
        fieldType: 'textyear',
        className: 'col-3',
        md: '6',
      },
      onay_durumu: {
        model: 'self',
        header: 'Onay Durumu',
        fieldEditableName: 'onay_durumu',
        fieldReadOnlyName: 'onay_durumu',
        fieldType: 'approval',
        className: 'col-1',
        md: '0',
      },
      aktif: {
        model: 'self',
        header: 'Aktif Durumu',
        fieldEditableName: 'aktif',
        fieldReadOnlyName: 'aktif',
        fieldType: 'check',
        className: 'col-1',
        md: '0',
      },
    },
  }

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

export default ButceView
