import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './views/components/PrivateRoute'
import SuperAdminRoute from './views/components/SuperAdminRoute'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers.All App
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

//Login Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const SuperAdminLogin = React.lazy(() => import('./views/pages/superadminlogin/SuperAdminLogin'))

//SüperAdmin Pages
const SuperAdmin = React.lazy(() => import('./views/pages/tenant/Tenant'))
const UserAdmin = React.lazy(() => import('./views/pages/user/User'))
const AdminPage = React.lazy(() => import('./views/pages/adminpage/adminpage'))

//Landing Home Page
const Landing = React.lazy(() => import('./views/pages/landing/LandingPage'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" name="Login" element={<Login />} />
            <Route path="/superadminlogin" name="SuperLogin" element={<SuperAdminLogin />} />
            <Route path="/" name="Landing" element={<Landing />} />
            <Route element={<PrivateRoute />}>
              <Route path="/*" name="Home" element={<DefaultLayout />} />
            </Route>
            <Route element={<SuperAdminRoute />}>
              <Route path="/superadmin" name="Admin" element={<SuperAdmin />} />
              <Route path="/useradmin" name="UserAdmin" element={<UserAdmin />} />
              <Route path="/adminpage" name="AdminPage" element={<AdminPage />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}
export default App
