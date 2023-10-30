const router = require('express').Router()
const {
  getButcePeriodAll,
  getButcePeriod,
  saveButcePeriod,
  delButcePeriod,
  getButcePeriodForSelect,
  getButcePeriodAllFieldSearch,
  getButcePeriodAllOrdered,
} = require('../controllers/ButcePeriod')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getButcePeriodAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getButcePeriodForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getButcePeriod(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getButcePeriodAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getButcePeriodAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveButcePeriod(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delButcePeriod(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
