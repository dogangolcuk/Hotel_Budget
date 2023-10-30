import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getSelectOptions, getOrderedDataForTable } from '../../../util'
import { TableCustom } from '../../components'

const YemekMalzemeView = () => {
  const [data, setData] = useState([])
  const [yemekSelectData, setYemekSelectData] = useState([])
  const [malzemebaseSelectData, setMalzemeBaseSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Yemeğin İçeriği',
    apiSearch: '/yemekmalzeme/search',
    apiOrder: '/yemekmalzeme/order',
    apiSave: '/yemekmalzeme',
    apiDelete: '/yemekmalzeme',
    argSearch: {
      id: 'number',
      yemekad: 'text',
      malzemebasead: 'text',
      miktar: 'number',
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
      yemekId: {
        model: 'Yemek',
        header: 'Yemek Adı',
        fieldEditableName: 'yemekId',
        fieldReadOnlyName: 'yemek.ad',
        fieldType: 'select',
        className: 'col-4',
        options: yemekSelectData,
        md: '5',
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
      miktar: {
        model: 'self',
        header: 'Malzeme Miktarı',
        fieldEditableName: 'miktar',
        fieldReadOnlyName: 'miktar',
        fieldType: 'birimmiktar',
        badge: 'malzemebase.birim.ad',
        className: 'col-2',
        md: '4',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/yemek/forselect').then((value) => setYemekSelectData(value))
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

export default YemekMalzemeView
