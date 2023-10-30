const router = require('express').Router()
const {
  getHesapAltKart,
  saveHesapAltKart,
  delHesapAltKart,
  getHesapAltKartAll,
  getHesapAltKartForSelect,
  getHesapAltKartAllFieldSearch,
  getHesapAltKartAllAllOrdered,
} = require('../controllers/HesapAltKart')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getHesapAltKartAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getHesapAltKartForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getHesapAltKart(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getHesapAltKartAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getHesapAltKartAllAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveHesapAltKart(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delHesapAltKart(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
