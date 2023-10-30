require('dotenv').config({ path: __dirname + '/../../.env' })
// require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  try {
    const token = req.get('sAuthorization').split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const tenantAd = decodedToken['tenantAd']
    // console.log(tenantAd)
    //req.tenant_id = decodedToken["tenantId"];
    // req.tokenbilgisi = token
    if (!tenantAd) {
      return res.status(401).send('Yetki yok!')
    } else if (tenantAd !== 'superadmin') {
      return res.status(401).send('Yanlış Kullanıcı!!')
    } else {
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
