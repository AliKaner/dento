# 🦷 DentaFlow — Modern Diş Kliniği Yönetim Sistemi

DentaFlow, modern diş poliklinikleri için tasarlanmış, hız ve kullanıcı deneyimi odaklı kapsamlı bir yönetim platformudur. Randevu takibinden finansal raporlamaya, diş şemasından hasta mobil uygulamasına kadar tüm ihtiyaçları tek bir çatı altında toplar.

## 🚀 Teknolojiler

Bu proje, en güncel web teknolojileri ve mimarileri kullanılarak inşa edilmiştir:

- **Framework:** [Next.js 16.2 (Turbopack)](https://nextjs.org/) — En son "Proxy" mimarisi ile.
- **ORM:** [Prisma 7.8](https://www.prisma.io/) — Rust-free yeni TypeScript mimarisi.
- **Database:** [PostgreSQL (Neon.tech)](https://neon.tech/) — Serverless ve ölçeklenebilir.
- **Auth:** [Auth.js v5 (NextAuth)](https://authjs.dev/) — Edge-ready kimlik doğrulama.
- **UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Lucide React Icons](https://lucide.dev/).
- **Charts:** [Recharts](https://recharts.org/) — Dinamik veri görselleştirme.

## ✨ Öne Çıkan Özellikler

- **📊 Gelişmiş Dashboard:** Günlük randevular, bekleyen ödemeler ve kritik stok uyarıları tek ekranda.
- **📅 Randevu Yönetimi:** Doktor ve klinik bazlı takvim görünümü, hızlı randevu oluşturma.
- **📁 Hasta Portföyü:** Detaylı anamnez formları, alerji takibi ve dijital belge arşivi.
- **🦷 Klinik Muayene:** Dijital diş şeması (Odontogram) ve tedavi planlama.
- **💰 Finans ve Fatura:** Fatura oluşturma, taksitli ödeme planları ve gelir-gider takibi.
- **📦 Stok Takibi:** Kritik stok seviyesi uyarıları ve tedarikçi yönetimi.
- **📱 Hasta Uygulaması:** Klinik için özel QR kod ve mobil uygulama önizlemesi.

## 🛠️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/kullaniciadi/dentaflow.git
cd dentaflow
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevre Değişkenlerini Ayarlayın
`.env` (veya `.env.local`) dosyası oluşturun ve Neon/PostgreSQL bağlantı dizenizi ekleyin:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="farkli-bir-secret-anahtar"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Veritabanını Hazırlayın
Prisma 7 mimarisiyle tabloları oluşturun ve başlangıç verilerini (Admin hesabı vb.) yükleyin:

```bash
npx prisma db push
npx prisma db seed
npx prisma generate
```

### 5. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

### 6. Geliştirme Modu (Girişsiz Erişim)
Geliştirme aşamasında giriş ekranını atlamak ve doğrudan dashboard'a erişmek için `.env` dosyanıza şu satırı ekleyebilirsiniz:

```env
NEXT_PUBLIC_SKIP_AUTH=true
```
*(Not: Bu mod aktifken uygulama "Mock Admin" kullanıcısı ile otomatik giriş yapar.)*

## 🛡️ Kimlik Bilgileri (Demo)
Normal modda varsayılan yönetici hesabı:
- **E-posta:** `admin@dentaflow.com`
- **Şifre:** `admin123`

## 📝 Önemli Geliştirici Notları (v16 & v7)

- **Proxy vs Middleware:** Next.js 16 ile gelen değişiklik gereği, rota koruma ve interception işlemleri `src/proxy.ts` üzerinden yürütülmektedir.
- **Prisma Configuration:** Veritabanı yapılandırması artık `schema.prisma` yerine `prisma.config.ts` dosyasından yönetilmektedir.
- **Type Resolution:** Prisma 7 tiplerinin IDE'de (VS Code) görünmemesi durumunda "Restart TS Server" yapılması önerilir.

---
*DentaFlow, diş hekimlerinin işini kolaylaştırmak için sevgiyle geliştirildi.* 🦷✨
