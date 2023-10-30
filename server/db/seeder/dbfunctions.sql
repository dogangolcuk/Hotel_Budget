CREATE OR REPLACE FUNCTION public.yemek_maliyet(_miktar double precision DEFAULT 0.0, _fire_orani double precision DEFAULT 0.0, _birim_fiyat numeric DEFAULT 0.0, _duzeltme_oran double precision DEFAULT 0.0, _tahmini_enflasyon numeric DEFAULT 0.0) RETURNS numeric LANGUAGE PLPGSQL AS $function$
DECLARE maliyet numeric;
BEGIN
maliyet:= ((_miktar-(_miktar*_fire_orani))*_birim_fiyat)+((_miktar-(_miktar*_fire_orani))*_birim_fiyat)*_duzeltme_oran;
maliyet:= maliyet+ maliyet*_tahmini_enflasyon;
return maliyet;
END;
$function$ ;


CREATE OR REPLACE FUNCTION public.yemek_maliyet_without_enf(_miktar double precision DEFAULT 0.0, _fire_orani double precision DEFAULT 0.0, _birim_fiyat numeric DEFAULT 0.0, _duzeltme_oran double precision DEFAULT 0.0)
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
DECLARE maliyet numeric;
BEGIN
maliyet:= ((_miktar-(_miktar*_fire_orani))*_birim_fiyat)+((_miktar-(_miktar*_fire_orani))*_birim_fiyat)*_duzeltme_oran;
return maliyet;
END;
$function$
;
