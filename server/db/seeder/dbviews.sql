-- public.view_tahmini_musteri source

CREATE OR REPLACE VIEW public.view_tahmini_musteri_sayisi_1
AS SELECT o.ad AS odaad,
    bp.ad AS butceperiodad,
    bp.id AS butceperiod_id,
    COALESCE(o.satilabilir_yatak, 0) AS sat_yatak,
    COALESCE(fo.doluluk_oran, 0.0::double precision) AS doluluk_oran,
    bp.baslama_tarihi,
    bp.bitis_tarihi,
    fo.tenant_id
   FROM forecastoda fo
     LEFT JOIN oda o ON fo.oda_id = o.id
     LEFT JOIN butceperiod bp ON fo.butceperiod_id = bp.id
  WHERE fo.aktif = true;

-- public.view_tahmini_musteri_sayisi source

CREATE OR REPLACE VIEW public.view_tahmini_musteri_sayisi_2
AS SELECT vtm.odaad,
    vtm.butceperiodad,
    vtm.butceperiod_id,
    vtm.sat_yatak,
    vtm.doluluk_oran,
    vtm.baslama_tarihi,
    vtm.bitis_tarihi,
    EXTRACT(day FROM vtm.bitis_tarihi - vtm.baslama_tarihi) + 1::numeric AS gun_sayisi,
    vtm.sat_yatak::double precision * vtm.doluluk_oran * (EXTRACT(day FROM vtm.bitis_tarihi - vtm.baslama_tarihi) + 1::numeric)::double precision AS tahmini_musteri_sayisi,
    vtm.tenant_id
   FROM view_tahmini_musteri_sayisi_1 vtm;

-- public.view_tahmini_musteri_sayisi_3 source

CREATE OR REPLACE VIEW public.view_tahmini_musteri_sayisi_3
AS SELECT vtms.butceperiod_id,
    sum(vtms.tahmini_musteri_sayisi) AS musteri_sayisi,
    vtms.tenant_id
   FROM view_tahmini_musteri_sayisi_2 vtms
  GROUP BY vtms.butceperiod_id, vtms.tenant_id;


-- public.view_tahmini_musteri_sayisi_4 source

CREATE OR REPLACE VIEW public.view_tahmini_musteri_sayisi_4
AS SELECT b.ad AS butce_ad,
    vtms.musteri_sayisi,
    vtms.tenant_id
   FROM view_tahmini_musteri_sayisi_3 vtms
     LEFT JOIN butceperiod b ON b.id = vtms.butceperiod_id;

-- public.view_yemek_icerik source

CREATE OR REPLACE VIEW public.view_yemek_icerik
AS SELECT y.ad AS yemekad,
    ym.yemek_id,
    ml.ad AS malzemead,
    ym.malzemebase_id,
    COALESCE(ym.miktar, 0::double precision) AS miktar,
    COALESCE(ml.fire_orani, 0::double precision) AS fire_orani,
    COALESCE(mf.birim_fiyat, 0.0) AS malzeme_birim_fiyat,
    COALESCE(mfd.duzeltme_oran, 0.0::double precision) AS duzeltme_oran,
    COALESCE(bp.ad, 'undef'::text) AS butce_period_ad,
    COALESCE(bp.id, 0) AS butce_periodid,
    y.tenant_id
   FROM yemek y
     LEFT JOIN yemekmalzeme ym ON y.id = ym.yemek_id
     LEFT JOIN malzemebase ml ON ml.id = ym.malzemebase_id
     LEFT JOIN malzemefiyat mf ON mf.malzemebase_id = ml.id
     LEFT JOIN malzemefiyatduzeltme mfd ON mf.malzemefiyatduzeltme_id = mfd.id
     LEFT JOIN butceperiod bp ON bp.id = mfd.butceperiod_id;

-- public.view_yemek_icerik_distinct source

CREATE OR REPLACE VIEW public.view_yemek_icerik_distinct
AS SELECT DISTINCT vyi.malzemead,
    vyi.malzemebase_id,
    vyi.yemekad,
    vyi.yemek_id,
    vyi.tenant_id
   FROM view_yemek_icerik vyi;

-- public.view_yemek_icerik_maliyet source

CREATE OR REPLACE VIEW public.view_yemek_icerik_maliyet
AS SELECT vyi.yemekad,
    vyi.yemek_id,
    vyi.malzemead,
    vyi.malzemebase_id,
    vyi.miktar,
    vyi.fire_orani,
    vyi.malzeme_birim_fiyat,
    vyi.duzeltme_oran,
    vyi.butce_period_ad,
    vyi.butce_periodid,
    COALESCE(yemek_maliyet_without_enf(vyi.miktar, vyi.fire_orani, vyi.malzeme_birim_fiyat, vyi.duzeltme_oran), 0::numeric) AS malzeme_maliyet,
    vyi.tenant_id
   FROM view_yemek_icerik vyi;

-- public.view_oda_sayisi source

CREATE OR REPLACE VIEW public.view_oda_sayisi
AS SELECT sum(oda.adet) AS oda_sayisi,
    sum(oda.satilabilir_yatak) AS sat_yat_sayisi,
    oda.tenant_id
   FROM oda
  GROUP BY oda.tenant_id;

-- public.view_forecast_personel_1 source

CREATE OR REPLACE VIEW public.view_forecast_personel_1
AS SELECT fp.ad AS forecast_ad,
    fp.gunluk_maliyet,
    p.ad AS personeladi,
    p.soyad AS personelsoyadi,
    b.id AS butceperiod_id,
    b.ad AS butceperiod_ad,
    b.baslama_tarihi,
    b.bitis_tarihi,
    b.tahmini_enflasyon,
    h2.ad AS kategori,
    h.ad AS altkategori,
    fp.tenant_id
   FROM forecastpersonel fp
     LEFT JOIN personel p ON fp.personel_id = p.id
     LEFT JOIN butceperiod b ON fp.butceperiod_id = b.id
     LEFT JOIN hesapaltkart h ON fp.hesapaltkart_id = h.id
     LEFT JOIN butce b2 ON b.butce_id = b2.id
     LEFT JOIN hesapkart h2 ON h.hesapkart_id = h2.id
  WHERE b2.aktif = true AND fp.aktif = true;

  -- public.view_forecast_personel_2 source

CREATE OR REPLACE VIEW public.view_forecast_personel_2
AS SELECT 0 AS gelir,
    EXTRACT(day FROM vfp.bitis_tarihi - vfp.baslama_tarihi) + 1::numeric AS gun_sayisi,
    vfp.gunluk_maliyet * (EXTRACT(day FROM vfp.bitis_tarihi - vfp.baslama_tarihi) + 1::numeric) AS maliyet_outenf,
    vfp.butceperiod_id,
    vfp.butceperiod_ad,
    vfp.tahmini_enflasyon,
    vfp.kategori,
    vfp.altkategori,
    vfp.tenant_id
   FROM view_forecast_personel_1 vfp;

-- public.view_forecast_personel_3 source

CREATE OR REPLACE VIEW public.view_forecast_personel_3
AS SELECT vfp.kategori,
    vfp.altkategori,
    vfp.butceperiod_id,
    vfp.butceperiod_ad,
    vfp.gelir,
    vfp.maliyet_outenf + vfp.maliyet_outenf * vfp.tahmini_enflasyon AS gider,
    vfp.gelir::numeric - (vfp.maliyet_outenf + vfp.maliyet_outenf * vfp.tahmini_enflasyon) AS fark,
    vfp.tenant_id
   FROM view_forecast_personel_2 vfp;

-- public.view_forecast_personel_4 source

CREATE OR REPLACE VIEW public.view_forecast_personel_4
AS SELECT vfp.altkategori,
    sum(vfp.gelir) AS toplam_gelir,
    sum(vfp.gider) AS toplam_gider,
    sum(vfp.fark) AS toplam_fark,
    vfp.tenant_id
   FROM view_forecast_personel_3 vfp
  GROUP BY vfp.altkategori, vfp.tenant_id;

-- public.view_forecast_personel_5 source

CREATE OR REPLACE VIEW public.view_forecast_personel_5
AS SELECT sum(vfp.gelir) AS toplam_gelir,
    sum(vfp.gider) AS toplam_gider,
    sum(vfp.fark) AS toplam_fark,
    vfp.tenant_id
   FROM view_forecast_personel_3 vfp
  GROUP BY vfp.tenant_id;


-- public.view_forecast_oda_1 source

CREATE OR REPLACE VIEW public.view_forecast_oda_1
AS SELECT fo.ad AS forecast_ad,
    fo.doluluk_oran,
    fo.gelir_miktar,
    fo.gider_miktar,
    o.ad AS oda_ad,
    o.adet,
    o.satilabilir_yatak,
    b.id AS butceperiod_id,
    b.ad AS butceperiod_ad,
    b.baslama_tarihi,
    b.bitis_tarihi,
    b.tahmini_enflasyon,
    b2.ad AS butce_ad,
    b2.yil,
    h2.ad AS kategori,
    h.ad AS altkategori,
    fo.tenant_id
   FROM forecastoda fo
     LEFT JOIN oda o ON fo.oda_id = o.id
     LEFT JOIN butceperiod b ON fo.butceperiod_id = b.id
     LEFT JOIN hesapaltkart h ON fo.hesapaltkart_id = h.id
     LEFT JOIN butce b2 ON b.butce_id = b2.id
     LEFT JOIN hesapkart h2 ON h.hesapkart_id = h2.id
  WHERE b2.aktif = true AND fo.aktif = true;

-- public.view_forecast_oda_2 source

CREATE OR REPLACE VIEW public.view_forecast_oda_2
AS SELECT vfo.kategori,
    vfo.altkategori,
    vfo.butceperiod_id,
    vfo.butceperiod_ad,
    EXTRACT(day FROM vfo.bitis_tarihi - vfo.baslama_tarihi) + 1::numeric AS period_gun_sayisi,
    vfo.doluluk_oran * vfo.gelir_miktar::double precision * vfo.adet::double precision * (EXTRACT(day FROM vfo.bitis_tarihi - vfo.baslama_tarihi) + 1::numeric)::double precision AS gelir_outenf,
    vfo.doluluk_oran * vfo.gider_miktar::double precision * vfo.adet::double precision * (EXTRACT(day FROM vfo.bitis_tarihi - vfo.baslama_tarihi) + 1::numeric)::double precision AS gider_outenf,
    vfo.tahmini_enflasyon,
    vfo.tenant_id
   FROM view_forecast_oda_1 vfo;

-- public.view_forecast_oda_3 source

CREATE OR REPLACE VIEW public.view_forecast_oda_3
AS SELECT vfo.kategori,
    vfo.altkategori,
    vfo.butceperiod_id,
    vfo.butceperiod_ad,
    vfo.gelir_outenf + vfo.gelir_outenf * vfo.tahmini_enflasyon::double precision AS gelir,
    vfo.gider_outenf + vfo.gider_outenf * vfo.tahmini_enflasyon::double precision AS gider,
    vfo.gelir_outenf + vfo.gelir_outenf * vfo.tahmini_enflasyon::double precision - (vfo.gider_outenf + vfo.gider_outenf * vfo.tahmini_enflasyon::double precision) AS fark,
    vfo.tenant_id
   FROM view_forecast_oda_2 vfo;

-- public.view_forecast_oda_4 source

CREATE OR REPLACE VIEW public.view_forecast_oda_4
AS SELECT vfo.altkategori,
    sum(vfo.gelir) AS toplam_gelir,
    sum(vfo.gider) AS toplam_gider,
    sum(vfo.fark) AS toplam_fark,
    vfo.tenant_id
   FROM view_forecast_oda_3 vfo
  GROUP BY vfo.altkategori, vfo.tenant_id;

-- public.view_forecast_oda_5 source

CREATE OR REPLACE VIEW public.view_forecast_oda_5
AS SELECT sum(vfo.gelir) AS toplam_gelir,
    sum(vfo.gider) AS toplam_gider,
    sum(vfo.fark) AS toplam_fark,
    vfo.tenant_id
   FROM view_forecast_oda_3 vfo
  GROUP BY vfo.tenant_id;

-- public.view_forecast_yemek_1 source

CREATE OR REPLACE VIEW public.view_forecast_yemek_1
AS SELECT fy.ad AS forecast_ad,
    y.ad AS yemekadi,
    h2.ad AS kategori,
    h.ad AS altkategori,
    fy.miktar,
    fy.satis_fiyat,
    fy.maliyet_fiyat,
    fy.talep_oran,
    b.tahmini_enflasyon,
    b.baslama_tarihi,
    b.bitis_tarihi,
    b.id AS butceperiod_id,
    b.ad AS butceperiod_ad,
    fy.tenant_id
   FROM forecastyemek fy
     LEFT JOIN yemek y ON fy.yemek_id = y.id
     LEFT JOIN butceperiod b ON fy.butceperiod_id = b.id
     LEFT JOIN hesapaltkart h ON fy.hesapaltkart_id = h.id
     LEFT JOIN butce b2 ON b.butce_id = b2.id
     LEFT JOIN hesapkart h2 ON h.hesapkart_id = h2.id
  WHERE b2.aktif = true AND fy.aktif = true;

-- public.view_forecast_yemek_2 source

CREATE OR REPLACE VIEW public.view_forecast_yemek_2
AS SELECT vfy.kategori,
    vfy.altkategori,
    vfy.butceperiod_id,
    vfy.butceperiod_ad,
    vfy.miktar * vfy.satis_fiyat::double precision * vfy.talep_oran AS gelir_outenf,
    vfy.miktar * vfy.maliyet_fiyat::double precision * vfy.talep_oran AS gider_outenf,
    vfy.tahmini_enflasyon,
    vfy.tenant_id
   FROM view_forecast_yemek_1 vfy;

-- public.view_forecast_yemek_3 source

CREATE OR REPLACE VIEW public.view_forecast_yemek_3
AS SELECT vfy.kategori,
    vfy.altkategori,
    vfy.butceperiod_id,
    vfy.butceperiod_ad,
    vfy.gelir_outenf + vfy.gelir_outenf * vfy.tahmini_enflasyon::double precision AS gelir,
    vfy.gider_outenf + vfy.gider_outenf * vfy.tahmini_enflasyon::double precision AS gider,
    vfy.gelir_outenf + vfy.gelir_outenf * vfy.tahmini_enflasyon::double precision - (vfy.gider_outenf + vfy.gider_outenf * vfy.tahmini_enflasyon::double precision) AS fark,
    vfy.tenant_id
   FROM view_forecast_yemek_2 vfy;

-- public.view_forecast_yemek_4 source

CREATE OR REPLACE VIEW public.view_forecast_yemek_4
AS SELECT vfy.altkategori,
    sum(vfy.gelir) AS toplam_gelir,
    sum(vfy.gider) AS toplam_gider,
    sum(vfy.fark) AS toplam_fark,
    vfy.tenant_id
   FROM view_forecast_yemek_3 vfy
  GROUP BY vfy.altkategori, vfy.tenant_id;

-- public.view_forecast_yemek_5 source

CREATE OR REPLACE VIEW public.view_forecast_yemek_5
AS SELECT sum(vfy.gelir) AS toplam_gelir,
    sum(vfy.gider) AS toplam_gider,
    sum(vfy.fark) AS toplam_fark,
    vfy.tenant_id
   FROM view_forecast_yemek_3 vfy
  GROUP BY vfy.tenant_id;


-- public.view_forecast_diger_1 source

CREATE OR REPLACE VIEW public.view_forecast_diger_1
AS SELECT fd.ad AS forecast_ad,
    h2.ad AS kategori,
    h.ad AS altkategori,
    fd.gelir_miktar,
    fd.gider_miktar,
    b.tahmini_enflasyon,
    b.baslama_tarihi,
    b.bitis_tarihi,
    b.id AS butceperiod_id,
    b.ad AS butceperiod_ad,
    fd.tenant_id
   FROM forecastdigergelirgider fd
     LEFT JOIN departman d ON fd.departman_id = d.id
     LEFT JOIN butceperiod b ON fd.butceperiod_id = b.id
     LEFT JOIN hesapaltkart h ON fd.hesapaltkart_id = h.id
     LEFT JOIN butce b2 ON b.butce_id = b2.id
     LEFT JOIN hesapkart h2 ON h.hesapkart_id = h2.id
  WHERE b2.aktif = true AND fd.aktif = true;

-- public.view_forecast_diger_2 source

CREATE OR REPLACE VIEW public.view_forecast_diger_2
AS SELECT vfd.kategori,
    vfd.altkategori,
    vfd.butceperiod_id,
    vfd.butceperiod_ad,
    vfd.gelir_miktar + vfd.gelir_miktar * vfd.tahmini_enflasyon AS gelir,
    vfd.gider_miktar + vfd.gider_miktar * vfd.tahmini_enflasyon AS gider,
    vfd.gelir_miktar + vfd.gelir_miktar * vfd.tahmini_enflasyon - (vfd.gider_miktar + vfd.gider_miktar * vfd.tahmini_enflasyon) AS fark,
    vfd.tenant_id
   FROM view_forecast_diger_1 vfd;

-- public.view_forecast_diger_3 source

CREATE OR REPLACE VIEW public.view_forecast_diger_3
AS SELECT vfd.altkategori,
    sum(vfd.gelir) AS toplam_gelir,
    sum(vfd.gider) AS toplam_gider,
    sum(vfd.fark) AS toplam_fark,
    vfd.tenant_id
   FROM view_forecast_diger_2 vfd
  GROUP BY vfd.altkategori, vfd.tenant_id;

-- public.view_forecast_diger_4 source

CREATE OR REPLACE VIEW public.view_forecast_diger_4
AS SELECT sum(vfd.gelir) AS toplam_gelir,
    sum(vfd.gider) AS toplam_gider,
    sum(vfd.fark) AS toplam_fark,
    vfd.tenant_id
   FROM view_forecast_diger_2 vfd
  GROUP BY vfd.tenant_id;

-- public.view_tum_gelir_gider_1 source

CREATE OR REPLACE VIEW public.view_tum_gelir_gider_1
AS SELECT vfd.toplam_gelir,
    vfd.toplam_gider,
    vfd.toplam_fark,
    vfd.tenant_id
   FROM view_forecast_diger_4 vfd
UNION
 SELECT vfo.toplam_gelir,
    vfo.toplam_gider,
    vfo.toplam_fark,
    vfo.tenant_id
   FROM view_forecast_oda_5 vfo
UNION
 SELECT vfp.toplam_gelir,
    vfp.toplam_gider,
    vfp.toplam_fark,
    vfp.tenant_id
   FROM view_forecast_personel_5 vfp
UNION
 SELECT vfy.toplam_gelir,
    vfy.toplam_gider,
    vfy.toplam_fark,
    vfy.tenant_id
   FROM view_forecast_yemek_5 vfy;

-- public.view_tum_gelir_gider_2 source

CREATE OR REPLACE VIEW public.view_tum_gelir_gider_2
AS SELECT sum(vtgg.toplam_gelir) AS toplam_gelir,
    sum(vtgg.toplam_gider) AS toplam_gider,
    sum(vtgg.toplam_fark) AS toplam_fark,
    vtgg.tenant_id
   FROM view_tum_gelir_gider_1 vtgg
  GROUP BY vtgg.tenant_id;

-- public.view_tahmini_geceleme_1 source

CREATE OR REPLACE VIEW public.view_tahmini_geceleme_1
AS SELECT o.ad AS oda_ad,
    o.adet,
    o.satilabilir_yatak,
    b.ad AS butce_ad,
    b.baslama_tarihi,
    b.bitis_tarihi,
    f.doluluk_oran,
    f.tenant_id
   FROM forecastoda f
     LEFT JOIN oda o ON f.oda_id = o.id
     LEFT JOIN butceperiod b ON f.butceperiod_id = b.id
     LEFT JOIN butce b2 ON b.butce_id = b2.id
  WHERE b2.aktif = true AND f.aktif = true;

-- public.view_tahmini_geceleme_2 source

CREATE OR REPLACE VIEW public.view_tahmini_geceleme_2
AS SELECT vtg.oda_ad,
    vtg.butce_ad,
    vtg.adet::double precision * vtg.doluluk_oran * (EXTRACT(day FROM vtg.bitis_tarihi - vtg.baslama_tarihi) + 1::numeric)::double precision AS geceleme,
    vtg.tenant_id
   FROM view_tahmini_geceleme_1 vtg;

-- public.view_tahmini_geceleme_3 source

CREATE OR REPLACE VIEW public.view_tahmini_geceleme_3
AS SELECT vtg.butce_ad,
    sum(vtg.geceleme) AS toplam_geceleme,
    vtg.tenant_id
   FROM view_tahmini_geceleme_2 vtg
  GROUP BY vtg.butce_ad, vtg.tenant_id;

-- public.view_tum_gelir_gider_3 source

CREATE OR REPLACE VIEW public.view_tum_gelir_gider_3
AS SELECT 'Diğer'::text AS ad,
    vfd.toplam_gelir,
    vfd.toplam_gider,
    vfd.toplam_fark,
    vfd.tenant_id
   FROM view_forecast_diger_4 vfd
UNION
 SELECT 'Oda'::text AS ad,
    vfo.toplam_gelir,
    vfo.toplam_gider,
    vfo.toplam_fark,
    vfo.tenant_id
   FROM view_forecast_oda_5 vfo
UNION
 SELECT 'Personel'::text AS ad,
    vfp.toplam_gelir,
    vfp.toplam_gider,
    vfp.toplam_fark,
    vfp.tenant_id
   FROM view_forecast_personel_5 vfp
UNION
 SELECT 'Yemek'::text AS ad,
    vfy.toplam_gelir,
    vfy.toplam_gider,
    vfy.toplam_fark,
    vfy.tenant_id
   FROM view_forecast_yemek_5 vfy;

-- public.view_tum_gelir_gider_4 source

CREATE OR REPLACE VIEW public.view_tum_gelir_gider_4
AS SELECT 'Diğer'::text AS ad,
    vfd.toplam_gelir,
    vfd.toplam_gider,
    vfd.toplam_fark,
    vfd.tenant_id
   FROM view_forecast_diger_4 vfd
UNION
 SELECT 'Oda'::text AS ad,
    vfo.toplam_gelir,
    vfo.toplam_gider,
    vfo.toplam_fark,
    vfo.tenant_id
   FROM view_forecast_oda_5 vfo
UNION
 SELECT 'Personel'::text AS ad,
    vfp.toplam_gelir,
    vfp.toplam_gider,
    vfp.toplam_fark,
    vfp.tenant_id
   FROM view_forecast_personel_5 vfp
UNION
 SELECT 'Yemek'::text AS ad,
    vfy.toplam_gelir,
    vfy.toplam_gider,
    vfy.toplam_fark,
    vfy.tenant_id
   FROM view_forecast_yemek_5 vfy
UNION
 SELECT 'Tümü'::text AS ad,
    vtgg.toplam_gelir,
    vtgg.toplam_gider,
    vtgg.toplam_fark,
    vtgg.tenant_id
   FROM view_tum_gelir_gider_2 vtgg;

-- public.view_tum_gelir_gider_5 source

CREATE OR REPLACE VIEW public.view_tum_gelir_gider_5
AS SELECT '5_Diğer'::text AS ad,
    vfd.toplam_gelir,
    vfd.toplam_gider,
    vfd.toplam_fark,
    vfd.tenant_id
   FROM view_forecast_diger_4 vfd
UNION
 SELECT '2_Oda'::text AS ad,
    vfo.toplam_gelir,
    vfo.toplam_gider,
    vfo.toplam_fark,
    vfo.tenant_id
   FROM view_forecast_oda_5 vfo
UNION
 SELECT '4_Personel'::text AS ad,
    vfp.toplam_gelir,
    vfp.toplam_gider,
    vfp.toplam_fark,
    vfp.tenant_id
   FROM view_forecast_personel_5 vfp
UNION
 SELECT '3_Yemek'::text AS ad,
    vfy.toplam_gelir,
    vfy.toplam_gider,
    vfy.toplam_fark,
    vfy.tenant_id
   FROM view_forecast_yemek_5 vfy
UNION
 SELECT '1_Tümü'::text AS ad,
    vtgg.toplam_gelir,
    vtgg.toplam_gider,
    vtgg.toplam_fark,
    vtgg.tenant_id
   FROM view_tum_gelir_gider_2 vtgg;

-- public.view_tahmini_musteri_geceleme_sayisi_1 source

CREATE OR REPLACE VIEW public.view_tahmini_musteri_geceleme_sayisi_1
AS SELECT vtg.butce_ad,
    vtg.toplam_geceleme,
    vtms.musteri_sayisi,
    vtg.tenant_id
   FROM view_tahmini_geceleme_3 vtg
     LEFT JOIN view_tahmini_musteri_sayisi_4 vtms ON vtg.butce_ad = vtms.butce_ad;

-- public.view_personel_sayisi source

CREATE OR REPLACE VIEW public.view_personel_sayisi
AS SELECT count(*) AS count, p.tenant_id
   FROM personel p
  GROUP BY p.tenant_id;


-- public.view_forecast_union_1 source

CREATE OR REPLACE VIEW public.view_forecast_union_1
AS SELECT 'ODA'::text AS butce_bolum,
    vfo.kategori,
    vfo.altkategori,
    vfo.butceperiod_ad,
    vfo.gelir,
    vfo.gider,
    vfo.fark,
    vfo.tenant_id
   FROM view_forecast_oda_3 vfo
UNION
 SELECT 'YEMEK'::text AS butce_bolum,
    vfy.kategori,
    vfy.altkategori,
    vfy.butceperiod_ad,
    vfy.gelir,
    vfy.gider,
    vfy.fark,
    vfy.tenant_id
   FROM view_forecast_yemek_3 vfy
UNION
 SELECT 'PERSONEL'::text AS butce_bolum,
    vfp.kategori,
    vfp.altkategori,
    vfp.butceperiod_ad,
    vfp.gelir,
    vfp.gider,
    vfp.fark,
    vfp.tenant_id
   FROM view_forecast_personel_3 vfp
UNION
 SELECT 'DIGER'::text AS butce_bolum,
    vfd.kategori,
    vfd.altkategori,
    vfd.butceperiod_ad,
    vfd.gelir,
    vfd.gider,
    vfd.fark,
    vfd.tenant_id
   FROM view_forecast_diger_2 vfd;

-- public.view_forecast_union_2 source

CREATE OR REPLACE VIEW public.view_forecast_union_2
AS SELECT vfu.butce_bolum AS "bütçe_kısmı",
    vfu.kategori,
    vfu.altkategori AS alt_kategori,
    vfu.butceperiod_ad AS "bütçe_periodu",
    vfu.gelir::numeric(16,2) AS gelir,
    vfu.gider::numeric(16,2) AS gider,
    vfu.fark::numeric(16,2) AS fark,
    vfu.tenant_id
   FROM view_forecast_union_1 vfu;

-- public.view_forecast_union_3 source

CREATE OR REPLACE VIEW public.view_forecast_union_3
AS SELECT COALESCE(vfu.butce_bolum, '---'::text) AS "bütçe_kısmı",
    COALESCE(vfu.kategori, '---'::text) AS kategori,
    COALESCE(vfu.altkategori, '---'::text) AS alt_kategori,
    COALESCE(vfu.butceperiod_ad, '---'::text) AS "bütçe_periodu",
    COALESCE(vfu.gelir::numeric(16,2), 0::numeric) AS gelir,
    COALESCE(vfu.gider::numeric(16,2), 0::numeric) AS gider,
    COALESCE(vfu.fark::numeric(16,2), 0::numeric) AS fark,
    vfu.tenant_id
   FROM view_forecast_union_1 vfu;