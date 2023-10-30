import { cilLockLocked, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CAvatar,
  CCol,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import React from 'react'
import avatar8 from '../../../assets/images/avatars/13.jpeg'
import UserView from './UserView'
const User = () => {
  return (
    <>
      <CContainer>
        <CRow>
          <CCol md={11}>
            <CAlert
              color="primary"
              variant="solid"
              className="text-center"
              style={{ fontSize: '25px' }}
            >
              ADMIN SAYFASI - KULLANICI EKLE
            </CAlert>
          </CCol>
          <CCol>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
              <CDropdown variant="dropdown">
                <CDropdownToggle placement="bottom-end" className="py-3" caret={false}>
                  <CAvatar src={avatar8} size="md" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownHeader className="bg-light fw-semibold py-2">
                    Admin Hesabı
                  </CDropdownHeader>
                  <CDropdownDivider />
                  <CDropdownItem href="#/superadmin">
                    <CIcon icon={cilUserPlus} className="me-2" />
                    Otel Ekle
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => {
                      localStorage.removeItem('stokenbilgisi')
                      localStorage.removeItem('sorganization')
                      sessionStorage.setItem('sbilet', false)
                      window.location.href = '/'
                    }}
                  >
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Çıkış
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </CCol>
        </CRow>
        <UserView />
      </CContainer>
    </>
  )
}

export default User
