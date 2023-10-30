/* eslint-disable react/prop-types */
import { CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
import { TableHeaderCellSort } from './index'

const TableHeadRow = (props) => {
  const { tableinfo, setOrderField } = props
  let keys = Object.keys(tableinfo.fields)
  let component_list = []

  return (
    <>
      <CTableHead color="dark" style={{ position: 'sticky', top: '0px' }}>
        <CTableRow className="d-flex">
          {keys.forEach(function (key) {
            let model = tableinfo.fields[key].model
            let field = tableinfo.fields[key].fieldReadOnlyName.split('.')
            let header = tableinfo.fields[key].header
            let className = tableinfo.fields[key].className
            component_list.push(
              <TableHeaderCellSort
                model={model}
                field={field.pop()}
                header={header}
                // className={` text-truncate ${className}`}
                className={` ${className}`}
                setOrderField={setOrderField}
              />,
            )
          })}
          {component_list.map((component) => (
            <>{component}</>
          ))}
          <CTableHeaderCell
            className="text-center col-1"
            style={
              {
                //fontSize: '12px',
              }
            }
          >
            İşlemler{' '}
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
    </>
  )
}

export default TableHeadRow
