/* eslint-disable react/prop-types */
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTooltip } from '@coreui/react'
import React from 'react'

const EditButton = (props) => {
  const { rowData, showActionId } = props
  const handleEditClick = (rowData) => {
    props.setEditRowId(rowData.id)
    props.setRecord(rowData)
  }
  return (
    <>
      <CTooltip content="Düzenle">
        <CButton
          variant="ghost"
          color="info"
          shape="rounded-pill"
          className={rowData.id === showActionId ? 'visible' : 'invisible'}
          onClick={() => handleEditClick(rowData)}
        >
          <CIcon icon={cilPencil} />
        </CButton>
      </CTooltip>
    </>
  )
}

export default EditButton
