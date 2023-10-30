/* eslint-disable react/prop-types */
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getDataByRoute } from '../../util'

const OdaSayisiWidget = () => {
  const [odaSayisi, setOdaSayisi] = useState(0)

  useEffect(() => {
    getDataByRoute('/rawdb/odasayisi').then((value) => {
      setOdaSayisi(value[0]['oda_sayisi'])
    })
  }, [])

  return (
    <>
      <CCard
        className="text-center mb-3 border-primary border-top-5"
        color="primary"
        textColor="white"
      >
        <CCardBody>
          <CCardTitle>ODA SAYISI</CCardTitle>
          <CCardText style={{ fontSize: '80px' }}>{odaSayisi}</CCardText>
          <CButton
            color="white"
            size={'sm'}
            variant="ghost"
            href="#/oda"
            style={{ color: 'white' }}
          >
            Oda Tanımla
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default OdaSayisiWidget
