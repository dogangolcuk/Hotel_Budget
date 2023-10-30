const router = require('express').Router()
const {
  getDovizCinsi,
  saveDovizCinsi,
  delDovizCinsi,
  getDovizCinsiAll,
  getDovizCinsiForSelect,
} = require('../controllers/DovizCinsi')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getDovizCinsiAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getDovizCinsiForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getDovizCinsi(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveDovizCinsi(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delDovizCinsi(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
