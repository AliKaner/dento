# CLAUDE.md — DentaFlow Proje Rehberi

Bu dosya Claude Code'un proje boyunca referans alacağı ana rehberdir.
Her yeni oturumda önce bu dosyayı oku, sonra ilgili MD dosyasını aç.

---

## Proje Özeti

**DentaFlow** — Küçük dişçi klinikleri için web tabanlı yönetim sistemi.

```
Stack:   Next.js 15 (App Router) · TypeScript · Tailwind CSS
         shadcn/ui · Lucide React · Prisma · PostgreSQL · NextAuth v5
Paket:   pnpm
Dizin:   /src
```

---

## Dosya Haritası

Projeyle ilgili tüm kararlar aşağıdaki MD dosyalarında tanımlanmıştır.
**Kod yazmadan önce ilgili dosyayı oku.**

| Dosya | İçerik | Ne zaman aç |
|-------|--------|-------------|
| `steps.md` | 15 adımlı geliştirme planı, her adım Claude Code promptu | Her yeni özellik başlarken |
| `components.md` | 15 shared bileşen API'si, hangi sayfada kullanıldığı | Yeni bileşen yazmadan önce |
| `colors.md` | Renk token'ları, Tailwind config, globals.css, STATUS_STYLES | Herhangi bir renk kararı öncesi |
| `dental-svgs.md` | 6 SVG bileşeni (odontogram, kesit, çene, empty state, ikonlar, logo) | dental/ klasörüne dokunmadan önce |
| `DentalSidebar.tsx` | Hazır sidebar bileşeni — doğrudan kopyalanacak | Adım 4'te layout kurulurken |

---

## Geliştirme Kuralları

### 1. Adım sırası
`steps.md` sırasını boz. Adım N bitmeden Adım N+1'e başlama.
Her adım sonrası `pnpm dev` çalıştır, hata varsa bir sonraki adıma geçme.

### 2. Bileşen önceliği
`components.md`'de tanımlı bir bileşen varsa onu kullan, sıfırdan yazma.
Örnek: tablo lazımsa `DataTable`, boş durum lazımsa `EmptyStateIllustration`.

### 3. Renk kuralları (`colors.md`)
- Renk asla hardcode yazılmaz. `colors.md`'deki token veya Tailwind class kullan.
- Status badge rengi sadece `STATUS_STYLES` objesinden gelir.
- Grafik rengi sadece `CHART_COLORS` / `CHART_PALETTE` dizisinden gelir.
- Modül icon rengi sadece `MODULE_COLORS` objesinden gelir.

### 4. SVG bileşenleri (`dental-svgs.md`)
- `src/components/dental/` dışına SVG yazılmaz.
- Odontogram için `AnatomicToothChart` kullanılır, başka diş şeması yazılmaz.
- Logo için `DentaFlowLogo` kullanılır, inline SVG yazılmaz.

### 5. TypeScript
- `any` kullanılmaz.
- Server component'larda `"use client"` direktifi olmaz.
- Form validasyonu her zaman `zod` ile yapılır.

### 6. Dosya konvansiyonları
```
src/components/dental/     → SVG bileşenleri
src/components/shared/     → Genel UI bileşenleri (components.md)
src/components/layout/     → Sidebar, Header
src/components/ui/         → shadcn primitives (elle dokunulmaz)
src/app/(dashboard)/       → Sayfa dosyaları
src/app/api/               → Route handler'lar
src/lib/                   → prisma.ts, auth.ts, utils.ts, chartColors.ts, moduleColors.ts
src/hooks/                 → Custom hook'lar
src/types/                 → Global tip tanımları
```

---

## Hızlı Başlangıç

```bash
# 1. Projeyi kur (steps.md Adım 1)
pnpm create next-app@latest dentaflow --typescript --tailwind --app
cd dentaflow

# 2. Bağımlılıkları kur
pnpm add @prisma/client prisma next-auth@beta zod date-fns \
         react-hook-form @hookform/resolvers recharts \
         @tanstack/react-query @tanstack/react-table \
         react-dropzone bcryptjs sonner lucide-react
pnpm add -D @types/bcryptjs

# 3. shadcn init
pnpm dlx shadcn@latest init
# style: new-york | base color: zinc | css variables: yes

# 4. shadcn bileşenlerini kur
pnpm dlx shadcn@latest add button input select dialog popover \
         tabs badge sheet dropdown-menu calendar command \
         form label textarea separator avatar skeleton toast

# 5. Prisma init
pnpm dlx prisma init

# 6. DentalSidebar.tsx dosyasını kopyala
# → src/components/layout/Sidebar.tsx olarak kaydet
```

---

## Adım Referansları

### Adım 4.5 — Shared Component Library (steps.md'ye ekle)

`components.md` dosyasındaki 15 bileşeni oluştur:

```
Sıra:
1. StatusBadge      ← colors.md'deki STATUS_STYLES ile
2. EmptyState       ← dental-svgs.md'deki illüstrasyonlarla
3. Skeletons        ← SkeletonTable + SkeletonCard + SkeletonKpiRow
4. ActionMenu       ← shadcn DropdownMenu üzerine
5. PageHeader       ← breadcrumb + başlık + sağ slot
6. FilterBar        ← search + select + daterange
7. DateRangePicker  ← shadcn Calendar + Popover
8. FormSection      ← başlıklı form grubu
9. DetailCard       ← bilgi gösterim kartı
10. AlertBanner     ← info/warning/error/success
11. KpiCard         ← özet sayı kartı
12. DataTable       ← @tanstack/react-table wrapper
13. SectionTabs     ← URL state senkronize tabs
14. PatientCombobox ← async search combobox
15. ChartCard       ← Recharts wrapper kart
```

Her bileşen için `components.md`'deki API tanımına **birebir** uy.

### Adım 8 — Diş Şeması

`dental-svgs.md` → `AnatomicToothChart` bileşenini kullan.
`src/components/dental/AnatomicToothChart.tsx` olarak oluştur.
Üst dişlerin kökleri aşağıya, alt dişlerin kökleri yukarıya bakar.

---

## Sık Karşılaşılan Durumlar

### "Bu sayfada tablo var, nasıl yapayım?"
→ `components.md` → `DataTable` bölümünü oku.
→ Sayfanın `columns.tsx` dosyasını yaz, `DataTable`'a geç.

### "Yeni bir status badge rengi eklemem lazım"
→ `colors.md` → `STATUS_STYLES` objesine yeni satır ekle.
→ `StatusBadge.tsx`'i güncelle.

### "Grafik çizmem lazım"
→ `colors.md` → `CHART_COLORS` ve `CHART_PALETTE` kullan.
→ `components.md` → `ChartCard` wrapper'ını kullan.

### "Boş durum göstermem lazım"
→ `dental-svgs.md` → `EmptyStateIllustration` bileşenini kullan.
→ `variant` prop'una modül adını geç: `appointments | patients | invoices | inventory | exam | documents`

### "Logo kullanmam lazım"
→ `dental-svgs.md` → `DentaFlowLogo` bileşenini kullan.
→ `variant="full"` sidebar için, `variant="icon"` login için, `variant="wordmark"` email için.

### "Modül ikonu kullanmam lazım"
→ `dental-svgs.md` → `ModuleIcon` bileşenini kullan.
→ `colors.md` → `MODULE_COLORS` ile renk tutarlılığını koru.

### "Yeni bir sayfa eklemem lazım"
→ `steps.md` → ilgili adımda tanımlı mı kontrol et.
→ `components.md` → `PageHeader`, `FilterBar`, `DataTable`, `EmptyState` kullanmayı unutma.

---

## globals.css ve tailwind.config.ts

Bu iki dosya `colors.md`'deki içerikle doldurulur.
Başka yerden renk token'ı eklenmez.

```bash
# globals.css → colors.md "globals.css" bölümünü kopyala
# tailwind.config.ts → colors.md "Tailwind Config" bölümünü kopyala
```

---

## Kontrol Listesi — Her Adım Sonrası

```
[ ] pnpm dev — derleme hatası yok
[ ] tsc --noEmit — TypeScript hatası yok
[ ] Yeni bileşen varsa components.md API'sine uyuyor
[ ] Yeni renk varsa colors.md token'larından geliyor
[ ] console.log temizlendi
[ ] Loading state var (loading.tsx veya Suspense)
[ ] Boş durum var (EmptyStateIllustration)
[ ] Form validasyonu zod ile yapılıyor
```

---

## Notlar

- `DentalSidebar.tsx` hazır, Adım 4'te doğrudan kopyala — yeniden yazdırma.
- Prisma migrate sonrası `npx prisma studio` ile veriyi kontrol et.
- Auth sonrası `/login` → `/` yönlendirmesini test et.
- Türkiye e-fatura: `https://earsivportaltest.efatura.gov.tr`
- KVKK için her DB işleminde `AuditLog` kaydı oluştur.
