const router = require('express').Router()
const {
  getMalzemeBase,
  saveMalzemeBase,
  delMalzemeBase,
  getMalzemeBaseAll,
  getMalzemeBaseForSelect,
  getMalzemeBaseAllFieldSearch,
  getMalzemeBaseAllOrdered,
  getMalzemeBaseBirim,
} = require('../controllers/MalzemeBase')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getMalzemeBase(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .get('/birim/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getMalzemeBaseBirim(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getMalzemeBaseAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveMalzemeBase(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delMalzemeBase(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
