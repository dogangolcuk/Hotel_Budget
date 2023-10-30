const router = require('express').Router()
const {
  getYemekGrup,
  saveYemekGrup,
  delYemekGrup,
  getYemekGrupAll,
  getYemekGrupForSelect,
  getYemekGrupAllFieldSearch,
  getYemekGrupAllOrdered,
} = require('../controllers/YemekGrup')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getYemekGrupAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getYemekGrupForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getYemekGrup(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getYemekGrupAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getYemekGrupAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveYemekGrup(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delYemekGrup(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
