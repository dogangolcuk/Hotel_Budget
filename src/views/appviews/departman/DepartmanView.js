import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const DepartmanView = () => {
  const [data, setData] = useState([])
  const [departmanGrupSelectData, setDepartmanGrupSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Departmanlar',
    apiSearch: '/departman/search',
    apiOrder: '/departman/order',
    apiSave: '/departman',
    apiDelete: '/departman',
    argSearch: {
      id: 'number',
      ad: 'text',
      departmangrupad: 'text',
    },
    fields: {
      id: {
        model: 'self',
        header: '#',
        fieldEditableName: 'id',
        fieldReadOnlyName: 'id',
        fieldType: 'unchange',
        className: 'col-3',
        md: '2',
      },
      ad: {
        model: 'self',
        header: 'Departman Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-4',
        md: '5',
      },
      departmangrupId: {
        model: 'DepartmanGrup',
        header: 'Bağlı Departman',
        fieldEditableName: 'departmangrupId',
        fieldReadOnlyName: 'departmangrup.ad',
        fieldType: 'select',
        className: 'col-4',
        options: departmanGrupSelectData,
        md: '7',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/departmangrup/forselect').then((value) => setDepartmanGrupSelectData(value))
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

export default DepartmanView
