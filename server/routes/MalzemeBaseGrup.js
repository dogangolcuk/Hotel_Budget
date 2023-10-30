const router = require('express').Router()
const {
  getMalzemeBaseGrup,
  saveMalzemeBaseGrup,
  delMalzemeBaseGrup,
  getMalzemeBaseGrupAll,
  getMalzemeBaseGrupForSelect,
  getMalzemeBaseGrupAllFieldSearch,
  getMalzemeBaseGrupAllOrdered,
} = require('../controllers/MalzemeBaseGrup')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseGrupAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseGrupForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getMalzemeBaseGrup(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseGrupAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseGrupAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveMalzemeBaseGrup(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delMalzemeBaseGrup(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
