const router = require('express').Router()
const {
  getPersonel,
  savePersonel,
  delPersonel,
  getPersonelAll,
  getPersonelAllFieldSearch,
  getPersonelAllOrdered,
  getPersonelForSelect,
} = require('../controllers/Personel')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getPersonelAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/forselect', async (req, res, next) => {
    try {
      const rows = await getPersonelForSelect()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getPersonel(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/search', async (req, res, next) => {
    try {
      const rows = await getPersonelAllFieldSearch(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/order', async (req, res, next) => {
    try {
      const rows = await getPersonelAllOrdered(req.body)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await savePersonel(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delPersonel(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
