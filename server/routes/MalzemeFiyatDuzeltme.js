const router = require('express').Router()
const {
  getMalzemeFiyatDuzeltmeAll,
  getMalzemeFiyatDuzeltmeForSelect,
  getMalzemeFiyatDuzeltmebyButcePeriod,
  getMalzemeFiyatDuzeltmeAllFieldSearch,
  getMalzemeFiyatDuzeltmeAllOrdered,
  saveMalzemeFiyatDuzeltme,
  delMalzemeFiyatDuzeltme,
} = require('../controllers/MalzemeFiyatDuzeltme')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatDuzeltmeAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatDuzeltmeForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getMalzemeFiyatDuzeltmebyButcePeriod(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatDuzeltmeAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getMalzemeFiyatDuzeltmeAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveMalzemeFiyatDuzeltme(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delMalzemeFiyatDuzeltme(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
