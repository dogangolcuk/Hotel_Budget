/* eslint-disable react/prop-types */
import { cilActionRedo } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTooltip } from '@coreui/react'
import React from 'react'

const CancelButton = (props) => {
  return (
    <>
      <CTooltip content="İptal">
        <CButton
          variant="ghost"
          color="danger"
          shape="rounded-pill"
          onClick={() => {
            props.setEditRowId(null)
          }}
        >
          <CIcon icon={cilActionRedo} />
        </CButton>
      </CTooltip>
    </>
  )
}

export default CancelButton
