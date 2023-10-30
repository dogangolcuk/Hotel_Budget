const router = require('express').Router()
const {
  getYemek,
  saveYemek,
  delYemek,
  getYemekAll,
  getYemekForSelect,
  getYemekAllFieldSearch,
  getYemekAllOrdered,
  getYemekBirim,
} = require('../controllers/Yemek')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getYemekAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getYemekForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getYemek(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .get('/birim/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getYemekBirim(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getYemekAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getYemekAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveYemek(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delYemek(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
