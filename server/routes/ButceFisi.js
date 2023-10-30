const router = require('express').Router()

const {
  getButceFisiAll,
  getButceFisi,
  saveButceFisi,
  delButceFisi,
  getButceFisiOdaGelirAllOrdered,
  getButceFisiOdaAllFieldSearch,
} = require('../controllers/ButceFisi')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getButceFisiAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getButceFisi(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/searchoda', async (req, res, next) => {
    try {
      const rows = await getButceFisiOdaAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/orderodagelir', async (req, res, next) => {
    try {
      const rows = await getButceFisiOdaGelirAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveButceFisi(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delButceFisi(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
