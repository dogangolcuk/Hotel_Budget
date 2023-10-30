import React from 'react'

//Uygulama Dashboard
const Dashboard = React.lazy(() => import('./views/appviews/dashboard/Dashboard'))

//Genel Tanımlamalar
const Birim = React.lazy(() => import('./views/appviews/birim/Birim'))

//Hesap Planı Tanımlamaları
const HesapSinif = React.lazy(() => import('./views/appviews/hesapsinif/HesapSinif'))
const HesapGrup = React.lazy(() => import('./views/appviews/hesapgrup/HesapGrup'))
const HesapAnaHesap = React.lazy(() => import('./views/appviews/hesapanahesap/HesapAnaHesap'))
const HesapAltHesap = React.lazy(() => import('./views/appviews/hesapalthesap/HesapAltHesap'))
const HesapKart = React.lazy(() => import('./views/appviews/hesapkart/HesapKart'))
const HesapAltKart = React.lazy(() => import('./views/appviews/hesapaltkart/HesapAltKart'))

//Otel Bilgileri
const Oda = React.lazy(() => import('./views/appviews/oda/Oda'))
const DepartmanGrup = React.lazy(() => import('./views/appviews/departmangrup/DepartmanGrup'))
const Departman = React.lazy(() => import('./views/appviews/departman/Departman'))

//Bütçeleme Kısmı
const Butce = React.lazy(() => import('./views/appviews/butce/Butce'))
const ButcePeriod = React.lazy(() => import('./views/appviews/butceperiod/ButcePeriod'))
const ForecastOda = React.lazy(() => import('./views/appviews/forecastoda/ForecastOda'))
const ForecastYemek = React.lazy(() => import('./views/appviews/forecastyemek/ForecastYemek'))
const ForecastDigerGelirGider = React.lazy(() =>
  import('./views/appviews/forecastdigergelirgider/ForecastDigerGelirGider'),
)
const ForecastPersonel = React.lazy(() =>
  import('./views/appviews/forecastpersonel/ForecastPersonel'),
)
const ButceSayfa = React.lazy(() => import('./views/appviews/butcesayfa/ButceSayfa'))
const ButceSayfa2 = React.lazy(() => import('./views/appviews/butcesayfa/ButceSayfa2'))

//Yemek Kısmı
const YemekGrup = React.lazy(() => import('./views/appviews/yemekgrup/YemekGrup'))
const Yemek = React.lazy(() => import('./views/appviews/yemek/Yemek'))
const MalzemeBase = React.lazy(() => import('./views/appviews/malzemebase/MalzemeBase'))
const MalzemeBaseGrup = React.lazy(() => import('./views/appviews/malzemebasegrup/MalzemeBaseGrup'))
const YemekMalzeme = React.lazy(() => import('./views/appviews/yemekmalzeme/YemekMalzeme'))
const YemekMalzeme2 = React.lazy(() => import('./views/appviews/yemekmalzeme2/YemekMalzeme2'))
const MalzemeFiyat = React.lazy(() => import('./views/appviews/malzemefiyat/MalzemeFiyat'))
const MalzemeFiyat2 = React.lazy(() => import('./views/appviews/malzemefiyat2/MalzemeFiyat2'))
const MalzemeFiyatDuzeltme = React.lazy(() =>
  import('./views/appviews/malzemefiyatduzeltme/MalzemeFiyatDuzeltme'),
)

//Personel Kısmı
const Personel = React.lazy(() => import('./views/appviews/personel/Personel'))
// const AboutUs = React.lazy(() => import('./views/pages/landing/aboutus/AboutUs'))

//ROUTES
const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/birim', name: 'Birimler', element: Birim },
  { path: '/sinif', name: 'Sınıf', element: HesapSinif },
  { path: '/grup', name: 'Grup', element: HesapGrup },
  { path: '/anahesap', name: 'Ana Hesap', element: HesapAnaHesap },
  { path: '/althesap', name: 'Alt Hesap', element: HesapAltHesap },
  { path: '/kart', name: 'Kart', element: HesapKart },
  { path: '/altkart', name: 'Alt Kart', element: HesapAltKart },
  { path: '/oda', name: 'Oda Bilgileri', element: Oda },
  { path: '/butce', name: 'Bütçe', element: Butce },
  { path: '/butceperiod', name: 'Bütçe Periodları', element: ButcePeriod },
  { path: '/forecastoda', name: 'Oda Kısmı Gelir/Gider', element: ForecastOda },
  { path: '/butcesayfa', name: 'Bütçe Tablosu Tüm Bölümler', element: ButceSayfa },
  { path: '/butcesayfa2', name: 'Bütçe Tablosu Tüm Bölümler', element: ButceSayfa2 },
  { path: '/yemekgrup', name: 'Yemek Kategorileri', element: YemekGrup },
  { path: '/yemek', name: 'Yemek Çeşitleri', element: Yemek },
  { path: '/malzemebase', name: 'Yemek Malzemeleri', element: MalzemeBase },
  { path: '/malzemebasegrup', name: 'Yemek Malzeme Kategorileri ', element: MalzemeBaseGrup },
  { path: '/yemekmalzeme', name: 'Yemeğin Malzemeleri ', element: YemekMalzeme },
  { path: '/yemekmalzeme2', name: 'Yemeğin Malzemeleri ', element: YemekMalzeme2 },
  { path: '/malzemefiyat', name: 'Malzeme Fiyatları', element: MalzemeFiyat },
  { path: '/malzemefiyat2', name: 'Malzeme Fiyatları', element: MalzemeFiyat2 },
  { path: '/malzemefiyatduzeltme', name: 'Malzeme Fiyat Ayarla', element: MalzemeFiyatDuzeltme },
  { path: '/forecastyemek', name: 'Yemek Kısmı Gelir/Gider', element: ForecastYemek },
  { path: '/departmangrup', name: 'Departman Kategorileri', element: DepartmanGrup },
  { path: '/departman', name: 'Departmanlar', element: Departman },
  { path: '/personel', name: 'Personel Bilgileri', element: Personel },
  {
    path: '/forecastdigergelirgider',
    name: 'Diğer Gelir ve Giderler',
    element: ForecastDigerGelirGider,
  },
  {
    path: '/forecastpersonel',
    name: 'Personel Giderler',
    element: ForecastPersonel,
  },
  // {
  //   path: '/aboutus',
  //   name: 'Hakkımızda',
  //   element: AboutUs,
  // },
]

export default routes
