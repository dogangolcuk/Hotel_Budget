import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import {
  GecelemeMusteriSayisiWidget,
  OdaSayisiWidget,
  PersonelSayisiWidget,
  TumGelirGiderWidget2,
  YatakSayisiWidget,
} from '../../widgets'

const Dashboard = () => {
  return (
    <>
      <CContainer fluid className="mb-3">
        <CRow className="mb-3 text-center ">
          <CCol>
            <TumGelirGiderWidget2 />
          </CCol>
          <CCol>
            <GecelemeMusteriSayisiWidget />
          </CCol>
        </CRow>
        <CRow className="mb-3 text-center">
          <CCol>
            <OdaSayisiWidget />
          </CCol>
          <CCol>
            <YatakSayisiWidget />
          </CCol>
          <CCol>
            <PersonelSayisiWidget />
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Dashboard
