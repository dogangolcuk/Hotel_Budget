const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { getUserByName, getVerifyToken } = require('../controllers/Login')
// require('dotenv').config()
require('dotenv').config({ path: __dirname + '/../../.env' })

router
  .post('/', async (req, res, next) => {
    try {
      const { username, password } = req.body
      const result = await getUserByName({ username })
      if (result.length <= 0) {
        return res.status(404).send('Böyle Bir Kullanıcı yok!')
      } else if (result[0].pwd === password) {
        const payload = {
          tenantId: result[0].tenant_id,
          tenantAd: result[0].tenantad,
          userAd: result[0].userad,
          userEmail: result[0].email,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: '2h',
        })
        res.status(200).send([token, result[0].tenantad])
      } else {
        return res.status(403).send('Password Hatalı')
      }
    } catch (error) {
      next(error)
    }
  })
  .post('/verifytoken', async (req, res, next) => {
    try {
      const result = await getVerifyToken(req.body['tokendata'])
      req.tokenbilgisi = result
      res.status(200).send(true)
    } catch (error) {
      res.status(401).send(false)
    }
  })

module.exports = router
