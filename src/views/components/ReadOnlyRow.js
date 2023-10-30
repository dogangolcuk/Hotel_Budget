/* eslint-disable react/prop-types */
import { CButtonGroup, CTableDataCell, CTableRow } from '@coreui/react'
import React from 'react'
import { DeleteButton, EditButton, TableDataCellReadOnly } from './index'

const ReadOnlyRow = (props) => {
  const {
    rowData,
    tableinfo,
    showActionId,
    setRecord,
    setShowActionId,
    setEditRowId,
    setRecordDeleted,
    searchState,
    setData,
  } = props
  let keys = Object.keys(tableinfo.fields)
  let component_list = []

  return (
    <>
      <CTableRow
        key={rowData.id}
        onMouseEnter={() => setShowActionId(rowData.id)}
        onMouseLeave={() => setShowActionId(-1)}
        onMouseDownCapture={() => setEditRowId(null)}
        className="d-flex"
      >
        {keys.forEach(function (key) {
          let type = tableinfo.fields[key].fieldType
          let fieldReadOnly = tableinfo.fields[key].fieldReadOnlyName
          let className = tableinfo.fields[key].className
          let badge = tableinfo.fields[key].badge
          component_list.push(
            <TableDataCellReadOnly
              type={type}
              field={fieldReadOnly}
              badge={badge}
              rowData={rowData}
              className={` text-truncate ${className}`}
            />,
          )
        })}
        {component_list.map((component) => (
          <>{component}</>
        ))}
        <CTableDataCell className="col-1">
          <CButtonGroup>
            <DeleteButton
              apiroute={tableinfo.apiDelete}
              apisearch={tableinfo.apiSearch}
              searchState={searchState}
              id={rowData.id}
              showActionId={showActionId}
              setRecordDeleted={setRecordDeleted}
              setData={setData}
            />

            <EditButton
              rowData={rowData}
              showActionId={showActionId}
              setEditRowId={setEditRowId}
              setRecord={setRecord}
            />
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </>
  )
}

export default ReadOnlyRow
