import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const SuperAdminRoute = () => {
  // let username = sessionStorage.getItem('user')
  // let password = sessionStorage.getItem('pwd')
  let auth = {
    token:
      sessionStorage.getItem('sbilet') === 'b0a68f5b-6063-47dc-8593-beb20e831e17' ? true : false,
  }
  //TODO Geçici olarak böyle yaptım.
  // let auth = {
  //   token:
  //     password === '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92' &&
  //     username === 'superadmin'
  //       ? true
  //       : false,
  // }
  // const checkValidToken = async () => {
  //   const tokendata = localStorage.getItem('tokenbilgisi')
  //   await axios
  //     .post('/login/verifytoken', { tokendata })
  //     .then((res) => {
  //       auth.token = true
  //     })
  //     .catch((err) => {
  //       auth.token = false
  //     })
  // }
  //FIXME Burda isverifyToken a immediate ihtiyacım olduğundan işe yaramadı. Sanırsam Redux kullanmalıyım.
  // const [isVerifyToken, setisVerifyToken] = useState(false)

  return auth.token ? <Outlet /> : <Navigate to="/superadminlogin" />
}

export default SuperAdminRoute
