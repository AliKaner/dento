# DentaFlow — Claude Code Adım Adım Geliştirme Rehberi

Bu dosyayı Claude Code'a ver ve sırayla her adımı uygulat.
Her adım bağımsız bir prompt olarak yapıştırılabilir.

---

## Ön Bilgi

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Lucide React · Prisma · PostgreSQL · NextAuth.js

**Hedef:** Küçük dişçi klinikleri için randevu, hasta, muayene, finans, stok, raporlama modülleri.

---

## ADIM 1 — Proje İskeleti

```
Next.js 15 App Router + TypeScript projesi oluştur.
Adı: dentaflow
Paket yöneticisi: pnpm

Şu paketleri kur:
- tailwindcss, postcss, autoprefixer
- shadcn/ui (init et, default style: "new-york", base color: "zinc")
- lucide-react
- @prisma/client, prisma
- next-auth@beta
- zod
- date-fns
- react-hook-form @hookform/resolvers
- recharts
- @tanstack/react-query

Klasör yapısı:
src/
  app/
    (auth)/
      login/
    (dashboard)/
      layout.tsx          ← sidebar + header içeren ana layout
      page.tsx            ← dashboard ana sayfa
      appointments/
      patients/
      exam/
      finance/
      inventory/
      reports/
      clinic/
      integrations/
  components/
    ui/                   ← shadcn bileşenleri buraya
    layout/
      Sidebar.tsx
      Header.tsx
      PageHeader.tsx
    shared/
  lib/
    prisma.ts
    auth.ts
    utils.ts
  hooks/
  types/

.env.local dosyası oluştur:
DATABASE_URL="postgresql://postgres:password@localhost:5432/dentaflow"
NEXTAUTH_SECRET="CHANGE_ME"
NEXTAUTH_URL="http://localhost:3000"
```

---

## ADIM 2 — Veritabanı Şeması (Prisma)

```
prisma/schema.prisma dosyasını oluştur.
PostgreSQL provider kullan.

Şu modelleri tanımla:

User {
  id, email, name, password (hashed), role (OWNER | DOCTOR | ASSISTANT | RECEPTIONIST),
  clinicId, createdAt, updatedAt
}

Clinic {
  id, name, phone, address, taxId, logoUrl, createdAt
  relations: users, patients, appointments, invoices, inventory
}

Patient {
  id, clinicId,
  firstName, lastName, phone, email, birthDate,
  gender (MALE | FEMALE | OTHER),
  nationalId, address,
  bloodType, allergies (String[]), notes,
  insuranceCompany, insuranceNo,
  createdAt, updatedAt
  relations: appointments, examRecords, invoices, documents
}

Appointment {
  id, clinicId, patientId, doctorId (User),
  date, durationMin (default 30),
  status (SCHEDULED | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELLED | NO_SHOW),
  type (CHECKUP | TREATMENT | XRAY | CLEANING | SURGERY | OTHER),
  notes, reminderSent,
  createdAt, updatedAt
}

ExamRecord {
  id, patientId, doctorId, appointmentId,
  chiefComplaint, clinicalNotes,
  toothChart (Json),         ← odontogram verisi
  treatmentPlan (Json),
  prescriptions (Json),
  photos (String[]),         ← dosya URL'leri
  createdAt, updatedAt
}

Invoice {
  id, clinicId, patientId,
  invoiceNo, status (DRAFT | SENT | PAID | PARTIAL | OVERDUE | CANCELLED),
  items (Json),              ← [{name, qty, unitPrice, total}]
  subtotal, taxRate, taxAmount, discount, total,
  paidAmount, dueDate,
  paymentMethod (CASH | CARD | TRANSFER | INSURANCE),
  notes,
  createdAt, updatedAt
}

InventoryItem {
  id, clinicId, name, category, unit,
  currentStock, minStock, unitCost,
  supplierId, expiryDate, notes,
  createdAt, updatedAt
}

Supplier {
  id, clinicId, name, phone, email, address, notes
}

StockMovement {
  id, itemId, type (IN | OUT | ADJUSTMENT),
  quantity, note, userId, createdAt
}

Document {
  id, patientId, type (XRAY | PHOTO | LAB | CONSENT | OTHER),
  fileName, fileUrl, fileSize, mimeType,
  uploadedById, createdAt
}

AuditLog {
  id, clinicId, userId, action, entity, entityId,
  oldData (Json), newData (Json), ip, createdAt
}

Prisma migrate çalıştır: npx prisma migrate dev --name init
Seed dosyası oluştur (prisma/seed.ts): 1 klinik, 2 kullanıcı (owner + doctor), 5 hasta, 10 randevu örnek verisi ekle.
```

---

## ADIM 3 — Auth (NextAuth v5)

```
NextAuth v5 (beta) kurulumunu tamamla.

src/lib/auth.ts dosyasını oluştur:
- Credentials provider: email + password ile giriş
- Bcrypt ile şifre karşılaştırma (bcryptjs kur)
- Session'a user.role ve user.clinicId ekle
- JWT strategy

src/app/api/auth/[...nextauth]/route.ts oluştur.

src/app/(auth)/login/page.tsx:
- Ortada konumlanmış login formu
- DentaFlow logo ve ismi üstte
- Email + Password alanları
- react-hook-form + zod validasyon
- Hata mesajları göster
- Dark tema (#13151f arka plan)

src/middleware.ts:
- /dashboard ve alt rotaları koru
- Giriş yapılmamışsa /login'e yönlendir
- Giriş yapılmışsa /login'e gitmeyi engelle

Tip genişletme: next-auth.d.ts → Session tipine role ve clinicId ekle.
```

---

## ADIM 4 — Layout (Sidebar + Header)

```
src/components/layout/Sidebar.tsx oluştur.

Aşağıdaki nav config'i kullan (Lucide ikonları ile):

SECTIONS:
  "Ana Menü":
    - Randevu Yönetimi → /appointments  (Calendar ikonu, mavi)
    - Hasta Yönetimi   → /patients      (Users ikonu, mor)
    - Klinik Muayene   → /exam          (ClipboardCheck ikonu, turuncu)
    - Finans ve Fatura → /finance       (DollarSign ikonu, amber)
    - Stok ve Malzeme  → /inventory     (Package ikonu, yeşil)

  "Destek Katmanı":
    - Raporlar         → /reports       (BarChart2 ikonu, sky)
    - Hasta Uygulaması → /patient-app   (Smartphone ikonu, pembe)
    - Klinik Yönetim   → /clinic        (Radio ikonu, slate)
    - Entegrasyonlar   → /integrations  (Share2 ikonu, kırmızı)

Her nav item accordion şeklinde açılır/kapanır.
Alt itemlar (subItems) aşağıda listelenmiş nav config ile eşleşsin.
Aktif route highlight edilsin (usePathname).

Tasarım:
- Arka plan: #13151f
- Genişlik: 260px
- Alt kısımda kullanıcı kartı (isim, rol, avatar)
- Icon wrapper'lar renkli (bg-{color}-900/60)
- Chevron animasyonlu dönüş

src/components/layout/Header.tsx:
- Breadcrumb (usePathname'den otomatik üret)
- Sağda: bildirim zili (Bell ikonu, sayaç badge), kullanıcı dropdown (profil, çıkış)
- Arka plan: #0f1117, border-bottom

src/app/(dashboard)/layout.tsx:
- Sol: Sidebar (sabit)
- Sağ: Header (üst) + main (içerik, overflow-y-auto)
- Tam ekran flex layout
```

---

## ADIM 5 — Dashboard Ana Sayfa

```
src/app/(dashboard)/page.tsx oluştur.

Üst kısım — 4 özet kart (KPI):
  1. Bugünkü Randevular → veritabanından çek
  2. Bekleyen Ödemeler  → fatura tablosundan çek
  3. Toplam Aktif Hasta → hasta sayısı
  4. Kritik Stok Uyarısı → currentStock < minStock

Orta sol — "Bugünün Randevuları" listesi:
  - Saat, hasta adı, doktor, durum badge'i
  - Durum renkleri: SCHEDULED=mavi, CONFIRMED=yeşil, COMPLETED=gri, CANCELLED=kırmızı

Orta sağ — Recharts ile "Son 7 Gün Gelir" bar chart:
  - Günlük toplam fatura tutarı
  - Renk: #3b82f6

Alt — "Son Eklenen Hastalar" tablosu (5 kayıt):
  - Ad soyad, telefon, kayıt tarihi, son randevu

Tüm veriler server component olarak Prisma ile çekilsin.
Loading skeleton'lar ekle (Suspense boundary kullan).
```

---

## ADIM 6 — Randevu Modülü

```
src/app/(dashboard)/appointments/ altında şunları oluştur:

page.tsx → Randevu listesi
  - Üstte filtreler: tarih aralığı, doktor seç, durum seç
  - Tablo: saat, hasta, doktor, tür, durum, aksiyonlar (düzenle/iptal)
  - Yeni Randevu butonu (sağ üst)
  - Sayfalama (10'ar kayıt)

new/page.tsx → Yeni randevu formu
  - react-hook-form + zod
  - Hasta seç (combobox, arama destekli)
  - Doktor seç
  - Tarih + saat seç (date picker)
  - Süre (15/30/45/60 dk)
  - Tür seç
  - Notlar
  - Kaydet → /appointments'a yönlendir

[id]/page.tsx → Randevu detay
  - Randevu bilgileri
  - Hasta özet kartı (yan panel)
  - Durum güncelleme butonları
  - İlgili muayene kaydı linki

calendar/page.tsx → Haftalık takvim görünümü
  - 7 günlük grid (sütunlar = günler, satırlar = saatler 08:00–19:00)
  - Randevular renkli blok olarak gösterilsin
  - Tıklayınca detay popover açılsın

Server Actions oluştur (src/app/(dashboard)/appointments/actions.ts):
  - createAppointment(data)
  - updateAppointmentStatus(id, status)
  - cancelAppointment(id, reason)
  - getAppointmentsForDay(date)
```

---

## ADIM 7 — Hasta Modülü

```
src/app/(dashboard)/patients/ altında:

page.tsx → Hasta listesi
  - Arama (ad, telefon, TC)
  - Tablo: ad, doğum tarihi, telefon, son randevu, kayıt tarihi
  - Yeni Hasta butonu

new/page.tsx → Hasta kayıt formu
  - Kişisel bilgiler: ad, soyad, TC, telefon, email, doğum tarihi, cinsiyet
  - İletişim: adres
  - Sağlık: kan grubu, alerjiler (etiket girişi), notlar
  - Sigorta: şirket adı, poliçe no

[id]/page.tsx → Hasta profili (tab yapısı)
  Tab 1 — Genel Bilgiler: kişisel + iletişim + sigorta
  Tab 2 — Randevular: hasta randevu geçmişi + yeni randevu butonu
  Tab 3 — Muayene Kayıtları: exam record listesi
  Tab 4 — Belgeler: dosya listesi + yükleme
  Tab 5 — Faturalar: fatura geçmişi + bakiye özeti

[id]/documents/upload → Belge yükleme
  - Dosya seç (xray, fotoğraf, lab, izin belgesi)
  - Tür seç
  - /api/upload endpoint (Next.js route handler, dosyayı /public/uploads kaydet)

Server Actions (patients/actions.ts):
  - createPatient(data)
  - updatePatient(id, data)
  - searchPatients(query)
```

---

## ADIM 8 — Klinik Muayene Modülü

```
src/app/(dashboard)/exam/ altında:

page.tsx → Muayene kayıtları listesi
  - Filtre: hasta, doktor, tarih
  - Tablo: tarih, hasta, doktor, şikayet özeti

new/page.tsx → Yeni muayene formu
  - Hasta seç (URL'den appointmentId ile otomatik doldur)
  - Şikayet (textarea)
  - Klinik notlar (textarea)
  - Diş şeması (ToothChart bileşeni — aşağıda)
  - Tedavi planı: prosedür ekle (isim, diş no, açıklama, fiyat)
  - Reçete: ilaç adı, doz, kullanım talimatı satırları
  - Kaydet

ToothChart bileşeni (src/components/shared/ToothChart.tsx):
  - FDI notation (11-48 arası dişler)
  - Üst çene 4 kadran, alt çene 4 kadran
  - Her dişe tıklayınca durum seç: HEALTHY | CARIES | FILLED | MISSING | CROWN | IMPLANT | EXTRACTION
  - Durum renkle gösterilsin (yeşil=sağlıklı, sarı=çürük, mavi=dolgulu, gri=eksik, ...)
  - State JSON olarak saklan: { "11": "CARIES", "36": "MISSING", ... }

[id]/page.tsx → Muayene detay (görüntüleme modu)
```

---

## ADIM 9 — Finans Modülü

```
src/app/(dashboard)/finance/ altında:

page.tsx → Fatura listesi
  - Filtreler: durum, tarih aralığı, hasta
  - Tablo: fatura no, hasta, tarih, tutar, ödenen, durum
  - Özet kartlar: toplam alacak, bu ay tahsilat, gecikmiş

invoices/new/page.tsx → Fatura oluşturma
  - Hasta seç
  - Kalem ekle (prosedür adı, adet, birim fiyat → otomatik toplam)
  - İndirim, KDV oranı
  - Vade tarihi
  - Ödeme yöntemi
  - Notlar

invoices/[id]/page.tsx → Fatura detay
  - Fatura bilgileri
  - Ödeme kaydet butonu → ödeme tutarı + yöntem gir
  - Fatura yazdır (print stylesheet ekle)

payments/page.tsx → Ödeme takibi
  - Tüm ödemeler listesi
  - Günlük/haftalık/aylık toplam

installments/page.tsx → Taksit planları
  - Aktif taksit planları
  - Yeni plan oluştur (faturayı böl, aylık ödemeler üret)

Server Actions (finance/actions.ts):
  - createInvoice(data)
  - recordPayment(invoiceId, amount, method)
  - generateInstallmentPlan(invoiceId, installmentCount)
```

---

## ADIM 10 — Stok Modülü

```
src/app/(dashboard)/inventory/ altında:

page.tsx → Stok listesi
  - Kritik stok uyarısı banner (eğer varsa)
  - Tablo: malzeme adı, kategori, stok, min stok, durum, son hareket
  - Durum: OK (yeşil) | LOW (sarı) | CRITICAL (kırmızı)
  - Yeni malzeme butonu

new/page.tsx → Malzeme ekleme formu
  - Ad, kategori, birim, mevcut stok, min stok, birim maliyet
  - Tedarikçi seç, son kullanma tarihi

[id]/movements/page.tsx → Stok hareket geçmişi
  - Giriş/çıkış geçmişi tablo
  - Stok giriş yap / düzeltme yap formu

suppliers/page.tsx → Tedarikçi listesi ve yönetimi

Server Actions (inventory/actions.ts):
  - addStockMovement(itemId, type, qty, note)
  - getLowStockItems()
  - createInventoryItem(data)
```

---

## ADIM 11 — Raporlar Modülü

```
src/app/(dashboard)/reports/ altında:

page.tsx → Rapor ana sayfa (4 kart, her biri ilgili sayfaya link)

occupancy/page.tsx → Doluluk raporu
  - Tarih aralığı seç
  - Recharts: günlük randevu sayısı çizgi grafiği
  - Doktora göre kırılım (bar chart)
  - İptal oranı

revenue/page.tsx → Gelir raporu
  - Aylık gelir bar chart (son 12 ay)
  - Ödeme yöntemine göre dağılım (pie chart)
  - En çok gelir getiren prosedürler tablosu

performance/page.tsx → Hekim performansı
  - Doktor başına randevu sayısı
  - Tamamlama oranı
  - Ortalama randevu süresi

retention/page.tsx → Hasta sadakat analizi
  - Tekrar gelen vs yeni hasta oranı
  - Ortalama ziyaret aralığı
  - Kaybedilen hastalar (6+ ay gelmeyen)

Tüm raporlar için:
  - Tarih aralığı filtresi
  - "CSV olarak indir" butonu (data → CSV dönüşümü client-side)
  - Recharts responsive container kullan
```

---

## ADIM 12 — Klinik Yönetim + Ayarlar

```
src/app/(dashboard)/clinic/ altında:

staff/page.tsx → Personel listesi
  - Tablo: ad, rol, email, telefon, kayıt tarihi
  - Yeni personel davet et (email gönder, geçici şifre)
  - Rol değiştir (sadece OWNER yapabilir)
  - Personeli deaktive et

shifts/page.tsx → Çalışma saatleri
  - Her doktor için haftalık çalışma saati grid (Pazartesi–Pazar, başlangıç–bitiş)
  - Randevu kabulü açık/kapalı toggle

settings/page.tsx → Klinik ayarları
  - Klinik adı, telefon, adres, vergi numarası
  - Logo yükleme
  - SMS hatırlatma: kaç saat önce gönderilsin

compliance/page.tsx → KVKK ve log
  - Audit log tablosu (son 100 işlem): kim, ne yaptı, ne zaman, hangi kayıt
  - Filtre: kullanıcı, eylem türü, tarih
```

---

## ADIM 13 — Entegrasyonlar Sayfası

```
src/app/(dashboard)/integrations/page.tsx

Kart bazlı düzen, her entegrasyon için:

1. E-Fatura (GİB)
   - API kullanıcı adı + şifre input
   - Test bağlantısı butonu
   - Aktif/Pasif toggle

2. SMS / WhatsApp
   - Provider seç (Netgsm / Twilio / İleti Merkezi)
   - API key input
   - Test SMS gönder

3. Ödeme Altyapısı (iyzico)
   - API key + Secret key
   - Sandbox / Production modu
   - Test ödeme

Her kart:
  - Bağlantı durumu (bağlı ✓ / bağlı değil)
  - Son test tarihi
  - Ayarlar kaydet butonu

Gerçek API entegrasyonu yapma, sadece UI + input kaydetme (DB'ye encrypted olarak sakla notu ekle).
```

---

## ADIM 14 — Bildirim ve Toast Sistemi

```
Uygulama genelinde:

1. Sonner (toast) kur:
   - pnpm add sonner
   - src/app/layout.tsx'e <Toaster> ekle
   - Her server action başarı/hata sonucunda toast göster

2. Bildirim sistemi:
   - Header'daki Bell ikonuna tıklayınca dropdown açılsın
   - Notification tipler: APPOINTMENT_REMINDER | LOW_STOCK | OVERDUE_INVOICE | NEW_PATIENT
   - Okundu / okunmadı durumu
   - "Tümünü okundu işaretle" butonu

3. Kritik stok banner:
   - Dashboard ve /inventory sayfalarında
   - currentStock < minStock olan item varsa kırmızı banner göster
   - "Stok sayfasına git" linki

4. Randevu hatırlatma:
   - /api/cron/reminders route handler oluştur
   - Yarınki randevuları çek, reminderSent=false olanlar için log at
   - (Gerçek SMS gönderimi entegrasyon adımında yapılacak)
```

---

## ADIM 15 — Polish ve Final

```
Tüm sayfalar için:

1. Loading states:
   - Her sayfa için loading.tsx (skeleton UI)
   - Tablo satırları için SkeletonRow bileşeni
   - KPI kartları için SkeletonCard

2. Error handling:
   - Her sayfa için error.tsx
   - Not found için not-found.tsx
   - Kullanıcı dostu hata mesajları

3. Empty states:
   - Tablo boşsa illüstrasyon + "Henüz kayıt yok" mesajı + aksyon butonu
   - Tüm listeler için standart EmptyState bileşeni (src/components/shared/EmptyState.tsx)

4. Responsive:
   - Mobilde sidebar hamburger menüye dönüşsün (Sheet bileşeni kullan)
   - Tablolar mobilde horizontal scroll

5. SEO + Metadata:
   - Her sayfa için metadata export (title, description)
   - Favicon: diş ikonu

6. Final kontrol:
   - TypeScript hataları sıfır olsun (tsc --noEmit)
   - Tüm form validasyonları zod ile
   - Tüm veritabanı işlemleri try/catch ile sarılmış olsun
   - console.log'lar temizlensin
```

---

## Geliştirme Sırası Özeti

| Adım | Konu | Süre (tahmini) |
|------|------|----------------|
| 1 | Proje iskeleti | 15 dk |
| 2 | Veritabanı şeması | 20 dk |
| 3 | Auth | 20 dk |
| 4 | Layout (Sidebar + Header) | 20 dk |
| 5 | Dashboard | 20 dk |
| 6 | Randevu modülü | 30 dk |
| 7 | Hasta modülü | 30 dk |
| 8 | Muayene + Diş şeması | 35 dk |
| 9 | Finans | 30 dk |
| 10 | Stok | 20 dk |
| 11 | Raporlar | 25 dk |
| 12 | Klinik yönetim | 20 dk |
| 13 | Entegrasyonlar | 15 dk |
| 14 | Bildirimler | 15 dk |
| 15 | Polish + Final | 20 dk |

**Toplam: ~5–6 saat**

---

## Notlar

- Her adımı Claude Code'a tek tek ver, bir sonraki adıma geçmeden önce `pnpm dev` ile test et.
- Adım 2 sonrası `npx prisma studio` ile veriyi kontrol et.
- Adım 3 sonrası login akışını test et.
- `DentalSidebar.tsx` bileşenini Adım 4'te `src/components/layout/Sidebar.tsx` olarak kullan.
- Türkiye e-fatura entegrasyonu için GİB'in test ortamı: https://earsivportaltest.efatura.gov.tr
