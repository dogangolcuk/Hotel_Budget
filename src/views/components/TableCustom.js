/* eslint-disable react/prop-types */
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTooltip,
} from '@coreui/react'
import React, { useState } from 'react'
import { TableHeadRow, TableSearchBox, EditableRow, ReadOnlyRow, FormCustom } from './index'

const TableCustom = (props) => {
  const { data, tableinfo, setOrderField, setData, setRecordEdited, setRecordDeleted } = props
  const [record, setRecord] = useState({})
  const [showActionId, setShowActionId] = useState(-1)
  const [editRowID, setEditRowId] = useState(null)
  const [isShowModal, setisShowModal] = useState(false)
  const [searchState, setSearchState] = useState({})
  return (
    <>
      <CModal visible={isShowModal} size="lg" onClose={() => setisShowModal(false)}>
        <CModalHeader>
          <CModalTitle>{tableinfo.tablecaption}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormCustom
            tableinfo={tableinfo}
            setRecordEdited={setRecordEdited}
            setisShowModal={setisShowModal}
          />
        </CModalBody>
      </CModal>
      <CTable color="white" hover small responsive="sm" caption="top">
        <CTableCaption>
          <CRow>
            <CCol md={3}>{tableinfo.tablecaption}</CCol>
            <CCol md={6}>
              <TableSearchBox
                apiSearchRoute={tableinfo.apiSearch}
                fields={tableinfo.argSearch}
                setOrderField={setOrderField}
                setData={setData}
                setSearchState={setSearchState}
              />
            </CCol>
            <CCol md={3} className="text-end">
              <CTooltip content="Yeni Kayıt Ekle">
                <CButton
                  color="success"
                  shape="rounded-pill"
                  onClick={(event) => {
                    setisShowModal(true)
                  }}
                >
                  <CIcon icon={cilPlus} size={'sm'} />
                </CButton>
              </CTooltip>
            </CCol>
          </CRow>
        </CTableCaption>
        <TableHeadRow tableinfo={tableinfo} setOrderField={setOrderField} />
        <CTableBody>
          {data?.map((rowData) => (
            <>
              {editRowID === rowData.id ? (
                <EditableRow
                  tableinfo={tableinfo}
                  record={record}
                  setRecordEdited={setRecordEdited}
                  searchState={searchState}
                  setData={setData}
                  setEditRowId={setEditRowId}
                  setRecord={setRecord}
                />
              ) : (
                <ReadOnlyRow
                  rowData={rowData}
                  tableinfo={tableinfo}
                  showActionId={showActionId}
                  setRecordDeleted={setRecordDeleted}
                  searchState={searchState}
                  setData={setData}
                  setRecord={setRecord}
                  setShowActionId={setShowActionId}
                  setEditRowId={setEditRowId}
                />
              )}
            </>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default TableCustom
