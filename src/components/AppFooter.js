import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <a href="https://www.infotekdanismanlik.com/" target="_blank" rel="noopener noreferrer">
          <span className="me-1">&copy; 2023 infoTech </span>
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
