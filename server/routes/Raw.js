const router = require('express').Router()
const {
  getYemekMalzemeDistinct,
  getYemekMalzemeMaliyet,
  getYemekMaliyet,
  getTahminiMusteriSayisi,
  getOdaSayisi,
  getGecelemeSayisi,
  getTumGelirGider,
  getPersonelSayisi,
  getGecelemeMusteriSayisi,
  getKategoriGelirGider,
  getTumGelirGiderNumber,
} = require('../controllers/Raw')

router
  .get('/malzemedistinct/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const tenant_id = req.tenant_id
      const result = await getYemekMalzemeDistinct(id, tenant_id)
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  })
  .get('/malzememaliyet/:yemek_id/:butceperiod_id', async (req, res, next) => {
    try {
      const { yemek_id, butceperiod_id } = req.params
      const tenant_id = req.tenant_id
      const rows = await getYemekMalzemeMaliyet(yemek_id, butceperiod_id, tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/yemekmaliyet/:yemek_id/:butceperiod_id', async (req, res, next) => {
    try {
      const { yemek_id, butceperiod_id } = req.params
      const tenant_id = req.tenant_id
      const rows = await getYemekMaliyet(yemek_id, butceperiod_id, tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/yemekmiktar/:butceperiod_id', async (req, res, next) => {
    try {
      const { butceperiod_id } = req.params
      const tenant_id = req.tenant_id
      const rows = await getTahminiMusteriSayisi(butceperiod_id, tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/odasayisi', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getOdaSayisi(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/gecelemesayisi', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getGecelemeSayisi(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/tumgelirgider', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getTumGelirGider(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/personelsayisi', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getPersonelSayisi(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/gecelememusterisayisi', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getGecelemeMusteriSayisi(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/kategorigelirgider', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getKategoriGelirGider(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })
  .get('/tumgelirgidernumber', async (req, res, next) => {
    try {
      const tenant_id = req.tenant_id
      const rows = await getTumGelirGiderNumber(tenant_id)
      res.status(200).send(rows)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
