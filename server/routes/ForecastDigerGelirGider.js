const router = require('express').Router()
const {
  getForecastDigerGelirGider,
  saveForecastDigerGelirGider,
  delForecastDigerGelirGider,
  getForecastDigerGelirGiderAll,
  getForecastDigerGelirGiderForSelect,
  getForecastDigerGelirGiderAllFieldSearch,
  getForecastDigerGelirGiderAllOrdered,
} = require('../controllers/ForecastDigerGelirGider')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getForecastDigerGelirGiderAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getForecastDigerGelirGiderForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getForecastDigerGelirGider(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getForecastDigerGelirGiderAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getForecastDigerGelirGiderAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveForecastDigerGelirGider(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delForecastDigerGelirGider(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
