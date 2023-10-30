const router = require('express').Router()
const {
  getButceAll,
  getButce,
  saveButce,
  delButce,
  getButceForSelect,
  getButceAllFieldSearch,
  getButceAllOrdered,
  getButceAllFieldSearchOnay,
} = require('../controllers/Butce')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getButceAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getButceForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getButce(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getButceAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getButceAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/search/truefalse', async (req, res, next) => {
    try {
      const rows = await getButceAllFieldSearchOnay(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveButce(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delButce(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
