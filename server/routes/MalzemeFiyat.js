const router = require('express').Router()
const {
  getMalzemeFiyatAll,
  getMalzemeFiyatbyMalzeme,
  getMalzemeFiyatAllFieldSearch,
  getMalzemeFiyatAllOrdered,
  saveMalzemeFiyat,
  delMalzemeFiyat,
} = require('../controllers/MalzemeFiyat')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/bymalzeme/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getMalzemeFiyatbyMalzeme(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveMalzemeFiyat(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delMalzemeFiyat(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
