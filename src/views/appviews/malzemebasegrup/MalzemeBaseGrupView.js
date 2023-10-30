import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable } from '../../../util'
import { TableCustom } from '../../components'

const MalzemeBaseGrupView = () => {
  const [data, setData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Yemek Malzemesi Kategorileri',
    apiSearch: '/malzemebasegrup/search',
    apiOrder: '/malzemebasegrup/order',
    apiSave: '/malzemebasegrup',
    apiDelete: '/malzemebasegrup',
    argSearch: {
      id: 'number',
      ad: 'text',
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
        header: 'Kategori Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-9',
        md: '12',
      },
    },
  }

  useEffect(() => {
    getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
  }, [orderField, recordDeleted, recordEdited, tableinfo.apiOrder])

  return (
    <>
      <CCard
        className="mb-3"
        style={{
          display: 'block',
          height: '700px',
          overflowY: 'auto',
        }}
      >
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

export default MalzemeBaseGrupView
