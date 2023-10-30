const router = require('express').Router()
const {
  getHesapSinif,
  saveHesapSinif,
  delHesapSinif,
  getHesapSinifAll,
  getHesapSinifAllFieldSearch,
  getHesapSinifForSelect,
  getHesapSinifAllOrdered,
} = require('../controllers/HesapSinif')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getHesapSinifAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getHesapSinifForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getHesapSinif(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getHesapSinifAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getHesapSinifAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveHesapSinif(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delHesapSinif(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
