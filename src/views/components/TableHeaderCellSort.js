/* eslint-disable react/prop-types */
import { CTableHeaderCell, CTooltip } from '@coreui/react'
import React, { useState } from 'react'

const TableHeaderCellSort = (props) => {
  const { model, field, header, className } = props
  const [orderAscDesc, setOrderAscDesc] = useState('DESC')

  const handleOrderClick = (ordercontext) => {
    const { model, field } = ordercontext
    props.setOrderField({
      model: model,
      field: field,
      ascdesc: orderAscDesc ? 'DESC' : 'ASC',
    })
    setOrderAscDesc((state) => !state)
  }
  return (
    <>
      <CTooltip placement="left" content="Sırala">
        <CTableHeaderCell
          className={className}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => handleOrderClick({ model: model, field: field })}
        >
          {header}
        </CTableHeaderCell>
      </CTooltip>
    </>
  )
}

export default TableHeaderCellSort
