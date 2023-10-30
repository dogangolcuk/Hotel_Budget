require('dotenv').config({ path: __dirname + '/../../.env' })
const express = require('express')
const checkJwt = require('./middleware/authenticate')
const checkJwtWithoutTenant = require('./middleware/authenticatewithouttenant')
const path = require('path')
// const tenant = require("./middleware/tenant");
const app = express()
const PORT = process.env.SERVER_PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '..', 'build')))

//Multitenant kullanılmıyor.Token Üretiyor.
app.use('/api/login', require('./routes/Login'))
app.use('/api/superadminlogin', require('./routes/SuperAdminLogin'))

//Multitenant kullanılmıyor.
app.use('/api/tenant', checkJwtWithoutTenant, require('./routes/Tenant'))
app.use('/api/user', checkJwtWithoutTenant, require('./routes/User'))

//Multi Tenancy and Authenticate için middleware
app.use('/api', checkJwt, require('./routes/index'))

//Error handling
app.use(async (err, req, res, next) => {
  const { code, status, message } = err
  const xcode = code || status || 500
  res.status(xcode).send({ code: xcode, message })
})
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})
//Server start
app.listen(PORT, () => {
  console.log(`Data API Server is listening on port: http://localhost:${PORT}`)
})
