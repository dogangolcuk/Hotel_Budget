import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import {
  birimFormat,
  deletebyRoute,
  getDataByRoute,
  getSelectOptions,
  getTavsiyeYemekMaliyet,
  savebyRoute,
} from '../../../util'
import ReactSelect from 'react-select'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'

const YemekMalzemeView2 = () => {
  const [data, setData] = useState([])
  const [yemekSelectData, setYemekSelectData] = useState([])
  const [malzemebaseSelectData, setMalzemeBaseSelectData] = useState([])
  const [recordEdited, setRecordEdited] = useState(false)
  const [recordDeleted, setRecordDeleted] = useState(false)
  const [record, setRecord] = useState({})
  const [birimcinsi, setBirimCinsi] = useState('Birim')
  const [tavsiyeYemekMaliyet, setTavsiyeYemekMaliyet] = useState('0')
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

  const handleDeleteClick = async (apiroute, id) => {
    deletebyRoute(apiroute, id)
    setRecordDeleted((state) => !state)
  }

  const handleSaveClick = async (apiroute, row) => {
    savebyRoute(apiroute, row)
    setRecordEdited((state) => !state)
  }

  useEffect(() => {
    getSelectOptions('/yemek/forselect').then((value) => setYemekSelectData(value))
    getSelectOptions('/malzemebase/forselect').then((value) => setMalzemeBaseSelectData(value))
  }, [])

  useEffect(() => {
    getDataByRoute(`/yemekmalzeme/byyemek/${record['yemekId']}`).then((data) => setData(data))
    getTavsiyeYemekMaliyet(`/rawdb/yemekmaliyet/${record['yemekId']}/0`).then((value) => {
      if (value) {
        setTavsiyeYemekMaliyet(value)
      } else {
        setTavsiyeYemekMaliyet(0)
      }
    })
  }, [record, recordDeleted, recordEdited])

  return (
    <>
      <CCard className="mb-3" style={{ display: 'block', height: '400px', overflowY: 'auto' }}>
        <CCardBody>
          <CRow>
            <CCol>
              <CFormLabel>Yemeğin Adı</CFormLabel>
              <ReactSelect
                placeholder="..."
                isClearable={true}
                isSearchable={true}
                menuIsOpen={true}
                defaultValue={null}
                options={yemekSelectData}
                styles={customStyles}
                onChange={(e) =>
                  handleFormChange({ fieldName: 'yemekId', fieldValue: e ? e.value : null })
                }
              />
            </CCol>
            <CCol>
              <CFormLabel>İçerdiği Malzeme</CFormLabel>

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
              <CFormLabel>Malzemenin Miktarı</CFormLabel>

              <div className={'position-relative text-center'}>
                <CBadge color="info" position="bottom" shape="rounded-pill">
                  {birimFormat(birimcinsi, record['miktar'])}
                </CBadge>
              </div>
              <CFormInput
                className="mb-3"
                type="number"
                min={0}
                step={0.1}
                onChange={(e) => {
                  handleFormChange({ fieldName: 'miktar', fieldValue: e ? e.target.value : null })
                  getDataByRoute(`/malzemebase/birim/${record['malzemebaseId']}`).then((value) =>
                    setBirimCinsi(value.ad),
                  )
                }}
              ></CFormInput>
              <CTooltip content="Ekle">
                <CButton
                  className="mb-3 w-100"
                  variant="ghost"
                  color="info"
                  shape="rounded-0"
                  onClick={() => handleSaveClick('/yemekmalzeme', record)}
                >
                  <CIcon icon={cilPlus} size="xxl" />
                </CButton>
              </CTooltip>
              <CCard
                className="text-center mb-3 border-primary border-top-3"
                color="white"
                textColor="primary"
              >
                <CCardBody>
                  <CCardTitle>Yemek Maliyeti</CCardTitle>
                  <CCardTitle style={{ fontSize: '10px', color: 'red' }}>
                    *Bütçe Başı Enflasyon hesapsız fiyatdır.
                  </CCardTitle>
                  <CCardText style={{ fontSize: '80px' }}>{tavsiyeYemekMaliyet + ' ₺'}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow className="mb-3"></CRow>
      <CCard className="mb-3" style={{ display: 'block', height: '350px', overflowY: 'auto' }}>
        <CCardBody>
          <CRow>
            <CTable hover>
              <CTableHead>
                <CTableHeaderCell>Malzeme Adı</CTableHeaderCell>
                <CTableHeaderCell>Miktarı</CTableHeaderCell>
                <CTableHeaderCell>Kaldır</CTableHeaderCell>
              </CTableHead>
              <CTableBody>
                {data?.map((rowData) => (
                  <>
                    <CTableRow>
                      <CTableDataCell>{rowData['malzemebase'].ad}</CTableDataCell>
                      <CTableDataCell>
                        {rowData['miktar'] + ' ' + rowData['malzemebase']['birim'].ad}
                      </CTableDataCell>
                      <CButton
                        variant="ghost"
                        color="danger"
                        shape="rounded-pill"
                        onClick={() => handleDeleteClick('/yemekmalzeme', rowData.id)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableRow>
                  </>
                ))}
              </CTableBody>
            </CTable>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default YemekMalzemeView2
