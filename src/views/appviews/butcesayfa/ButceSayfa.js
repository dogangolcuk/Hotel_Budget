import { CAlert, CButton, CContainer, CRow } from '@coreui/react'
import React from 'react'
import { TumGelirGiderWidget, TumGelirGiderWidget3 } from '../../widgets'
import ButceOlusturDiger from './ButceOlusturDiger'
import ButceOlusturOda from './ButceOlusturOda'
import ButceOlusturPersonel from './ButceOlusturPersonel'
import ButceOlusturYemek from './ButceOlusturYemek'
import ReactToPrint from 'react-to-print'
import CIcon from '@coreui/icons-react'
import { cilPrint } from '@coreui/icons'

const ButceSayfa = () => {
  const pageStyle = `{
    border-radius: 5px;
      @media print {
        .page-break {
          page-break-after: always !important;
        }
        @page {
        size: A4 landscape;
        margin: 10mm;
      }
    }
  }`
  const printRef = React.useRef()

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <CButton
          color="warning"
          size={'sm'}
          variant="ghost"
          href="#/butcesayfa2"
          className="me-md-2"
        >
          Detaylı Görünüm
        </CButton>
        <div>
          <ReactToPrint
            documentTitle="Rapor_Otel_Butce"
            pageStyle={pageStyle}
            trigger={() => (
              <CButton color="warning" size={'sm'} variant="ghost" className="me-md-2">
                <CIcon size="xl" icon={cilPrint}></CIcon>
              </CButton>
            )}
            content={() => printRef.current}
          />
        </div>
      </div>

      <div ref={printRef}>
        <CContainer>
          <CRow className="mb-3">
            <TumGelirGiderWidget />
          </CRow>
          <CRow className="mb-3">
            <TumGelirGiderWidget3 />
          </CRow>
          <CRow>
            <CAlert className="text-center" color="info">
              ÖZET TABLO
            </CAlert>
          </CRow>
          <div className="page-break">
            <ButceOlusturOda />
          </div>
          <div className="page-break">
            <ButceOlusturYemek />
          </div>
          <div className="page-break">
            <ButceOlusturPersonel />
          </div>
          <div className="page-break">
            <ButceOlusturDiger />
          </div>
        </CContainer>
      </div>
    </>
  )
}
export default ButceSayfa
