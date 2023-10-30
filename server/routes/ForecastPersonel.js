const router = require('express').Router()
const {
  getForecastPersonel,
  saveForecastPersonel,
  delForecastPersonel,
  getForecastPersonelAll,
  getForecastPersonelForSelect,
  getForecastPersonelAllOrdered,
  getForecastPersonelAllFieldSearch,
} = require('../controllers/ForecastPersonel')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getForecastPersonelAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getForecastPersonelForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getForecastPersonel(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getForecastPersonelAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getForecastPersonelAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveForecastPersonel(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delForecastPersonel(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
