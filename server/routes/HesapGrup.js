const router = require('express').Router()
const {
  getHesapGrup,
  saveHesapGrup,
  delHesapGrup,
  getHesapGrupAll,
  getHesapGrupAllFieldSearch,
  getHesapGrupForSelect,
  getHesapGrupAllOrdered,
} = require('../controllers/HesapGrup')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getHesapGrupAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getHesapGrupForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getHesapGrup(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getHesapGrupAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getHesapGrupAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveHesapGrup(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delHesapGrup(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
