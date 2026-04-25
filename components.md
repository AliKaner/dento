# DentaFlow — Shared Component Library

## Karar: shadcn/ui + Özel Bileşenler

Tüm sayfalar analiz edildi. Pattern'ler 3 katmana ayrıldı:

```
shadcn/ui (primitives)          → Button, Input, Select, Dialog, Popover, Tabs, Badge, Sheet…
src/components/ui/dental/       → shadcn üzerine DentaFlow-specific wrapper'lar
src/components/shared/          → Tamamen özel, iş mantığı içeren bileşenler
```

**Neden sadece shadcn yeterli değil?**
Aynı pattern 8+ sayfada tekrar ediyor (DataTable, PageHeader, StatusBadge, KpiCard, FilterBar…).
Bunları her sayfada sıfırdan yazmak yerine bir kez tanımlayıp tüm modüllerde kullanmak daha temiz.

---

## Pattern Analizi — Hangi Bileşen Nerede Gerekiyor

| Bileşen | Appointments | Patients | Exam | Finance | Inventory | Reports | Clinic |
|---------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| PageHeader | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| DataTable | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FilterBar | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| StatusBadge | ✓ | — | — | ✓ | ✓ | ✓ | — |
| KpiCard | ✓(dash) | — | — | ✓ | ✓ | ✓ | — |
| EmptyState | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| SkeletonTable | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| FormSection | — | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| PatientCombobox | ✓ | — | ✓ | ✓ | — | — | — |
| DetailCard | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| AlertBanner | — | — | — | ✓ | ✓ | — | — |
| SectionTabs | — | ✓ | ✓ | — | ✓ | ✓ | ✓ |
| DateRangePicker | ✓ | — | — | ✓ | — | ✓ | ✓ |
| ChartCard | — | — | — | ✓ | — | ✓ | — |
| ActionMenu | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |

---

## Bileşen Kataloğu

---

### 1. PageHeader
**Dosya:** `src/components/shared/PageHeader.tsx`
**Kullanım:** Her liste ve detay sayfasının tepesi. Başlık + açıklama + sağ taraf aksiyon slotu.

```tsx
// API
<PageHeader
  title="Randevular"
  description="Tüm randevuları yönetin"
  action={<Button>Yeni Randevu</Button>}
  breadcrumb={[{ label: "Dashboard", href: "/" }, { label: "Randevular" }]}
/>

// Props
interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode        // sağ üst köşe — buton, link, vs.
  breadcrumb?: { label: string; href?: string }[]
  badge?: string                  // "12 kayıt" gibi sayaç
}
```

---

### 2. DataTable
**Dosya:** `src/components/shared/DataTable.tsx`
**Kullanım:** Appointments, Patients, Finance, Inventory, Clinic — tüm liste sayfaları.
**Temel:** `@tanstack/react-table` v8

```tsx
// API
<DataTable
  columns={columns}
  data={appointments}
  loading={isLoading}
  emptyState={<EmptyState ... />}
  pagination={{ page, pageSize: 10, total }}
  onPageChange={setPage}
/>

// Column tanımı (her modül kendi columns.tsx'ini yazar)
// src/app/(dashboard)/appointments/columns.tsx
export const columns: ColumnDef<Appointment>[] = [
  { accessorKey: "date", header: "Tarih" },
  { accessorKey: "patient.name", header: "Hasta" },
  {
    id: "status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu row={row.original} />,
  },
]

// Props
interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  loading?: boolean
  emptyState?: React.ReactNode
  pagination?: PaginationConfig
  onPageChange?: (page: number) => void
  stickyHeader?: boolean
}
```

---

### 3. FilterBar
**Dosya:** `src/components/shared/FilterBar.tsx`
**Kullanım:** Tablo sayfalarının üstü — arama + filtreler + sağda aksiyonlar.

```tsx
// API
<FilterBar
  search={{ value: q, onChange: setQ, placeholder: "Hasta ara..." }}
  filters={[
    {
      key: "status",
      label: "Durum",
      type: "select",
      options: STATUS_OPTIONS,
      value: status,
      onChange: setStatus,
    },
    {
      key: "date",
      label: "Tarih",
      type: "daterange",
      value: dateRange,
      onChange: setDateRange,
    },
  ]}
  actions={<Button size="sm">Dışa Aktar</Button>}
/>

// Filter tipler
type FilterConfig =
  | { type: "select"; options: { label: string; value: string }[] }
  | { type: "daterange" }
  | { type: "combobox"; fetchOptions: (q: string) => Promise<Option[]> }
```

---

### 4. StatusBadge
**Dosya:** `src/components/shared/StatusBadge.tsx`
**Kullanım:** Appointment status, Invoice status, Inventory status — hepsinde aynı bileşen, farklı config.

```tsx
// API
<StatusBadge status="CONFIRMED" />
<StatusBadge status="PAID" />
<StatusBadge status="CRITICAL" />

// İç yapı — tek config objesi tüm domain'leri kapsar
const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  // Appointments
  SCHEDULED:   { label: "Planlandı",   color: "bg-blue-900/60 text-blue-300" },
  CONFIRMED:   { label: "Onaylandı",   color: "bg-green-900/60 text-green-300" },
  IN_PROGRESS: { label: "Devam ediyor",color: "bg-amber-900/60 text-amber-300" },
  COMPLETED:   { label: "Tamamlandı",  color: "bg-slate-700/60 text-slate-300" },
  CANCELLED:   { label: "İptal",       color: "bg-red-900/60 text-red-300" },
  NO_SHOW:     { label: "Gelmedi",     color: "bg-orange-900/60 text-orange-300" },
  // Invoices
  DRAFT:       { label: "Taslak",      color: "bg-slate-700/60 text-slate-300" },
  SENT:        { label: "Gönderildi",  color: "bg-blue-900/60 text-blue-300" },
  PAID:        { label: "Ödendi",      color: "bg-green-900/60 text-green-300" },
  PARTIAL:     { label: "Kısmi",       color: "bg-amber-900/60 text-amber-300" },
  OVERDUE:     { label: "Gecikmiş",    color: "bg-red-900/60 text-red-300" },
  // Inventory
  OK:          { label: "Yeterli",     color: "bg-green-900/60 text-green-300" },
  LOW:         { label: "Azalıyor",    color: "bg-amber-900/60 text-amber-300" },
  CRITICAL:    { label: "Kritik",      color: "bg-red-900/60 text-red-300" },
}
```

---

### 5. KpiCard
**Dosya:** `src/components/shared/KpiCard.tsx`
**Kullanım:** Dashboard (4 kart), Finance özet, Inventory özet, Reports.

```tsx
// API
<KpiCard
  title="Bugünkü Randevular"
  value={12}
  delta={{ value: "+3", trend: "up" }}
  icon={<Calendar className="h-4 w-4" />}
  iconColor="text-blue-400"
  iconBg="bg-blue-900/60"
  href="/appointments"
/>

// Props
interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  delta?: { value: string; trend: "up" | "down" | "neutral" }
  icon?: React.ReactNode
  iconColor?: string
  iconBg?: string
  href?: string             // tıklanabilir yapıyorsa
  loading?: boolean
}
```

---

### 6. EmptyState
**Dosya:** `src/components/shared/EmptyState.tsx`
**Kullanım:** Boş tablo ve liste durumları — tüm modüller.

```tsx
// API
<EmptyState
  icon={<Calendar className="h-8 w-8" />}
  title="Henüz randevu yok"
  description="İlk randevuyu oluşturmak için aşağıdaki butona tıklayın."
  action={
    <Button asChild>
      <Link href="/appointments/new">Randevu Oluştur</Link>
    </Button>
  }
/>

// Props
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}
```

---

### 7. SkeletonTable / SkeletonCard
**Dosya:** `src/components/shared/Skeletons.tsx`
**Kullanım:** loading.tsx dosyaları, Suspense boundary'ler.

```tsx
// Tablo skeleton — DataTable'ın loading prop'una da geçilebilir
<SkeletonTable rows={5} cols={4} />

// KPI kartlar için
<SkeletonCard />   // tek kart
<SkeletonKpiRow /> // 4'lü grid

// Props
interface SkeletonTableProps {
  rows?: number    // default 5
  cols?: number    // default 4
  hasActions?: boolean
}
```

---

### 8. FormSection
**Dosya:** `src/components/shared/FormSection.tsx`
**Kullanım:** Yeni kayıt formları — başlıklı gruplar (Kişisel Bilgiler, Sağlık Bilgileri, vb.)

```tsx
// API
<FormSection
  title="Kişisel Bilgiler"
  description="Hasta kimlik ve iletişim bilgileri"
>
  <div className="grid grid-cols-2 gap-4">
    <FormField name="firstName" label="Ad" />
    <FormField name="lastName"  label="Soyad" />
  </div>
</FormSection>

// Props
interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  collapsible?: boolean   // isteğe bağlı accordion modu
}
```

---

### 9. PatientCombobox
**Dosya:** `src/components/shared/PatientCombobox.tsx`
**Kullanım:** Appointment form, Exam form, Invoice form — hasta seçimi.
**Özellik:** Async search, keyboard navigation, son seçilenler.

```tsx
// API
<PatientCombobox
  value={patientId}
  onChange={setPatientId}
  placeholder="Hasta ara..."
/>

// İç mantık
// - 3 karakter sonrası /api/patients/search?q=... çağırır
// - Sonuçlar: ad soyad + doğum tarihi + telefon
// - Seçim sonrası hasta özet bilgisi inline gösterilir
```

---

### 10. DetailCard
**Dosya:** `src/components/shared/DetailCard.tsx`
**Kullanım:** Randevu detay, hasta özet panel, fatura detay — bilgi gösterimi.

```tsx
// API
<DetailCard title="Hasta Bilgileri" icon={<User />}>
  <DetailRow label="Ad Soyad" value="Ahmet Yılmaz" />
  <DetailRow label="Telefon"  value="0532 000 00 00" />
  <DetailRow label="Durum"    value={<StatusBadge status="CONFIRMED" />} />
</DetailCard>

// Props
interface DetailCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  action?: React.ReactNode   // sağ üst — düzenle butonu vs.
}

interface DetailRowProps {
  label: string
  value: React.ReactNode
  fullWidth?: boolean
}
```

---

### 11. AlertBanner
**Dosya:** `src/components/shared/AlertBanner.tsx`
**Kullanım:** Kritik stok uyarısı (Inventory), gecikmiş ödeme (Finance), KVKK bildirimleri.

```tsx
// API
<AlertBanner
  variant="warning"
  title="3 malzemede kritik stok"
  description="Eldiven, anestezi ve steril sargı bezi stoku kritik seviyede."
  action={<Button size="sm" variant="outline">Stok Sayfasına Git</Button>}
  dismissible
/>

// Variants
type AlertVariant = "info" | "warning" | "error" | "success"
```

---

### 12. SectionTabs
**Dosya:** `src/components/shared/SectionTabs.tsx`
**Kullanım:** Hasta profili (5 tab), Muayene detay, Raporlar, Klinik yönetim.
**Temel:** shadcn Tabs, URL state ile senkronize.

```tsx
// API — URL'deki ?tab= parametresini okur/yazar
<SectionTabs
  tabs={[
    { key: "general",     label: "Genel Bilgiler", icon: <User /> },
    { key: "appointments",label: "Randevular",     icon: <Calendar />, badge: "4" },
    { key: "exam",        label: "Muayene",        icon: <ClipboardCheck /> },
    { key: "documents",   label: "Belgeler",       icon: <FileText /> },
    { key: "invoices",    label: "Faturalar",      icon: <DollarSign /> },
  ]}
  defaultTab="general"
>
  {(activeTab) => (
    <>
      {activeTab === "general"      && <PatientGeneralTab />}
      {activeTab === "appointments" && <PatientAppointmentsTab />}
    </>
  )}
</SectionTabs>
```

---

### 13. DateRangePicker
**Dosya:** `src/components/shared/DateRangePicker.tsx`
**Kullanım:** Reports (tüm sayfalar), Appointments filtre, Finance filtre.
**Temel:** shadcn Calendar + Popover + date-fns

```tsx
// API
<DateRangePicker
  value={{ from: startDate, to: endDate }}
  onChange={setDateRange}
  presets={["Bugün", "Bu Hafta", "Bu Ay", "Son 3 Ay", "Bu Yıl"]}
  placeholder="Tarih aralığı seç"
/>
```

---

### 14. ChartCard
**Dosya:** `src/components/shared/ChartCard.tsx`
**Kullanım:** Dashboard, Finance raporları, Raporlar modülü — Recharts wrapper.

```tsx
// API
<ChartCard
  title="Son 7 Gün Gelir"
  description="Günlük fatura toplamları"
  action={<Button size="sm" variant="ghost">CSV İndir</Button>}
>
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data}>
      ...
    </BarChart>
  </ResponsiveContainer>
</ChartCard>

// Props
interface ChartCardProps {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
  loading?: boolean
  height?: number
}
```

---

### 15. ActionMenu
**Dosya:** `src/components/shared/ActionMenu.tsx`
**Kullanım:** DataTable'daki son sütun — satır aksiyonları (düzenle, sil, detay, vb.)
**Temel:** shadcn DropdownMenu

```tsx
// API
<ActionMenu
  items={[
    { label: "Detay",    icon: <Eye />,     href: `/appointments/${id}` },
    { label: "Düzenle",  icon: <Pencil />,  href: `/appointments/${id}/edit` },
    { label: "separator" },
    { label: "İptal Et", icon: <X />,       onClick: handleCancel, destructive: true },
  ]}
/>

// Item tipi
type ActionItem =
  | { label: "separator" }
  | {
      label: string
      icon?: React.ReactNode
      href?: string
      onClick?: () => void
      destructive?: boolean
      disabled?: boolean
    }
```

---

## Klasör Yapısı (Final)

```
src/
  components/
    ui/                          ← shadcn primitives (otomatik generate)
    layout/
      Sidebar.tsx
      Header.tsx
    shared/
      PageHeader.tsx             ← Adım 4'te yaz, hepsinde kullan
      DataTable.tsx              ← @tanstack/react-table
      FilterBar.tsx
      StatusBadge.tsx
      KpiCard.tsx
      EmptyState.tsx
      Skeletons.tsx              ← SkeletonTable + SkeletonCard + SkeletonKpiRow
      FormSection.tsx
      PatientCombobox.tsx
      DetailCard.tsx
      AlertBanner.tsx
      SectionTabs.tsx
      DateRangePicker.tsx
      ChartCard.tsx
      ActionMenu.tsx
    dental/                      ← Domain-specific bileşenler
      ToothChart.tsx             ← Odontogram (Adım 8)
      TreatmentPlanEditor.tsx    ← Tedavi planı satır editörü
      PrescriptionEditor.tsx     ← Reçete satır editörü
      InvoiceLineItems.tsx       ← Fatura kalem editörü
      StockLevelBar.tsx          ← Stok seviye göstergesi (bar + renk)
      AppointmentBlock.tsx       ← Takvim grid'indeki randevu bloğu
```

---

## Ek Paket Kararları

| İhtiyaç | Paket | Neden |
|---------|-------|-------|
| Tablo | `@tanstack/react-table` | DataTable'ın temeli, sort/filter/pagination built-in |
| Form | `react-hook-form` + `zod` | Tüm formlarda zaten kurulu |
| Tarih | `date-fns` | shadcn Calendar zaten kullanıyor |
| Toast | `sonner` | shadcn ile native entegrasyon |
| Dosya yükleme | `react-dropzone` | Document upload (Adım 7) |
| CSV export | Native (`Blob` + `URL.createObjectURL`) | Ekstra paket gerekmez |
| Tablo print | Native CSS `@media print` | Fatura yazdırma (Adım 9) |

**Eklenecek paketler (Adım 1'e eklenir):**
```bash
pnpm add @tanstack/react-table react-dropzone
```

---

## Claude Code Kullanım Notu

Bu bileşenleri **steps.md'deki Adım 4'ten hemen önce** bir adım olarak ekle:

```
ADIM 4.5 — Shared Component Library

src/components/shared/ klasörü altında şu bileşenleri oluştur.
Her biri aşağıdaki API'ye göre implemente edilecek:

[Bu dosyanın içeriğini buraya yapıştır]

Bileşenleri oluşturduktan sonra Adım 5'ten itibaren
her sayfada import ederek kullan — tekrar yazma.
```
```
