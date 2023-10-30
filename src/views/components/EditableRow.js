/* eslint-disable react/prop-types */
import { CButtonGroup, CTableDataCell, CTableRow } from '@coreui/react'
import React from 'react'
import { TableDataCellEditable, SaveButton, CancelButton } from './index'

const EditableRow = (props) => {
  const { tableinfo, record, setEditRowId, setRecord, setRecordEdited, searchState, setData } =
    props
  let keys = Object.keys(tableinfo.fields)
  let component_list = []
  return (
    <>
      <CTableRow className="d-flex">
        {keys.forEach(function (key) {
          component_list.push(
            <TableDataCellEditable
              //key={tableinfo.fields[key].fieldName + 'editablerow'}
              type={tableinfo.fields[key].fieldType}
              field={tableinfo.fields[key].fieldEditableName}
              record={record}
              className={tableinfo.fields[key].className}
              options={tableinfo.fields[key].options}
              setRecord={setRecord}
            />,
          )
        })}
        {component_list.map((component) => (
          <>{component}</>
        ))}
        <CTableDataCell className="col-1">
          <CButtonGroup>
            <SaveButton
              apiroute={tableinfo.apiSave}
              apisearch={tableinfo.apiSearch}
              searchState={searchState}
              row={record}
              setRecordEdited={setRecordEdited}
              setRecord={setRecord}
              setEditRowId={setEditRowId}
              setData={setData}
            />
            <CancelButton setEditRowId={setEditRowId} />
          </CButtonGroup>
        </CTableDataCell>
      </CTableRow>
    </>
  )
}

export default EditableRow
