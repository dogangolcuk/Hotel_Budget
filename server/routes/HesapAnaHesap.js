const router = require('express').Router()
const {
  getHesapAnaHesap,
  saveHesapAnaHesap,
  delHesapAnaHesap,
  getHesapAnaHesapAll,
  getHesapAnaHesapForSelect,
  getHesapAnaHesapAllFieldSearch,
  getHesapAnaHesapAllOrdered,
} = require('../controllers/HesapAnaHesap')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getHesapAnaHesapAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getHesapAnaHesapForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getHesapAnaHesap(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getHesapAnaHesapAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getHesapAnaHesapAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveHesapAnaHesap(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delHesapAnaHesap(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
