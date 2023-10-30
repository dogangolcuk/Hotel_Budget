import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBalanceScale,
  cilBriefcase,
  cilChartLine,
  cilEnvelopeOpen,
  cilFastfood,
  cilGraph,
  cilHome,
  cilPencil,
  cilRestaurant,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Otel Bütçe',
  },
  {
    component: CNavItem,
    name: 'Ana Sayfa',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Tanımlamalar',
  },
  {
    component: CNavGroup,
    name: 'Genel',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Odalar',
        to: '/oda',
      },
      {
        component: CNavItem,
        name: 'Personel',
        to: '/personel',
      },
      {
        component: CNavItem,
        name: 'Departmanlar',
        to: '/departman',
      },
      {
        component: CNavItem,
        name: 'Departman Kategorileri',
        to: '/departmangrup',
      },
      {
        component: CNavItem,
        name: 'Ölçü Birimleri',
        to: '/birim',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Yiyecek/İçecek',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Yemek Kategorileri',
        to: '/yemekgrup',
      },
      {
        component: CNavItem,
        name: 'Yemek Çeşitleri',
        to: '/yemek',
      },
      {
        component: CNavItem,
        name: 'Yemeğin İçeriği',
        to: '/yemekmalzeme2',
      },
      {
        component: CNavGroup,
        name: 'Malzeme Bilgileri',
        icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Malzeme Kategorileri',
            to: '/malzemebasegrup',
          },
          {
            component: CNavItem,
            name: 'Malzeme Çeşitleri',
            to: '/malzemebase',
          },
          {
            component: CNavItem,
            name: 'Malzeme Fiyatları',
            to: '/malzemefiyat2',
          },
          {
            component: CNavItem,
            name: 'Malzeme Fiyat Ayarı',
            to: '/malzemefiyatduzeltme',
          },
        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Hesap Planı',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sınıf',
        to: '/sinif',
      },
      {
        component: CNavItem,
        name: 'Grup',
        to: '/grup',
      },
      {
        component: CNavItem,
        name: 'Ana Hesap',
        to: '/anahesap',
      },
      {
        component: CNavItem,
        name: 'Alt Hesap',
        to: '/althesap',
      },
      {
        component: CNavItem,
        name: 'Kart',
        to: '/kart',
      },
      {
        component: CNavItem,
        name: 'Alt Kart',
        to: '/altkart',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Bütçe Kısmı',
  },

  {
    component: CNavGroup,
    name: 'Bütçe Tanımları',
    icon: <CIcon icon={cilBalanceScale} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Bütçe Tanımlama',
        to: '/butce',
      },
      {
        component: CNavItem,
        name: 'Bütçe Periodları',
        to: '/butceperiod',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Gelir/Gider Girişi',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Odalar Bölümü',
        to: '/forecastoda',
      },
      {
        component: CNavItem,
        name: 'Yiyecek/İçecek Bölümü',
        to: '/forecastyemek',
      },
      {
        component: CNavItem,
        name: 'Personel Bölümü',
        to: '/forecastpersonel',
      },

      {
        component: CNavItem,
        name: 'Diğer Gelir/Gider',
        to: '/forecastdigergelirgider',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Bütçe Tabloları',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Bütçe Tabloları',
        to: '/butcesayfa',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Yardım',
  },
  {
    component: CNavGroup,
    name: 'Destek',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mail Gönder',
        href: 'mailto:fullstackdogangolcuk@gmail.com?subject=Otel Bütçeleme Destek',
        icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
        //to: '/',
      },
    ],
  },
]

export default _nav
