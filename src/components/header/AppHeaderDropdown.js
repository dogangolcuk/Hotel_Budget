import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/12.png'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Hesabım</CDropdownHeader>
        <CDropdownDivider />
        <CDropdownItem
          // href="#/login"
          onClick={() => {
            localStorage.removeItem('tokenbilgisi')
            localStorage.removeItem('organization')
            sessionStorage.setItem('bilet', false)
            window.location.href = '/'
          }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Çıkış
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
