import { CAlert, CButton, CCard } from '@coreui/react'
import React from 'react'
import { TumGelirGiderWidget4 } from '../../widgets'
import ButceOlusturKategori from './ButceOlusturKategori'

const ButceSayfa2 = () => {
  const printRef = React.useRef()
  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
        <CButton
          color="warning"
          size={'sm'}
          variant="ghost"
          href="#/butcesayfa"
          className="me-md-2"
        >
          Özet Görünüm
        </CButton>
      </div>
      <div ref={printRef}>
        <CAlert className="text-center" color="info">
          İSTATİKSEL TABLO
        </CAlert>
        <CCard style={{ overflow: 'auto', height: 'auto' }}>
          <ButceOlusturKategori />
          <TumGelirGiderWidget4 />
        </CCard>
      </div>
    </>
  )
}
export default ButceSayfa2
