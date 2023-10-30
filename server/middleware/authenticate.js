require('dotenv').config({ path: __dirname + '/../../.env' })
// require('dotenv').config()

const jwt = require('jsonwebtoken')
const database = require('../db/index')

module.exports = (req, res, next) => {
  try {
    const token = req.get('Authorization').split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const tenant_id = decodedToken['tenantId']
    //req.tenant_id = decodedToken["tenantId"];
    req.tokenbilgisi = token
    if (!tenant_id) {
      return res.status(401).send('Yetki yok!')
    } else {
      database.options.tenantId = tenant_id
      database.options.tenant_safe = false
      req.tenantId = tenant_id
      req.tenant_id = tenant_id
      req.tenantAd = decodedToken['tenantAd']
      next()
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send('Token Süresi Doldu.')
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).send('Geçersiz Token veya İmza')
    } else {
      return res.status(401).send('Yetkisiz Erişim.')
    }
  }
}
