# Otel Bütçeleme Yazılımı

> Oteller için bütçelemeyi kolay ve etkili bir şekilde yapmayı sağlar.

## RoadMAP

> Eklenecek Yeni Özellikler

- Bütçe Tablosunu Excele Aktarma
- PDFkit ile özgün bir bütçe tablosu raporu hazırlama
- Gerçeklenen Bütçe ile Planlanan Bütçe Arasında analiz yapma.
- Oteller için admin paneli ve rol bazlı kullanıcı ekleyebilmesi.
- Ödeme altyapısı entegresi ile kolay abonelik satın alabilmesi.
- Landing Page dizaynı
- Refresh token ile authenticate sistemi.
- Verilerin yedeklenmesinin otomatikleşmesi.
- Yemek Fiyat listesi sayfasında daha pratik giriş sağlanması.
- Syncfusion , Devexpress.js tarzı daha aktif yönetilen component paketlerine geçiş.
- Pivot Table ın türkçeleştirilmesi

> Bug Fix

- React componentlere key eklenecek.
- Unused variables olan değerler silinecek.
- getAllFieldSearch metotlarında başlangıç olarak {} boş object geliyor. undefined gelen parametreler sequelize da hata vermesine neden oluyor.
- TableSearchBox componentinde number fieldlere başlangç değeri verilmediğinde sequelize undefined hatası alıyorum.
  - const [searchTerm, setSearchTerm] = useState({ id: -1, gelir_miktar: -1, gider_miktar: -1 })

## Program Tarihçesi

| Tarih      | Açıklama                                                                         |
| ---------- | -------------------------------------------------------------------------------- |
| 08.09.2022 | React, Express.js, Node.js teknolojilerini tanıma.                               |
| 23.09.2022 | ER Diagram çizimleri için bilgi toplama.                                         |
| 08.10.2022 | İlk ER Diagram çizimleri yapıldı. Modeller oluşturuldu.                          |
| 11.11.2022 | Express.js apiler yazıldı. React frontend sayfaları yapılmaya başlandı.          |
| 17.11.2022 | Bütçe sayfası oluşturuldu.                                                       |
| 13.12.2022 | İlk sunum yapıldı.                                                               |
| 19.12.2022 | Programa multitenant ve authenticate eklendi.                                    |
| 26.12.2022 | Programa admin , login, basit bir landing page eklendi.                          |
| 28.12.2022 | Programın test için deploy edilmesi için gözden geçirildi.                       |
|            | Backend ve Frontend'in iki ayrı port yerine tek porttan çalıştırılması sağlandı. |
|            | Program monolitik hale getirildi.                                                |
| 02.01.2023 | Program deploy edildi.        |
| 10.01.2023 | Landing Page ve User Login Page dizaynı yenilendi.                               |
| 15.02.2023 | Projeye ara verildi.                                                             |


## Görüş ve Öneriler

- Buraya programla ilgili akla gelen herhangi bir öneri , geliştirme , fikir vs yazılabilir.
