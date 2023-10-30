/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { currencyFormat, getDataByRoute } from '../../util'

const TumGelirGiderWidget3 = () => {
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
      <CRow>
        {/* <CCol>
          {' '}
          <CCard
            className="text-center mb-3 border-primary border-top-5"
            color="white"
            textColor="primary"
          >
            <CCardBody className="text-center">
              <CCardTitle style={{ fontSize: '20px' }}>Tüm Gelir Giderler</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol> */}
        <CCol>
          {' '}
          <CCard className="text-center mb-3" color="info" textColor="white">
            <CCardBody className="text-center">
              <CCardText className="text-center" style={{ fontSize: '20px' }}>
                <CRow>
                  <CCol>Toplam Gelir:</CCol>
                  <CCol>{currencyFormat(gelir)}</CCol>
                </CRow>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          {' '}
          <CCard className="text-center mb-3" color="danger" textColor="white">
            <CCardBody className="text-center">
              <CCardText className="text-center" style={{ fontSize: '20px' }}>
                <CRow>
                  <CCol>Toplam Gider:</CCol>
                  <CCol>{currencyFormat(gider)}</CCol>
                </CRow>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          {' '}
          <CCard className="text-center mb-3" color="light" textColor="black">
            <CCardBody className="text-center">
              <CCardText className="text-center" style={{ fontSize: '20px' }}>
                <CRow>
                  <CCol>Toplam Fark :</CCol>
                  <CCol>{currencyFormat(fark)}</CCol>
                </CRow>
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default TumGelirGiderWidget3
