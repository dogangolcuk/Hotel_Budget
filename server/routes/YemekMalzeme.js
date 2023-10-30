const router = require('express').Router()
const {
  saveYemekMalzeme,
  delYemekMalzeme,
  getYemekMalzemeAll,
  getYemekMalzemebyYemek,
  getYemekMalzemebyMalzeme,
  getYemekMalzemeAllFieldSearch,
  getYemekMalzemeAllOrdered,
} = require('../controllers/YemekMalzeme')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getYemekMalzemeAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/byyemek/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getYemekMalzemebyYemek(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .get('/bymalzeme/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getYemekMalzemebyMalzeme(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getYemekMalzemeAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getYemekMalzemeAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveYemekMalzeme(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delYemekMalzeme(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
