import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CContainer,
  CFormInput,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { passwordHash } from 'src/util'
import { handleSuperAdminLogin } from 'src/util/AxiosApiCalls'
import './SuperAdminLogin.css'

const SuperAdminLogin = () => {
  const [userpwd, setUserPwd] = useState({})
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()

  const handleFormChange = (value) => {
    const { fieldName, fieldValue } = value
    let newUserPwd = { ...userpwd }
    newUserPwd[fieldName] = fieldValue
    setUserPwd(newUserPwd)
  }

  const item = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' },
  ]

  return (
    <CContainer
      className="d-flex align-items-center justify-content-center"
      style={{
        height: '100vh',
        // background: 'blue',
      }}
    >
      <CCard
        textColor={item[3].textColor}
        className={`mb-3 border-${item[3].color}`}
        style={{ backgroundColor: 'firebrick' }}

        // color="dark"
        // style={{ maxWidth: '18rem' }}
        // key={index}
      >
        <CCardHeader className="text-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>
          OTEL BÜTÇELEME
        </CCardHeader>
        <CCardBody>
          <CCardTitle className="text-center">Admin Girişi</CCardTitle>
          <CCardText>{errMsg}</CCardText>
          <CRow>
            <CFormInput
              className="mb-3"
              color="dark"
              type="text"
              required="required"
              autoComplete="off"
              placeholder="Kullanıcı Adı"
              size="lg"
              onChange={(e) =>
                handleFormChange({ fieldName: 'username', fieldValue: e ? e.target.value : null })
              }
            ></CFormInput>
          </CRow>
          <CRow>
            <CFormInput
              className="mb-3"
              type="password"
              required="required"
              placeholder="Şifre"
              size="lg"
              onChange={(e) =>
                handleFormChange({
                  fieldName: 'password',
                  fieldValue: e ? passwordHash(e.target.value) : null,
                })
              }
            ></CFormInput>
          </CRow>
          <CRow>
            <CButton
              variant="outline"
              color="danger"
              shape="rounded-pill"
              size="lg"
              onClick={(e) => {
                handleSuperAdminLogin(userpwd, setErrMsg, navigate)
              }}
            >
              Giriş
            </CButton>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default SuperAdminLogin
