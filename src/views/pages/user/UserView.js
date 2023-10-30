import React, { useEffect, useState } from 'react'

import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const UserView = () => {
  const [data, setData] = useState([])
  const [tenantSelectData, setTenantSelectData] = useState([])

  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Kullanıcılar',
    apiSearch: '/user/search',
    apiOrder: '/user/order',
    apiSave: '/user',
    apiDelete: '/user',
    argSearch: {
      id: 'number',
      ad: 'text',
      email: 'text',
      //tenantad: 'text',
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
        header: 'Kullanıcı Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '4',
      },
      email: {
        model: 'self',
        header: 'E-Mail',
        fieldEditableName: 'email',
        fieldReadOnlyName: 'email',
        fieldType: 'text',
        className: 'col-2',
        md: '4',
      },
      pwd: {
        model: 'self',
        header: 'Şifre',
        fieldEditableName: 'pwd',
        fieldReadOnlyName: 'pwd',
        fieldType: 'password',
        className: 'col-1',
        md: '4',
      },
      tenantId: {
        model: 'Tenant',
        header: 'Bağlı Otel',
        fieldEditableName: 'tenantId',
        fieldReadOnlyName: 'tenant.ad',
        fieldType: 'select',
        className: 'col-4',
        options: tenantSelectData,
        md: '8',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/tenant/forselect').then((value) => setTenantSelectData(value))
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

export default UserView
