const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    res.status(200).send('Butce Backend Ana Sayfa')
  } catch (error) {
    next(error)
  }
})
module.exports = router
