const router = require('express').Router()
const {
  getDovizTarihce,
  saveDovizTarihce,
  delDovizTarihce,
  getDovizTarihceAll,
} = require('../controllers/DovizTarihce')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getDovizTarihceAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getDovizTarihce(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveDovizTarihce(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delDovizTarihce(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
