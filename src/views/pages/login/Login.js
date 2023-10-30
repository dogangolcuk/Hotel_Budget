import React, { useState } from 'react'
import { House, Key, Person } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { passwordHash } from 'src/util'
import { handleLogin } from 'src/util/AxiosApiCalls'
import './assets/css/login.css'

const Login = () => {
  const [userpwd, setUserPwd] = useState({})
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const handleFormChange = (value) => {
    const { fieldName, fieldValue } = value
    let newUserPwd = { ...userpwd }
    newUserPwd[fieldName] = fieldValue
    setUserPwd(newUserPwd)
  }

  return (
    <div className="fakebody2">
      <div className="box">
        <div className="logincontainer">
          <div className="top-header">
            {/* <span className="customspan">{errMsg}</span> */}
            <header className="customheader1">Otel Bütçe</header>
            <House
              className="homeicon"
              onClick={() => {
                window.location.href = '/'
              }}
            />
            <header className="customheader">Giriş</header>
          </div>
          <div className="input-field">
            <input
              type="text"
              className="input"
              placeholder="Kullanıcı Adı"
              required
              onChange={(e) =>
                handleFormChange({
                  fieldName: 'username',
                  fieldValue: e ? e.target.value : null,
                })
              }
            />
            <div className="iconplace">
              <Person />
            </div>
          </div>
          <div className="input-field">
            <input
              type="password"
              className="input"
              placeholder="Şifre"
              required
              onChange={(e) =>
                handleFormChange({
                  fieldName: 'password',
                  fieldValue: e ? passwordHash(e.target.value) : null,
                })
              }
            />
            <div className="iconplace">
              <Key />
            </div>
          </div>
          <div className="input-field">
            <input
              type="submit"
              className="submit"
              value="Giriş"
              onClick={(e) => {
                handleLogin(userpwd, setErrMsg, navigate)
              }}
            />
          </div>
          <div className="bottom">
            <div className="left">
              <label className="customlabel">{errMsg}</label>
            </div>
            <div className="right">
              <label className="customlabel">
                <a href="mailto:info@info-tech360.com?subject=Yeni Şifre Talebi">
                  Şifreyi Unuttum.
                </a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
