const router = require('express').Router()
const {
  getHesapAltHesap,
  saveHesapAltHesap,
  delHesapAltHesap,
  getHesapAltHesapAll,
  getHesapAltHesapForSelect,
  getHesapAltHesapAllFieldSearch,
  getHesapAltHesapAllOrdered,
} = require('../controllers/HesapAltHesap')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getHesapAltHesapAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getHesapAltHesapForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getHesapAltHesap(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getHesapAltHesapAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getHesapAltHesapAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveHesapAltHesap(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delHesapAltHesap(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
