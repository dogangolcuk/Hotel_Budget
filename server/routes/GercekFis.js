const router = require('express').Router()
const {
  getGercekFis,
  saveGercekFis,
  delGercekFis,
  getGercekFisAll,
} = require('../controllers/GercekFis')

router
  .get('/', async (req, res, next) => {
    try {
      const rows = await getGercekFisAll()
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const row = await getGercekFis(id)
      res.status(200).send(row)
    } catch (error) {
      next(error)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const result = await saveGercekFis(req.body)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await delGercekFis(id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
