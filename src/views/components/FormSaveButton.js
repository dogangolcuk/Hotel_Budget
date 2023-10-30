/* eslint-disable react/prop-types */
import { CButton, CCol } from '@coreui/react'
// import axios from 'axios'
import React from 'react'
import { handleSaveClick } from '../../util'

const FormSaveButton = (props) => {
  const { apiroute, row } = props

  return (
    <>
      <CCol md={12}>
        <CButton
          className="w-100"
          variant="outline"
          color="primary"
          shape="rounded-pill"
          onClick={() => handleSaveClick(apiroute, row, props)}
        >
          Kaydet
        </CButton>
      </CCol>{' '}
    </>
  )
}

export default FormSaveButton
