const router = require('express').Router()

//ROUTES
router.use('/', require('./AnaSayfa'))
// Genel Tanımlamalar
router.use('/birim', require('./Birim'))
router.use('/dovizcinsi', require('./DovizCinsi'))
router.use('/doviztarihce', require('./DovizTarihce'))
router.use('/departman', require('./Departman'))
router.use('/departmangrup', require('./DepartmanGrup'))
router.use('/tekrar', require('./Tekrar'))
//Yemek KISMI
router.use('/forecastyemek', require('./ForecastYemek'))
router.use('/yemekgrup', require('./YemekGrup'))
router.use('/yemek', require('./Yemek'))
router.use('/yemekmalzeme', require('./YemekMalzeme'))
// router.use('/malzeme', require('./Malzeme'))
router.use('/malzemebase', require('./MalzemeBase'))
router.use('/malzemebasegrup', require('./MalzemeBaseGrup'))
router.use('/malzemefiyat', require('./MalzemeFiyat'))
router.use('/malzemefiyatduzeltme', require('./MalzemeFiyatDuzeltme'))
//Oda KISMI
router.use('/forecastoda', require('./ForecastOda'))
router.use('/oda', require('./Oda'))
//Personel KISMI
router.use('/forecastpersonel', require('./ForecastPersonel'))
router.use('/personel', require('./Personel'))
//Diğer Gelir Güderler
router.use('/forecastdigergelirgider', require('./ForecastDigerGelirGider'))
//BÜTÇELEME KISMI
router.use('/butce', require('./Butce'))
router.use('/butcefisi', require('./ButceFisi'))
router.use('/gercekfis', require('./GercekFis'))
router.use('/butceperiod', require('./ButcePeriod'))
//Hesap Planı Tanımlamaları
router.use('/hesapalthesap', require('./HesapAltHesap'))
router.use('/hesapaltkart', require('./HesapAltKart'))
router.use('/hesapanahesap', require('./HesapAnaHesap'))
router.use('/hesapgrup', require('./HesapGrup'))
router.use('/hesapkart', require('./HesapKart'))
router.use('/hesapsinif', require('./HesapSinif'))
//Diğer Kısımlar
router.use('/rawdb', require('./Raw'))

module.exports = router
