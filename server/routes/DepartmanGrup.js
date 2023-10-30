const router = require('express').Router()
const {
  getDepartmanGrup,
  saveDepartmanGrup,
  delDepartmanGrup,
  getDepartmanGrupAll,
  getDepartmanGrupForSelect,
  getDepartmanGrupAllFieldSearch,
  getDepartmanGrupAllOrdered,
} = require('../controllers/DepartmanGrup')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getDepartmanGrupAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getDepartmanGrupForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getDepartmanGrup(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getDepartmanGrupAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getDepartmanGrupAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveDepartmanGrup(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delDepartmanGrup(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
