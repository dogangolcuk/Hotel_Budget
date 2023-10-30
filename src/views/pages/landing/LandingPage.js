import { cibArchLinux, cibFacebook, cibFacebookF } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCollapse,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRepeat,
  ArrowsMove,
  BagX,
  BarChartLine,
  BrowserChrome,
  Calculator,
  CardChecklist,
  Cash,
  CheckLg,
  Clipboard2Data,
  CupHot,
  DoorOpen,
  EmojiSunglasses,
  EnvelopeAt,
  Facebook,
  GeoAlt,
  Instagram,
  Linkedin,
  Person,
  PersonCircle,
  Twitter,
  Whatsapp,
} from 'react-bootstrap-icons'
import { HashLink } from 'react-router-hash-link'
import SoftwareProperties from 'src/views/widgets/SoftwareProperties'
import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'
import './assets/css/landingpage.css'
import useScrollSpy from 'react-use-scrollspy'
import AOS from 'aos'
import 'aos/dist/aos.css'

const LandingPage = () => {
  const [visible, setVisible] = useState(false)
  const navbarRef = useRef(null)
  const [isShowModal, setisShowModal] = useState(false)
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  const activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs,
    offsetPx: -80,
  })

  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    function handleScroll() {
      const navbar = navbarRef.current
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('scrolled')
        } else {
          navbar.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fakebody">
      {/* Harita Modal */}
      <CModal visible={isShowModal} onClose={() => setisShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Adres</CModalTitle>
        </CModalHeader>
        <CModalBody className="text-center">
          <iframe
            title="Adres"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.917679331918!2d32.82849581561923!3d39.92085839357086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f22a401ef21%3A0x734cd5b885356a39!2sYukar%C4%B1%20Bah%C3%A7elievler%2C%2076.%20Sk.%20No%3A42%2C%2006490%20%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1673106743861!5m2!1str!2str"
            width="400"
            height="300"
            style={{ border: '0' }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </CModalBody>
      </CModal>

      {/* Navbar */}

      <CNavbar id="navbar" ref={navbarRef} className="fixed-top navbar-expand-lg navbar">
        <CContainer>
          <CNavbarBrand href="#">
            <CIcon icon={cibArchLinux}></CIcon>OtelBütçe
          </CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav className="mx-auto navbar">
              <div
                className={
                  activeSection === 0
                    ? 'App-navigation-item App-navigation-item--active'
                    : 'App-navigation-item'
                }
              >
                <CNavItem className="navlink">
                  <HashLink className="customa" to="#home">
                    Ana Sayfa
                  </HashLink>
                </CNavItem>
              </div>
              <div
                className={
                  activeSection === 1
                    ? 'App-navigation-item App-navigation-item--active'
                    : 'App-navigation-item'
                }
              >
                <CNavItem className="navlink">
                  <HashLink className="customa" to="#ozellikler">
                    Özellikler
                  </HashLink>
                </CNavItem>
              </div>
              <div
                className={
                  activeSection === 2
                    ? 'App-navigation-item App-navigation-item--active'
                    : 'App-navigation-item'
                }
              >
                <CNavItem className="navlink">
                  <HashLink className="customa" to="#ekrangoruntu">
                    Ekran Görüntüleri
                  </HashLink>
                </CNavItem>
              </div>
              <div
                className={
                  activeSection === 3
                    ? 'App-navigation-item App-navigation-item--active'
                    : 'App-navigation-item'
                }
              >
                <CNavItem className="navlink">
                  <HashLink className="customa" to="#fiyat">
                    Fiyat
                  </HashLink>
                </CNavItem>
              </div>
              <div
                className={
                  activeSection === 4
                    ? 'App-navigation-item App-navigation-item--active'
                    : 'App-navigation-item'
                }
              >
                <CNavItem className="navlink">
                  <HashLink className="customa" to="#iletisim">
                    İletişim
                  </HashLink>
                </CNavItem>
              </div>
            </CNavbarNav>

            <CNavbarNav>
              <CNavItem>
                {/* <CNavLink href="#/dashboard"> */}
                {/* <CTooltip content="Üye Girişi"> */}

                {/* </CTooltip> */}
                <a className="customa" href="https://www.linkedin.com/company/infotech360ik">
                  <Linkedin className="social-icon" />
                </a>
                <a className="customa" href="https://www.facebook.com/infotech360.ik">
                  <Facebook className="social-icon" />
                  {/* <CIcon icon={cibFacebookF} size="xxl" className="social-icon" /> */}
                </a>
                <a className="customa" href="https://www.instagram.com/infotech360.ik">
                  <Instagram className="social-icon" />
                </a>
                <a className="customa" href="https://twitter.com/infotech360ik">
                  <Twitter className="social-icon" />
                </a>

                <a className="customa" href="https://wa.me/905321352325">
                  <Whatsapp className="social-icon" />
                </a>
                {/* </CNavLink> */}
                <a className="" href="#/login">
                  {/* <span className="memberbutton">Üye Girişi</span> */}
                  <button className="memberbutton">Üye Girişi</button>
                  {/* <PersonCircle className="member-icon" /> */}
                </a>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
      {/* Home */}
      <section id="home" ref={sectionRefs[0]} className="d-flex align-items-center min-vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <h1
                className="customh1 display-2 fw-bold"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <span className="text-brand">OtelBütçe</span> ile Yıllık Bütçe Hazırlamak Artık Çok
                Kolay
              </h1>
              <h4
                className="mt-5 mb-5"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="100"
              >
                Excel tabloları her zaman yeterli olmayabilir ve sinir bozucu olabilirler. Otellere
                özel hazırlanan bütçe yazılımını inceleyin.
              </h4>
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <a
                  href="mailto:info@info-tech360.com?subject=Otel Bütçeleme Demo Talebi"
                  className="btn btn-brand"
                >
                  Tanıtım İste
                </a>
              </div>
            </div>
            <div id="homepic" className="col-lg-6"></div>
          </div>
        </div>
      </section>

      {/* Yazılım Özellikleri */}
      <section id="ozellikler" ref={sectionRefs[1]} className="section-padding section-connector">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <div className="col-12">
              <div className="section-title text-center">
                <h1 className="customh1">Programın Özellikleri</h1>
                <p>Kolay kullanışlı ve detaylı.</p>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div
            className="row gy-4 text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<ArrowRepeat />}
                title="Birden Fazla Senaryo"
                description="Farklı durumlar için farklı senaryolar oluşturun.İstediğinizi aktif/pasif hale
                  getirin."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<ArrowsMove />}
                title="Esnek Bütçe Periodu"
                description="Esnek biçimde bütçe periodu oluşturun.Farklı durumlara farklı bütçe periodları
                  oluşturabilirsiniz."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<CardChecklist />}
                title="Bütçe Özet Tablosu"
                description="Tüm gelir/giderlerinizi tek sayfada görün. Tek bakışta tüm mali durumunuzu
                  görün."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<BagX />}
                title="Bütçede Dilediğinizi Gizleyin"
                description="Oluşturduğunuz gelir/giderlerden dilediğinizi bütçede gösterin."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<Calculator />}
                title="Enflasyon Odaklı"
                description="Önümüzdeki bir yılın tüm hesaplamalarını enflasyon odaklı hesaplar. Siz bugünün
                  fiyatlarını girersiniz."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<Clipboard2Data />}
                title="Bütçe Detay Tablosu"
                description=" Tüm gelir/giderleriniz üzerindeki ayrıntılı ve karmaşık hesaplamaları sadece
                  mouse ile seçerek inceleyin."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<BarChartLine />}
                title="Bütçe Grafikleri"
                description="Gelir/Giderlerinize tek grafikte tek bakışta bakarak saniyeler içinde otelinizin
                  yıllık mali durumunu anlayın."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<CupHot />}
                title="Yiyecek Maliyeti"
                description="Yiyecek/İçecek maliyetlerinizi hassas bir şekilde hesaplayın. Ne kadar
                  yiyecek/içecek harcanması gerekir yazılımdan tavsiye alın."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<Person />}
                title="Personel Maliyeti"
                description=" Yıllık çalışan veya sezonluk çalışan personel için ayrı bütçe periodları
                  oluşturabilirsiniz."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<DoorOpen />}
                title="Oda Gelir/Giderleri"
                description="Oda gelir giderlerinize ilişkin kayıtlara tek ekranda hem gelir hem giderinizi
                  girebilirsiniz."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<Cash />}
                title="Her Gelirin Gideri Vardır"
                description="Oda/Personel/Yiyecek/Diğer kategorileri altında gelir veya giderinizi tek
                  satırda görürsünüz."
              />
            </div>

            <div className="col-lg-3 col-sm-6">
              <SoftwareProperties
                icon={<EmojiSunglasses />}
                title="Kısa Eğitim Süresi"
                description="Kısa bir eğitim sonrası programı kullanmaya hazır hale gelirsiniz. Sade tasarıma
                  sahiptir."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ekran Görüntüleri */}
      <section id="ekrangoruntu" ref={sectionRefs[2]} className="section-padding section-connector">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <div className="col-12">
              <div className="section-title text-center">
                <h1 className="customh1">Ekran Görüntüleri</h1>
                <p>Yazılım Ekran Görüntülerinden Örnekler.</p>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div className="row g-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <div className="col-lg-4 col-sm-6">
              <div className="project">
                <img className="customimg" src={require('./assets/images/p1.png')} alt="p1" />
                <div className="content">
                  <a
                    href={require('./assets/images/p1.png')}
                    data-fancybox="gallery"
                    className="btn"
                  >
                    Göster
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="project">
                <img className="customimg" src={require('./assets/images/p2.png')} alt="p1" />
                <div className="content">
                  <a
                    href={require('./assets/images/p2.png')}
                    data-fancybox="gallery"
                    className="btn"
                  >
                    Göster
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="project">
                <img className="customimg" src={require('./assets/images/p3.png')} alt="p1" />
                <div className="content">
                  <a
                    href={require('./assets/images/p3.png')}
                    data-fancybox="gallery"
                    className="btn"
                  >
                    Göster
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="project">
                <img className="customimg" src={require('./assets/images/p4.png')} alt="p1" />
                <div className="content">
                  <a
                    href={require('./assets/images/p4.png')}
                    data-fancybox="gallery"
                    className="btn"
                  >
                    Göster
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="project">
                <img className="customimg" src={require('./assets/images/p5.png')} alt="p1" />
                <div className="content">
                  <a
                    href={require('./assets/images/p5.png')}
                    data-fancybox="gallery"
                    className="btn"
                  >
                    Göster
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="project">
                <img className="customimg" src={require('./assets/images/p6.png')} alt="p1" />
                <div className="content">
                  <a
                    href={require('./assets/images/p6.png')}
                    data-fancybox="gallery"
                    className="btn"
                  >
                    Göster
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fiyat */}
      <section id="fiyat" ref={sectionRefs[3]} className="section-padding section-connector">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="col-12">
              <div className="section-title-price text-center">
                <h1 className="customh1">Abonelik Fiyatları</h1>
                <p>Rekabetçi Fiyatlarla Az Miktara Çok Fayda Sağlayın</p>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div
            className="row text-center align-items-end"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <div className="col-lg-6 col-sm-6 py-5 px-5">
              <div className="">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="customh1 text-price mb-4">AYLIK ÜYELİK</h1>
                  <h2 className="customh2 font-weight-bold">
                    $49<span className=" text-small font-weight-normal ml-2">/ aylık</span>
                  </h2>

                  <div className="price-separator my-4 mx-auto"></div>

                  <ul className="list-unstyled my-5 text-small text-left">
                    <li className="mb-3">
                      <i className=""></i> 7/24 teknik destek
                    </li>
                    <li className="mb-3">
                      <i className=""></i> Sınırsız Kayıt
                    </li>
                    <li className="mb-3">
                      <i className=""></i> Veri Yedekleme
                    </li>
                    <li className="mb-3 text-muted">
                      <i className="fa fa-times mr-2"></i>
                      <del>Grup Eğitimi</del>
                    </li>
                    <li className="mb-3 text-muted">
                      <i className="fa fa-times mr-2"></i>
                      <del>Zoom Uzman Desteği</del>
                    </li>
                    <li className="mb-3 text-muted">
                      <i className="fa fa-times mr-2"></i>
                      <del>Canlı Destek</del>
                    </li>
                  </ul>
                  <HashLink className="navlink btn btn-brand" to="#iletisim">
                    Talep Et
                  </HashLink>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 py-5 px-5">
              <div className="price">
                <div className="bg-white p-5 rounded-lg shadow">
                  <h1 className="customh1 text-price mb-4">YILLIK ÜYELİK</h1>
                  <h2 className="customh2 font-weight-bold">
                    $499<span className=" text-small font-weight-normal ml-2">/ yıllık</span>
                  </h2>

                  <div className="price-separator my-4 mx-auto"></div>

                  <ul className="list-unstyled my-5 text-small text-left">
                    <li className="mb-3">
                      <i className=""></i> 7/24 teknik destek
                    </li>
                    <li className="mb-3">
                      <i className=""></i> Sınırsız Kayıt
                    </li>
                    <li className="mb-3">
                      <i className=""></i> Veri Yedekleme
                    </li>
                    <li className="mb-3 text-brand ">
                      <p className="mr-2">
                        Grup Eğitimi
                        <CheckLg color="green" size={28} />
                      </p>
                    </li>
                    <li className="mb-3 text-brand">
                      <p className="mr-2">
                        Zoom Uzman Desteği <CheckLg color="green" size={28} />
                      </p>
                    </li>
                    <li className="mb-3 text-brand">
                      <p className="mr-2">
                        Canlı Destek <CheckLg color="green" size={28} />
                      </p>
                    </li>
                  </ul>
                  <HashLink className="navlink btn btn-brand" to="#iletisim">
                    Talep Et
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İletişim */}
      <section id="iletisim" ref={sectionRefs[4]} className="section-padding section-connector">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <div className="col-12">
              <div className="section-title text-center">
                <h1 className="customh1">İletişim</h1>
                <p>Bize Herzaman Ulaşabilirsiniz.</p>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div
            className="row text-center align-items-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <div className="col-lg-3 col-sm-3">
              <div className="contact">
                <div className="contact-icon">
                  <GeoAlt
                    onClick={() => {
                      setisShowModal(true)
                    }}
                  />
                </div>
                <h5 className="mt-4">Adres</h5>
                <p>Yukarı Bahçelievler Mah. 76. Sok. 42/9 Çankaya / ANKARA Türkiye </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3">
              <div className="contact">
                <div className="contact-icon">
                  <a className="customa" href="https://wa.me/905321352325">
                    <Whatsapp />
                  </a>
                </div>
                <h5 className="mt-4">Telefon</h5>
                <p>0 (312) 223 06 23</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3">
              <div className="contact">
                <div className="contact-icon">
                  <a
                    className="customa"
                    href="mailto:info@info-tech360.com?subject=Otel Bütçeleme Demo Talebi"
                  >
                    <EnvelopeAt />
                  </a>
                </div>
                <h5 className="mt-4">EMail</h5>
                <p>info@info-tech360.com</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-3">
              <div className="contact">
                <div className="contact-icon">
                  <a className="customa" href="https://www.infotekdanismanlik.com/">
                    <BrowserChrome />
                  </a>
                </div>
                <h5 className="mt-4">Web Sitesi</h5>
                <p>
                  <a className="customa" href="https://www.infotekdanismanlik.com/">
                    https://www.infotekdanismanlik.com/
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section
        id="footer"
        className=""
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <footer>
          <div className="footer-top">
            <div className="container">
              <div className="row gy-5">
                <div className="col-md-4">
                  <h4>
                    <CIcon icon={cibArchLinux}></CIcon>
                    <HashLink className="customab" to="#">
                      OtelBütçe
                    </HashLink>
                  </h4>
                  <p>Otel Bütçeleme Yazılımı</p>
                  <a className="customab" href="https://www.instagram.com/infotech360.ik">
                    <Instagram className="social-icon" />
                  </a>
                  <a className="customab" href="https://twitter.com/infotech360ik">
                    <Twitter className="social-icon" />
                  </a>
                  <a className="customab" href="https://www.facebook.com/infotech360.ik">
                    <Facebook className="social-icon" />
                  </a>
                  <a className="customab" href="https://www.linkedin.com/company/infotech360ik">
                    <Linkedin className="social-icon" />
                  </a>
                  <a className="customab" href="https://wa.me/905321352325">
                    <Whatsapp className="social-icon" />
                  </a>
                </div>
                <div className="col-md-3 ms-auto">
                  <h4>Linkler</h4>
                  <ul>
                    <li>
                      <HashLink className="customab" to="#">
                        Ana Sayfa
                      </HashLink>
                    </li>
                    <li>
                      <HashLink className="customab" to="#ozellikler">
                        Pogram Özellikleri
                      </HashLink>
                    </li>
                    <li>
                      <HashLink className="customab" to="#ekrangoruntu">
                        Ekran Görüntüleri
                      </HashLink>
                    </li>
                    <li>
                      <HashLink className="customab" to="#fiyat">
                        Fiyat Bilgileri
                      </HashLink>
                    </li>
                    <li>
                      <HashLink className="customab" to="#iletisim">
                        İletişim
                      </HashLink>
                    </li>
                    <li>
                      <h6>
                        {/* <HashLink to="/login">Üye Girişi</HashLink> */}
                        <a className="customab" href="#/login">
                          Üye Girişi
                        </a>
                      </h6>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <h4>İletişim Bilgileri</h4>
                  <ul>
                    <li>
                      <u>Email:</u> info@info-tech360.com{' '}
                    </li>
                    <li>
                      <u>Telefon:</u> 0-312-223 06 23{' '}
                    </li>
                    <li>
                      <u>WhatsApp:</u> 0-532-135 23 25
                    </li>
                    <li>
                      <u>Adres:</u> Yukarı Bahçelievler Mah. 76. Sok. 42/9 Çankaya / ANKARA Türkiye
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-auto">
                  <p className="mb-0">Copyright &copy; InfoTek Bilişim</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default LandingPage
