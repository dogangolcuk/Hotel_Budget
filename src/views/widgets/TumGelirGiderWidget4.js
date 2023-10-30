/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardText, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { currencyFormat, getDataByRoute } from '../../util'

const TumGelirGiderWidget4 = () => {
  const [gelir, setGelir] = useState(0)
  const [gider, setGider] = useState(0)
  const [fark, setFark] = useState(0)

  useEffect(() => {
    getDataByRoute('/rawdb/tumgelirgidernumber').then((value) => {
      setFark(value[0]['toplam_fark'])
      setGelir(value[0]['toplam_gelir'])
      setGider(value[0]['toplam_gider'])
    })
  }, [])

  return (
    <>
      <CCard className="text-center mb-0" color="success" textColor="white">
        <CCardBody className="text-center">
          <CCardText className="text-center" style={{ fontSize: '14px' }}>
            <CRow>
              <CCol>Toplam Gelir:{currencyFormat(gelir)}</CCol>
              <CCol>Toplam Gider:{currencyFormat(gider)}</CCol>
              <CCol>Toplam Fark :{currencyFormat(fark)}</CCol>
            </CRow>
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default TumGelirGiderWidget4
