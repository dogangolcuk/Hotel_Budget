const router = require('express').Router()
const {
  getForecastOda,
  saveForecastOda,
  delForecastOda,
  getForecastOdaAll,
  getForecastOdaForSelect,
  getForecastOdaAllFieldSearch,
  getForecastOdaAllOrdered,
} = require('../controllers/ForecastOda')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getForecastOdaAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getForecastOdaForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getForecastOda(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getForecastOdaAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getForecastOdaAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveForecastOda(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delForecastOda(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
