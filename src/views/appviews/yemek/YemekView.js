import React, { useEffect, useState } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { getOrderedDataForTable, getSelectOptions } from '../../../util'
import { TableCustom } from '../../components'

const YemekView = () => {
  const [data, setData] = useState([])
  const [yemekGrupSelectData, setYemekGrupSelectData] = useState([])
  const [birimSelectData, setBirimSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const tableinfo = {
    tablecaption: 'Yemek Çeşitleri',
    apiSearch: '/yemek/search',
    apiOrder: '/yemek/order',
    apiSave: '/yemek',
    apiDelete: '/yemek',
    argSearch: {
      id: 'number',
      ad: 'text',
      aciklama: 'text',
      yemekgrupad: 'text',
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
        header: 'Yemek Adı',
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
      yemekgrupId: {
        model: 'YemekGrup',
        header: 'Yemek Kategorisi',
        fieldEditableName: 'yemekgrupId',
        fieldReadOnlyName: 'yemekgrup.ad',
        fieldType: 'select',
        className: 'col-2',
        options: yemekGrupSelectData,
        md: '4',
      },
      aciklama: {
        model: 'self',
        header: 'Açıklama',
        fieldEditableName: 'aciklama',
        fieldReadOnlyName: 'aciklama',
        fieldType: 'text',
        className: 'col-3',
        md: '12',
      },
    },
  }

  useEffect(() => {
    getSelectOptions('/yemekgrup/forselect').then((value) => setYemekGrupSelectData(value))
    getSelectOptions('/birim/forselect').then((value) => setBirimSelectData(value))
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

export default YemekView
