import React from 'react'
import User from '../user/User'
import Tenant from '../tenant/Tenant'

const AdminPage = () => {
  return (
    <div className="fakebody">
      <div>Admin PAge Side Bar Yapımı</div>
      <div className="row">
        <div className="col-sm-12 col-lg-6">
          <Tenant />
        </div>
        <div className="col-sm-12 col-lg-6">
          <User />
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default AdminPage
