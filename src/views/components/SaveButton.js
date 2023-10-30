/* eslint-disable react/prop-types */
import { cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTooltip } from '@coreui/react'
import React from 'react'
import { handleSaveClickForEditableRow } from '../../util'

const SaveButton = (props) => {
  const { apiroute, apisearch, searchState, row } = props

  return (
    <>
      <CTooltip content="Kaydet">
        <CButton
          variant="ghost"
          color="success"
          shape="rounded-pill"
          onClick={() =>
            handleSaveClickForEditableRow(apiroute, row, searchState, apisearch, props)
          }
        >
          <CIcon icon={cilSave} />
        </CButton>
      </CTooltip>
    </>
  )
}

export default SaveButton
