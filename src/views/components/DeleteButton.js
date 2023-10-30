/* eslint-disable react/prop-types */
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTooltip } from '@coreui/react'
import React from 'react'
import { handleDeleteClick } from '../../util'

const DeleteButton = (props) => {
  const { apiroute, apisearch, searchState, id, showActionId } = props

  return (
    <>
      <CTooltip content="Sil">
        <CButton
          variant="ghost"
          color="danger"
          shape="rounded-pill"
          className={id === showActionId ? 'visible' : 'invisible'}
          onClick={() => handleDeleteClick(apiroute, id, searchState, apisearch, props)}
        >
          <CIcon icon={cilTrash} />
        </CButton>
      </CTooltip>
    </>
  )
}

export default DeleteButton
