const router = require('express').Router()
const {
  getHesapKart,
  saveHesapKart,
  delHesapKart,
  getHesapKartAll,
  getHesapKartForSelect,
  getHesapKartAllFieldSearch,
  getHesapKartAllOrdered,
} = require('../controllers/HesapKart')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getHesapKartAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getHesapKartForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getHesapKart(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getHesapKartAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getHesapKartAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveHesapKart(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delHesapKart(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
