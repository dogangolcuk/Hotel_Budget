const router = require('express').Router()
const {
  getTekrar,
  saveTekrar,
  delTekrar,
  getTekrarAll,
  getTekrarForSelect,
} = require('../controllers/Tekrar')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getTekrarAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getTekrarForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getTekrar(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveTekrar(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delTekrar(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
