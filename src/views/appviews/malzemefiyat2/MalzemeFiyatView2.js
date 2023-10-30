import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CTooltip,
} from '@coreui/react'
import {
  getOrderedDataForTable,
  getDataByRoute,
  getSelectOptions,
  getSelectOptions2,
  savebyRoute,
} from '../../../util'
import { TableCustom } from '../../components'
import ReactSelect from 'react-select'
import { NumericFormat } from 'react-number-format'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const MalzemeFiyatView2 = () => {
  const [data, setData] = useState([])
  const [malzemefiyatduzeltmeSelectData, setMalzemeFiyatDuzeltmeSelectData] = useState([])
  const [malzemefiyatduzeltmeSelectDataTable, setMalzemeFiyatDuzeltmeSelectDataTable] = useState([])

  const [malzemebaseSelectData, setMalzemeBaseSelectData] = useState([])
  const [orderField, setOrderField] = useState({ model: 'self', field: 'id', ascdesc: 'DESC' })
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const [record, setRecord] = useState({})

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
        fieldType: 'select_malzeme',
        className: 'col-4',
        options: malzemebaseSelectData,
        md: '0',
      },
      birim_fiyat: {
        model: 'self',
        header: 'Birim Fiyat',
        fieldEditableName: 'birim_fiyat',
        fieldReadOnlyName: 'birim_fiyat',
        fieldType: 'currency_malzeme',
        className: 'col-2',
        md: '0',
      },
      malzemefiyatduzeltmeId: {
        model: 'MalzemeFiyatDuzeltme',
        header: 'Düzeltme Oranı',
        fieldEditableName: 'malzemefiyatduzeltmeId',
        fieldReadOnlyName: 'malzemefiyatduzeltme.duzeltme_oran',
        badge: 'malzemefiyatduzeltme.butceperiod.ad',
        fieldType: 'select_malzeme',
        className: 'col-4',
        options: malzemefiyatduzeltmeSelectDataTable,
        md: '0',
      },
    },
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#6f42c1',
      minHeight: '38px',
      height: '38px',
      boxShadow: state.isFocused ? '3px 3px 0 0' : 3,
    }),
    menuList: (base) => ({
      ...base,
      minHeight: '300px',
    }),
    menu: (base, state) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '38px',
    }),
    dropdownIndicator: (state) => ({
      display: 'none',
    }),
  }
  const handleFormChange = (value) => {
    const { fieldName, fieldValue } = value
    let newRecord = { ...record }
    newRecord[fieldName] = fieldValue
    setRecord(newRecord)
  }

  const handleSaveClick = async (apiroute, row) => {
    if (row['malzemefiyatduzeltmeId'] === null) {
      getDataByRoute(`/malzemefiyat/bymalzeme/${row['malzemebaseId']}`).then((value) => {
        if (value.length > 0) {
          alert('Temel Fiyat Bir Adet Girilebilir...')
        } else {
          savebyRoute(apiroute, row)
          setRecordEdited((state) => !state)
        }
      })
    } else {
      getDataByRoute(`/malzemefiyat/bymalzeme/${row['malzemebaseId']}`).then((value) => {
        if (value.length <= 0) {
          alert('İlk Önce Temel Fiyat Girişi Yapılmalı...')
        } else {
          if (row['birim_fiyat'] !== value[0]['birim_fiyat']) {
            alert('Aynı ürün için temel fiyattan farklı fiyat girişi var...')
          } else {
            savebyRoute(apiroute, row)
            setRecordEdited((state) => !state)
          }
        }
      })
    }
  }

  useEffect(() => {
    getSelectOptions2('/malzemefiyatduzeltme/forselect').then((data) => {
      let base = [{ label: 'Yalın Fiyat', value: null }]
      setMalzemeFiyatDuzeltmeSelectData(base.concat(data))
      setMalzemeFiyatDuzeltmeSelectDataTable(data)
    })
    getSelectOptions('/malzemebase/forselect').then((value) => setMalzemeBaseSelectData(value))
  }, [])

  useEffect(() => {
    getOrderedDataForTable(tableinfo.apiOrder, orderField).then((data) => setData(data))
  }, [orderField, recordEdited, recordDeleted, tableinfo.apiOrder])

  return (
    <>
      <CCard className="mb-3" style={{ display: 'block', height: '400px', overflowY: 'auto' }}>
        <CCardBody>
          <CRow>
            <CCol>
              <CFormLabel>Ürün Adı:</CFormLabel>
              <ReactSelect
                placeholder="..."
                isClearable={true}
                isSearchable={true}
                menuIsOpen={true}
                defaultValue={null}
                options={malzemebaseSelectData}
                styles={customStyles}
                onChange={(e) =>
                  handleFormChange({ fieldName: 'malzemebaseId', fieldValue: e ? e.value : null })
                }
              />
            </CCol>
            <CCol>
              <CFormLabel>Fiyat Düzeltme Uygula -Opsiyonel-</CFormLabel>
              <ReactSelect
                placeholder="..."
                isClearable={true}
                isSearchable={true}
                menuIsOpen={true}
                defaultValue={null}
                options={malzemefiyatduzeltmeSelectData}
                styles={customStyles}
                onChange={(e) =>
                  handleFormChange({
                    fieldName: 'malzemefiyatduzeltmeId',
                    fieldValue: e ? e.value : null,
                  })
                }
              />
            </CCol>
            <CCol>
              <CFormLabel>Birim Fiyatı</CFormLabel>

              <div className={'position-relative text-center'}>
                <CBadge color="info" position="bottom" shape="rounded-pill">
                  {record['birim_fiyat']}
                </CBadge>
              </div>
              <NumericFormat
                className="mb-3"
                allowNegative={false}
                thousandSeparator={true}
                allowedDecimalSeparators={[',', '.']}
                fixedDecimalScale
                allowLeadingZeros={false}
                decimalScale={2}
                customInput={CFormInput}
                onValueChange={(e) =>
                  handleFormChange({ fieldName: 'birim_fiyat', fieldValue: e ? e.value : null })
                }
              ></NumericFormat>
              <CTooltip content="Ekle">
                <CButton
                  className="mb-3 w-100"
                  variant="ghost"
                  color="info"
                  shape="rounded-0"
                  onClick={() => handleSaveClick('/malzemefiyat', record)}
                >
                  <CIcon icon={cilPlus} size="xxl" />
                </CButton>
              </CTooltip>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
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

export default MalzemeFiyatView2
