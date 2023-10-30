/* eslint-disable react/prop-types */
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getDataByRoute } from '../../util'

const YatakSayisiWidget = () => {
  const [yatakSayisi, setYatakSayisi] = useState(0)
  useEffect(() => {
    getDataByRoute('/rawdb/odasayisi').then((value) => {
      setYatakSayisi(value[0]['sat_yat_sayisi'])
    })
  }, [])

  return (
    <>
      <CCard
        className="text-center mb-3 border-primary border-top-3"
        color="primary"
        textColor="white"
      >
        <CCardBody>
          <CCardTitle>YATAK SAYISI</CCardTitle>
          <CCardText style={{ fontSize: '80px' }}>{yatakSayisi}</CCardText>
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

export default YatakSayisiWidget
