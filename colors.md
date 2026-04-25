# DentaFlow — Renk Sistemi

## Karar: Dark-first, Zinc tabanlı

shadcn/ui'nin "zinc" base color'ı üzerine inşa edildi.
Tüm renkler CSS custom property olarak `globals.css`'e eklenir.
Tailwind config'e `dentaflow` namespace altında extend edilir.

---

## Temel Palet

### Yüzeyler (Surfaces)

| Token | Hex | Kullanım |
|-------|-----|---------|
| `--surface-app` | `#0a0b0f` | Uygulama arka planı (en derin) |
| `--surface-base` | `#0f1117` | Ana içerik alanı |
| `--surface-raised` | `#13151f` | Sidebar, kart arka planı |
| `--surface-overlay` | `#1a1d2a` | Hover state'ler, tablo satırı hover |
| `--surface-sunken` | `#08090d` | Input arka planı, code block |

### Sınırlar (Borders)

| Token | Hex | Kullanım |
|-------|-----|---------|
| `--border-subtle` | `#ffffff09` | Kartlar arası ince ayraç |
| `--border-default` | `#ffffff0f` | Genel border (sidebar, kart) |
| `--border-strong` | `#ffffff1a` | Hover'da border, focus ring dışı |
| `--border-focus` | `#3b82f6` | Input focus ring |

### Metin (Text)

| Token | Hex | Tailwind | Kullanım |
|-------|-----|----------|---------|
| `--text-primary` | `#f1f5f9` | `text-slate-100` | Başlıklar, önemli içerik |
| `--text-secondary` | `#94a3b8` | `text-slate-400` | Açıklamalar, nav label |
| `--text-muted` | `#475569` | `text-slate-600` | Placeholder, section label |
| `--text-disabled` | `#334155` | `text-slate-700` | Deaktif elementler |
| `--text-inverse` | `#0f1117` | — | Renkli buton üzeri metin |

---

## Marka Renkleri

### Primary — Blue (Ana aksiyon)

```css
--brand-50:  #eff6ff;
--brand-100: #dbeafe;
--brand-200: #bfdbfe;
--brand-300: #93c5fd;   /* ← Light metin on dark bg */
--brand-400: #60a5fa;   /* ← Icon rengi */
--brand-500: #3b82f6;   /* ← Primary buton, focus ring */
--brand-600: #2563eb;   /* ← Buton hover */
--brand-700: #1d4ed8;
--brand-800: #1e3a8a;
--brand-900: #1e3a5f;   /* ← Icon wrapper bg */
--brand-950: #0d1f3c;   /* ← Subtle highlight bg */
```

**Kullanım:**
- Primary buton: `bg-brand-500 hover:bg-brand-600`
- Link: `text-brand-400 hover:text-brand-300`
- Active nav item highlight: `bg-brand-950`
- Active nav dot: `bg-brand-400`
- Icon wrapper: `bg-brand-900` + `text-brand-400`

---

## Modül Renkleri

Her modülün bir kimlik rengi var. Sidebar icon, sayfa header accent ve status badge'lerde kullanılır.

| Modül | Renk | Token Prefix | Icon BG | Icon Color | Badge BG | Badge Text |
|-------|------|-------------|---------|-----------|----------|-----------|
| Randevu | Blue | `--appt` | `#1e3a5f` | `#60a5fa` | `#1e3a5f` | `#93c5fd` |
| Hasta | Violet | `--patient` | `#2e1f5e` | `#a78bfa` | `#2e1f5e` | `#c4b5fd` |
| Muayene | Orange | `--exam` | `#3b1a12` | `#fb923c` | `#3b1a12` | `#fdba74` |
| Finans | Amber | `--finance` | `#3d2c0a` | `#fbbf24` | `#3d2c0a` | `#fde68a` |
| Stok | Emerald | `--inventory` | `#0a2e1a` | `#34d399` | `#0a2e1a` | `#6ee7b7` |
| Raporlar | Sky | `--reports` | `#0c2340` | `#38bdf8` | `#0c2340` | `#7dd3fc` |
| Hasta App | Pink | `--papp` | `#3b1228` | `#f472b6` | `#3b1228` | `#f9a8d4` |
| Klinik | Slate | `--clinic` | `#1e2535` | `#94a3b8` | `#1e2535` | `#cbd5e1` |
| Entegrasyon | Red | `--integ` | `#3b1212` | `#f87171` | `#3b1212` | `#fca5a5` |

---

## Semantik Renkler (Durum)

### Status — Randevu

| Status | BG Token | Text Token | Hex BG | Hex Text |
|--------|----------|-----------|--------|---------|
| SCHEDULED | `--status-scheduled-bg` | `--status-scheduled-text` | `#1e3a5f` | `#93c5fd` |
| CONFIRMED | `--status-confirmed-bg` | `--status-confirmed-text` | `#0a2e1a` | `#6ee7b7` |
| IN_PROGRESS | `--status-inprogress-bg` | `--status-inprogress-text` | `#3d2c0a` | `#fde68a` |
| COMPLETED | `--status-completed-bg` | `--status-completed-text` | `#1e2535` | `#94a3b8` |
| CANCELLED | `--status-cancelled-bg` | `--status-cancelled-text` | `#3b1212` | `#fca5a5` |
| NO_SHOW | `--status-noshow-bg` | `--status-noshow-text` | `#3b1a12` | `#fdba74` |

### Status — Fatura

| Status | BG Hex | Text Hex |
|--------|--------|---------|
| DRAFT | `#1e2535` | `#94a3b8` |
| SENT | `#1e3a5f` | `#93c5fd` |
| PAID | `#0a2e1a` | `#6ee7b7` |
| PARTIAL | `#3d2c0a` | `#fde68a` |
| OVERDUE | `#3b1212` | `#fca5a5` |
| CANCELLED | `#1e2535` | `#64748b` |

### Status — Stok

| Status | BG Hex | Text Hex | Eşik |
|--------|--------|---------|------|
| OK | `#0a2e1a` | `#6ee7b7` | currentStock > minStock × 2 |
| LOW | `#3d2c0a` | `#fde68a` | minStock < stock ≤ minStock × 2 |
| CRITICAL | `#3b1212` | `#fca5a5` | stock ≤ minStock |

---

## Tailwind Config

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Yüzeyler
        surface: {
          app:     "#0a0b0f",
          base:    "#0f1117",
          raised:  "#13151f",
          overlay: "#1a1d2a",
          sunken:  "#08090d",
        },
        // Sınırlar
        border: {
          subtle:  "#ffffff09",
          default: "#ffffff0f",
          strong:  "#ffffff1a",
        },
        // Brand
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3a8a",
          900: "#1e3a5f",
          950: "#0d1f3c",
        },
        // Modül kimlikleri — sadece icon wrapper ve badge için
        module: {
          appt:      { bg: "#1e3a5f", text: "#60a5fa" },
          patient:   { bg: "#2e1f5e", text: "#a78bfa" },
          exam:      { bg: "#3b1a12", text: "#fb923c" },
          finance:   { bg: "#3d2c0a", text: "#fbbf24" },
          inventory: { bg: "#0a2e1a", text: "#34d399" },
          reports:   { bg: "#0c2340", text: "#38bdf8" },
          papp:      { bg: "#3b1228", text: "#f472b6" },
          clinic:    { bg: "#1e2535", text: "#94a3b8" },
          integ:     { bg: "#3b1212", text: "#f87171" },
        },
      },
      backgroundColor: {
        "sidebar": "#13151f",
        "header":  "#0f1117",
        "card":    "#13151f",
      },
    },
  },
  plugins: [],
}

export default config
```

---

## globals.css

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* shadcn/ui zinc dark overrides */
    --background: 222 47% 6%;
    --foreground: 213 31% 91%;
    --card: 224 39% 9%;
    --card-foreground: 213 31% 91%;
    --popover: 224 39% 9%;
    --popover-foreground: 213 31% 91%;
    --primary: 217 91% 60%;
    --primary-foreground: 222 47% 6%;
    --secondary: 222 30% 15%;
    --secondary-foreground: 213 31% 91%;
    --muted: 223 25% 16%;
    --muted-foreground: 215 20% 60%;
    --accent: 222 30% 15%;
    --accent-foreground: 213 31% 91%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 213 31% 91%;
    --border: 222 20% 12%;
    --input: 222 20% 10%;
    --ring: 217 91% 60%;
    --radius: 0.5rem;

    /* DentaFlow custom tokens */
    --surface-app:     #0a0b0f;
    --surface-base:    #0f1117;
    --surface-raised:  #13151f;
    --surface-overlay: #1a1d2a;
    --surface-sunken:  #08090d;

    --border-subtle:   rgba(255,255,255,0.035);
    --border-default:  rgba(255,255,255,0.059);
    --border-strong:   rgba(255,255,255,0.102);
    --border-focus:    #3b82f6;

    --text-primary:   #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted:     #475569;
    --text-disabled:  #334155;
  }
}

@layer base {
  body {
    background-color: var(--surface-base);
    color: var(--text-primary);
  }

  /* Scrollbar */
  ::-webkit-scrollbar       { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.18);
  }
}
```

---

## StatusBadge Renk Eşlemesi (Kod)

`src/components/shared/StatusBadge.tsx` içine doğrudan yapıştır:

```ts
export const STATUS_STYLES: Record<string, string> = {
  // ── Appointments ──────────────────────────────
  SCHEDULED:   "bg-[#1e3a5f] text-[#93c5fd]",
  CONFIRMED:   "bg-[#0a2e1a] text-[#6ee7b7]",
  IN_PROGRESS: "bg-[#3d2c0a] text-[#fde68a]",
  COMPLETED:   "bg-[#1e2535] text-[#94a3b8]",
  CANCELLED:   "bg-[#3b1212] text-[#fca5a5]",
  NO_SHOW:     "bg-[#3b1a12] text-[#fdba74]",
  // ── Invoices ──────────────────────────────────
  DRAFT:       "bg-[#1e2535] text-[#94a3b8]",
  SENT:        "bg-[#1e3a5f] text-[#93c5fd]",
  PAID:        "bg-[#0a2e1a] text-[#6ee7b7]",
  PARTIAL:     "bg-[#3d2c0a] text-[#fde68a]",
  OVERDUE:     "bg-[#3b1212] text-[#fca5a5]",
  // ── Inventory ─────────────────────────────────
  OK:          "bg-[#0a2e1a] text-[#6ee7b7]",
  LOW:         "bg-[#3d2c0a] text-[#fde68a]",
  CRITICAL:    "bg-[#3b1212] text-[#fca5a5]",
  // ── Users ─────────────────────────────────────
  ACTIVE:      "bg-[#0a2e1a] text-[#6ee7b7]",
  INACTIVE:    "bg-[#1e2535] text-[#64748b]",
}

export const STATUS_LABELS: Record<string, string> = {
  SCHEDULED:   "Planlandı",
  CONFIRMED:   "Onaylandı",
  IN_PROGRESS: "Devam Ediyor",
  COMPLETED:   "Tamamlandı",
  CANCELLED:   "İptal",
  NO_SHOW:     "Gelmedi",
  DRAFT:       "Taslak",
  SENT:        "Gönderildi",
  PAID:        "Ödendi",
  PARTIAL:     "Kısmi Ödeme",
  OVERDUE:     "Gecikmiş",
  OK:          "Yeterli",
  LOW:         "Azalıyor",
  CRITICAL:    "Kritik",
  ACTIVE:      "Aktif",
  INACTIVE:    "Pasif",
}
```

---

## Modül Icon Wrapper Yardımcısı

`src/lib/moduleColors.ts` — sidebar ve sayfa header'larında kullan:

```ts
export const MODULE_COLORS = {
  appointments: { bg: "bg-[#1e3a5f]", text: "text-[#60a5fa]" },
  patients:     { bg: "bg-[#2e1f5e]", text: "text-[#a78bfa]" },
  exam:         { bg: "bg-[#3b1a12]", text: "text-[#fb923c]" },
  finance:      { bg: "bg-[#3d2c0a]", text: "text-[#fbbf24]" },
  inventory:    { bg: "bg-[#0a2e1a]", text: "text-[#34d399]" },
  reports:      { bg: "bg-[#0c2340]", text: "text-[#38bdf8]" },
  patientApp:   { bg: "bg-[#3b1228]", text: "text-[#f472b6]" },
  clinic:       { bg: "bg-[#1e2535]", text: "text-[#94a3b8]" },
  integrations: { bg: "bg-[#3b1212]", text: "text-[#f87171]" },
} as const

export type ModuleKey = keyof typeof MODULE_COLORS
```

---

## Recharts Renk Paleti

Grafiklerde tutarlılık için sabit renk dizisi:

```ts
// src/lib/chartColors.ts
export const CHART_COLORS = {
  primary:   "#3b82f6",   // mavi     — ana seri
  secondary: "#a78bfa",   // violet   — ikinci seri
  tertiary:  "#34d399",   // emerald  — üçüncü seri
  warning:   "#fbbf24",   // amber    — uyarı/dikkat
  danger:    "#f87171",   // red      — negatif
  neutral:   "#64748b",   // slate    — tamamlanan/pasif
}

// Çok serili grafiklerde sırayla kullanılacak dizi
export const CHART_PALETTE = [
  "#3b82f6",  // blue
  "#a78bfa",  // violet
  "#34d399",  // emerald
  "#fbbf24",  // amber
  "#f472b6",  // pink
  "#38bdf8",  // sky
  "#fb923c",  // orange
  "#f87171",  // red
]

// Recharts custom tooltip stili
export const TOOLTIP_STYLE = {
  backgroundColor: "#1a1d2a",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "8px",
  color: "#f1f5f9",
  fontSize: "13px",
}
```

---

## Özet — Renk Kullanım Kuralları

1. **Arka plan katmanları sıralıdır:** `surface-app` < `surface-base` < `surface-raised` < `surface-overlay`. Üst katmanlar daha açık, iç içe geçmiş elementler daha koyu olmaz.

2. **Her modülün tek bir kimlik rengi vardır.** Icon wrapper, sayfa header'ı accent çizgisi ve breadcrumb'da o renk kullanılır. Başka yerde modül rengi olmaz.

3. **Status badge'ler sadece STATUS_STYLES objesinden gelir.** Inline Tailwind class yazılmaz, config'den okunur.

4. **Grafikler CHART_COLORS'dan renk alır.** Recharts'a doğrudan hex girilmez.

5. **Primary buton tek renktir:** `#3b82f6` (brand-500). Farklı modüllerde farklı renkli buton olmaz.

6. **Border opacity-based'dir.** `border-subtle`, `border-default`, `border-strong` dışında border rengi tanımlanmaz.
