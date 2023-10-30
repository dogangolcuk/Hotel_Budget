/* eslint-disable react/prop-types */
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getDataByRoute } from '../../util'

const PersonelSayisiWidget = () => {
  const [widgetData, setWidgetData] = useState(0)

  useEffect(() => {
    getDataByRoute('/rawdb/personelsayisi').then((value) => {
      setWidgetData(value[0]['count'])
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
          <CCardTitle>PERSONEL SAYISI</CCardTitle>
          <CCardText style={{ fontSize: '80px' }}>{widgetData}</CCardText>
          <CButton
            color="white"
            size={'sm'}
            variant="ghost"
            href="#/personel"
            style={{ color: 'white' }}
          >
            Personel Tanımla
          </CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PersonelSayisiWidget
