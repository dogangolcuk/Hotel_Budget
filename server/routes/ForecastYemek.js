const router = require('express').Router()
const {
  getForecastYemek,
  saveForecastYemek,
  delForecastYemek,
  getForecastYemekAll,
  getForecastYemekForSelect,
  getForecastYemekAllFieldSearch,
  getForecastYemekAllOrdered,
} = require('../controllers/ForecastYemek')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getForecastYemekAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getForecastYemekForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getForecastYemek(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getForecastYemekAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getForecastYemekAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveForecastYemek(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delForecastYemek(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
