import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable } from '../../../util'
import { TableCustom } from '../../components'

const OdaView = () => {
  const [data, setData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Otel Oda Bilgileri',
    apiSearch: '/oda/search',
    apiOrder: '/oda/order',
    apiSave: '/oda',
    apiDelete: '/oda',
    argSearch: {
      id: 'number',
      ad: 'text',
      tipi: 'text',
      adet: 'number',
      satilabilir_yatak: 'number',
      konum: 'text',
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
        header: 'Oda Tanımı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      tipi: {
        model: 'self',
        header: 'Tipi',
        fieldEditableName: 'tipi',
        fieldReadOnlyName: 'tipi',
        fieldType: 'text',
        className: 'col-2',
        md: '4',
      },
      konum: {
        model: 'self',
        header: 'Oda Konumu',
        fieldEditableName: 'konum',
        fieldReadOnlyName: 'konum',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      adet: {
        model: 'self',
        header: 'Adet',
        fieldEditableName: 'adet',
        fieldReadOnlyName: 'adet',
        fieldType: 'numbernonzero',
        className: 'col-1',
        md: '3',
      },
      satilabilir_yatak: {
        model: 'self',
        header: 'Satılabilir Yatak Adeti',
        fieldEditableName: 'satilabilir_yatak',
        fieldReadOnlyName: 'satilabilir_yatak',
        fieldType: 'number',
        className: 'col-1',
        md: '3',
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

export default OdaView
