import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const MalzemeBaseView = () => {
  const [data, setData] = useState([])
  const [malzemeBaseGrupSelectData, setMalzemeBaseGrupSelectData] = useState([])
  const [birimSelectData, setBirimSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Yemek Malzemeleri',
    apiSearch: '/malzemebase/search',
    apiOrder: '/malzemebase/order',
    apiSave: '/malzemebase',
    apiDelete: '/malzemebase',
    argSearch: {
      id: 'number',
      ad: 'text',
      fire_orani: 'number',
      malzemebasegrupad: 'text',
      birimad: 'text',
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
        header: 'Malzeme Adı',
        fieldEditableName: 'ad',
        fieldReadOnlyName: 'ad',
        fieldType: 'text',
        className: 'col-3',
        md: '5',
      },
      birimId: {
        model: 'Birim',
        header: 'Birim Cinsi',
        fieldEditableName: 'birimId',
        fieldReadOnlyName: 'birim.ad',
        fieldType: 'select',
        className: 'col-2',
        options: birimSelectData,
        md: '3',
      },
      malzemebasegrupId: {
        model: 'MalzemeBaseGrup',
        header: 'Bağlı Kategori',
        fieldEditableName: 'malzemebasegrupId',
        fieldReadOnlyName: 'malzemebasegrup.ad',
        fieldType: 'select',
        className: 'col-2',
        options: malzemeBaseGrupSelectData,
        md: '4',
      },
      fire_orani: {
        model: 'self',
        header: 'Fire Oranı',
        fieldEditableName: 'fire_orani',
        fieldReadOnlyName: 'fire_orani',
        fieldType: 'percent_fire',
        className: 'col-3',
        md: '3',
      },
    },
  }
  const fetchDataForSelect = async () => {
    //https://www.youtube.com/watch?v=i1ktjumqT64
    const malzemebasegrupPromise = getSelectOptions('/malzemebasegrup/forselect')
    const birimPromise = getSelectOptions('/birim/forselect')
    const [malzemebasegrup, birim] = await Promise.all([malzemebasegrupPromise, birimPromise])
    setMalzemeBaseGrupSelectData(malzemebasegrup)
    setBirimSelectData(birim)
  }

  const fetchDataForTable = async (apiOrder, orderField) => {
    const tableDataPromise = getOrderedDataForTable(apiOrder, orderField)
    const tableData = await tableDataPromise
    setData(tableData)
  }

  useEffect(() => {
    fetchDataForSelect()
  }, [])

  useEffect(() => {
    fetchDataForTable(tableinfo.apiOrder, orderField)
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

export default MalzemeBaseView
