import axios from 'axios'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoute = () => {
  //TODO Geçici olarak böyle yaptım.
  let auth = {
    token:
      sessionStorage.getItem('bilet') === '6d66c744-915d-4567-bdd7-cece1d4a75a8' ? true : false,
  }
  //FIXME Burda isverifyToken a immediate ihtiyacım olduğundan işe yaramadı. Sanırsam Redux kullanmalıyım.
  // const [isVerifyToken, setisVerifyToken] = useState(false)

  const checkValidToken = async () => {
    const tokendata = localStorage.getItem('tokenbilgisi')
    await axios
      .post('/login/verifytoken', { tokendata })
      .then((res) => {
        auth.token = true
      })
      .catch((err) => {
        auth.token = false
      })
  }
  return auth.token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
