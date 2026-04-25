# DentaFlow — Anatomik SVG Bileşen Kütüphanesi

Tüm bileşenler `src/components/dental/` altına koyulur.
Stack: React + TypeScript + Tailwind CSS. Ekstra bağımlılık yok.

---

## İçindekiler

1. [AnatomicToothChart](#1-anatomictoothchart--anatomik-odontogram)
2. [ToothCrossSection](#2-toothcrosssection--diş-kesiti)
3. [JawSchema](#3-jawschema--çene-şeması)
4. [EmptyStateIllustration](#4-emptystateillustration--boş-durum-i̇llüstrasyonları)
5. [ModuleIcon](#5-moduleicon--modül-i̇konları)
6. [DentaFlowLogo](#6-dentaflowlogo--logo)

---

## 1. AnatomicToothChart — Anatomik Odontogram

**Dosya:** `src/components/dental/AnatomicToothChart.tsx`

Her diş anatomik silüetle çizilmiş: molar geniş taban + çift kök, premolar tek/çift kök, kanin uzun sivri kök, kesici düz kron. Tıklanınca durum atar, JSON dışarı verir.

```tsx
"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export type ToothStatus =
  | "healthy" | "caries" | "filled"
  | "missing" | "crown"  | "implant" | "extract";

export type ToothChartData = Record<string, ToothStatus>;

export const TOOTH_STATUS: Record<
  ToothStatus,
  { fill: string; stroke: string; label: string; dashArray?: string }
> = {
  healthy: { fill: "#0a2e1a", stroke: "#1a5c30", label: "Sağlıklı"  },
  caries:  { fill: "#3d2c0a", stroke: "#8b5a0a", label: "Çürük"     },
  filled:  { fill: "#1e3a5f", stroke: "#2d62a8", label: "Dolgulu"   },
  missing: { fill: "#111520", stroke: "#252d3f", label: "Eksik",     dashArray: "2 2" },
  crown:   { fill: "#2e1f5e", stroke: "#6040b0", label: "Kuron"     },
  implant: { fill: "#0c2340", stroke: "#1a5a90", label: "İmplant"   },
  extract: { fill: "#3b1212", stroke: "#8b2020", label: "Çekilecek" },
};

const DEFAULT = { fill: "#1a2030", stroke: "#252d3f" };

// Her diş: id, kron path, kök path dizisi, etiket koordinatı
// viewBox: 0 0 620 310
const UPPER_TEETH = [
  // Q1: 18 → 11
  { id:"18", crown:"M38,90 C36,82 36,72 40,66 C44,60 52,58 56,60 C60,62 64,60 68,62 C72,64 72,74 70,82 C68,90 64,96 56,98 C48,98 40,98 38,90Z", roots:["M44,96 C43,106 42,118 44,130 C46,138 50,142 52,140 C54,138 54,128 53,118 L50,100Z","M60,97 C60,108 60,120 62,132 C64,140 68,143 70,140 C72,137 70,124 68,114 L64,100Z"], lx:54, ly:148 },
  { id:"17", crown:"M76,88 C74,78 74,68 78,62 C82,56 90,54 95,57 C100,60 104,57 108,60 C112,63 112,74 110,83 C108,92 104,98 96,100 C88,100 78,98 76,88Z", roots:["M82,98 C81,110 80,124 82,136 C84,144 88,148 91,145 C93,142 93,130 92,118 L88,102Z","M100,99 C100,112 100,126 102,138 C104,146 108,149 110,146 C112,143 110,128 108,116 L105,102Z"], lx:94, ly:162 },
  { id:"16", crown:"M116,86 C114,76 114,65 119,58 C124,52 132,50 138,53 C143,56 147,53 152,56 C156,59 157,71 155,81 C153,91 148,98 139,100 C130,100 118,96 116,86Z", roots:["M122,98 C121,112 120,128 122,140 C124,148 128,152 132,149 C135,146 135,132 134,118 L128,102Z","M142,99 C142,114 142,130 145,142 C147,150 151,153 154,150 C156,147 154,132 152,118 L148,102Z"], lx:136, ly:164 },
  { id:"15", crown:"M162,89 C161,80 161,70 165,64 C169,58 176,56 181,59 C186,62 188,70 187,80 C186,90 182,97 176,98 C170,98 163,98 162,89Z", roots:["M170,97 C169,110 168,124 170,136 C172,144 176,147 179,144 C181,141 181,126 180,112 L175,100Z"], lx:175, ly:152 },
  { id:"14", crown:"M196,89 C195,80 195,70 199,64 C203,58 210,56 215,59 C220,62 222,70 221,80 C220,90 216,97 210,98 C204,98 197,98 196,89Z", roots:["M203,97 C202,112 202,128 204,140 C205,148 208,150 211,147 C213,144 212,128 210,114 L207,100Z","M214,97 C214,112 215,128 218,140 C220,148 223,150 225,146 C226,142 224,126 222,112 L218,100Z"], lx:209, ly:157 },
  { id:"13", crown:"M232,92 C231,82 232,70 236,62 C239,56 244,54 248,57 C252,60 254,68 253,80 C252,92 249,99 244,100 C239,100 233,100 232,92Z", roots:["M237,99 C236,114 235,134 237,150 C239,162 243,167 246,164 C249,161 249,144 248,128 L244,102Z"], lx:243, ly:172 },
  { id:"12", crown:"M261,94 C260,85 261,74 264,67 C267,61 272,59 276,62 C280,65 281,74 280,84 C279,94 276,100 271,100 C266,100 262,101 261,94Z", roots:["M266,99 C265,114 265,132 267,146 C269,157 272,161 275,158 C277,155 277,138 276,122 L272,102Z"], lx:271, ly:164 },
  { id:"11", crown:"M286,93 C285,83 286,72 290,65 C294,59 299,57 303,60 C307,63 308,73 307,83 C306,93 302,100 297,100 C292,100 287,101 286,93Z", roots:["M292,99 C291,115 291,134 293,148 C295,160 299,164 302,161 C305,158 305,140 303,124 L299,102Z"], lx:297, ly:167 },
  // Q2: 21 → 28
  { id:"21", crown:"M317,93 C316,83 317,72 321,65 C325,59 330,57 334,60 C338,63 339,73 338,83 C337,93 333,100 328,100 C323,100 318,101 317,93Z", roots:["M323,99 C322,115 322,134 324,148 C326,160 330,164 333,161 C336,158 336,140 334,124 L330,102Z"], lx:328, ly:167 },
  { id:"22", crown:"M343,94 C342,85 343,74 346,67 C349,61 354,59 358,62 C362,65 363,74 362,84 C361,94 358,100 353,100 C348,100 344,101 343,94Z", roots:["M348,99 C347,114 347,132 349,146 C351,157 354,161 357,158 C359,155 359,138 358,122 L354,102Z"], lx:353, ly:164 },
  { id:"23", crown:"M370,92 C369,82 370,70 374,62 C377,56 382,54 386,57 C390,60 392,68 391,80 C390,92 387,99 382,100 C377,100 371,100 370,92Z", roots:["M375,99 C374,114 373,134 375,150 C377,162 381,167 384,164 C387,161 387,144 386,128 L382,102Z"], lx:381, ly:172 },
  { id:"24", crown:"M398,89 C397,80 397,70 401,64 C405,58 412,56 417,59 C422,62 424,70 423,80 C422,90 418,97 412,98 C406,98 399,98 398,89Z", roots:["M404,97 C403,112 403,128 405,140 C406,148 409,150 412,147 C414,144 413,128 411,114 L408,100Z","M416,97 C416,112 417,128 420,140 C422,148 425,150 427,146 C428,142 426,126 424,112 L420,100Z"], lx:411, ly:157 },
  { id:"25", crown:"M434,89 C433,80 433,70 437,64 C441,58 448,56 453,59 C458,62 460,70 459,80 C458,90 454,97 448,98 C442,98 435,98 434,89Z", roots:["M442,97 C441,110 440,124 442,136 C444,144 448,147 451,144 C453,141 453,126 452,112 L447,100Z"], lx:447, ly:152 },
  { id:"26", crown:"M464,86 C462,76 462,65 467,58 C472,52 480,50 486,53 C491,56 495,53 500,56 C504,59 505,71 503,81 C501,91 496,98 487,100 C478,100 466,96 464,86Z", roots:["M470,98 C469,112 468,128 470,140 C472,148 476,152 480,149 C483,146 483,132 482,118 L476,102Z","M490,99 C490,114 490,130 493,142 C495,150 499,153 502,150 C504,147 502,132 500,118 L496,102Z"], lx:484, ly:164 },
  { id:"27", crown:"M508,88 C506,78 506,68 510,62 C514,56 522,54 527,57 C532,60 536,57 540,60 C544,63 544,74 542,83 C540,92 536,98 528,100 C520,100 510,98 508,88Z", roots:["M514,98 C513,110 512,124 514,136 C516,144 520,148 523,145 C525,142 525,130 524,118 L520,102Z","M532,99 C532,112 532,126 534,138 C536,146 540,149 542,146 C544,143 542,128 540,116 L537,102Z"], lx:526, ly:162 },
  { id:"28", crown:"M548,90 C546,82 546,72 550,66 C554,60 562,58 566,60 C570,62 574,60 578,62 C582,64 582,74 580,82 C578,90 574,96 566,98 C558,98 550,98 548,90Z", roots:["M554,96 C553,106 552,118 554,130 C556,138 560,142 562,140 C564,138 564,128 563,118 L560,100Z","M570,97 C570,108 570,120 572,132 C574,140 578,143 580,140 C582,137 580,124 578,114 L574,100Z"], lx:564, ly:148 },
] as const;

const LOWER_TEETH = [
  // Q4: 48 → 41
  { id:"48", crown:"M38,218 C40,226 40,236 36,242 C32,248 44,250 54,248 C64,246 72,248 72,242 C72,236 70,226 68,218 C64,216 44,216 38,218Z", roots:["M44,220 C43,210 42,198 44,186 C46,178 50,175 52,177 C54,180 54,192 53,204 L50,218Z","M60,219 C60,208 60,196 62,184 C64,176 68,173 70,176 C72,179 70,194 68,206 L64,218Z"], lx:54, ly:264 },
  { id:"47", crown:"M76,216 C78,224 78,234 74,240 C72,246 84,248 94,246 C104,244 112,246 112,240 C112,234 110,224 108,216 C104,214 80,214 76,216Z", roots:["M82,218 C81,206 80,192 82,180 C84,172 88,168 91,171 C93,174 93,188 92,202 L88,216Z","M100,217 C100,204 100,190 102,178 C104,170 108,167 110,170 C112,173 110,188 108,202 L105,216Z"], lx:94, ly:260 },
  { id:"46", crown:"M116,214 C118,222 118,234 114,240 C112,246 126,248 138,246 C150,244 158,246 158,240 C158,232 156,220 152,214 C148,212 120,212 116,214Z", roots:["M122,216 C121,202 120,186 122,174 C124,166 128,162 132,165 C135,168 135,184 134,198 L128,214Z","M142,215 C142,200 142,184 145,172 C147,164 151,161 154,164 C156,167 154,184 152,198 L148,214Z"], lx:136, ly:262 },
  { id:"45", crown:"M162,217 C163,226 163,236 160,242 C159,246 170,248 176,246 C182,244 188,246 188,242 C188,234 187,224 185,217 C181,215 165,215 162,217Z", roots:["M170,218 C169,205 168,191 170,179 C172,171 176,168 179,171 C181,174 181,190 180,204 L175,218Z"], lx:175, ly:258 },
  { id:"44", crown:"M196,217 C197,226 197,236 194,242 C193,246 204,248 210,246 C216,244 222,246 222,242 C222,234 221,224 219,217 C215,215 199,215 196,217Z", roots:["M203,219 C202,205 202,190 204,178 C205,170 208,167 211,170 C213,173 212,190 210,204 L207,218Z","M214,219 C214,205 215,190 218,178 C220,170 223,167 225,171 C226,175 224,192 222,206 L218,218Z"], lx:209, ly:257 },
  { id:"43", crown:"M232,216 C233,225 233,234 230,240 C229,244 238,246 244,244 C250,242 254,244 254,240 C254,232 253,223 250,216 C247,214 235,214 232,216Z", roots:["M237,217 C236,202 235,182 237,166 C239,154 243,149 246,152 C249,155 249,172 248,188 L244,218Z"], lx:243, ly:256 },
  { id:"42", crown:"M261,216 C262,224 262,234 259,240 C258,244 266,246 271,244 C276,242 281,244 281,240 C281,232 280,222 277,216 C274,214 263,214 261,216Z", roots:["M266,217 C265,202 265,184 267,170 C269,159 272,155 275,158 C277,161 277,180 276,196 L272,218Z"], lx:271, ly:256 },
  { id:"41", crown:"M286,216 C287,224 287,234 284,240 C283,244 292,246 297,244 C302,242 307,244 307,240 C307,232 306,222 303,216 C300,214 288,214 286,216Z", roots:["M292,217 C291,203 291,184 293,170 C295,159 299,155 302,158 C305,161 305,180 303,196 L299,218Z"], lx:297, ly:256 },
  // Q3: 31 → 38
  { id:"31", crown:"M317,216 C318,224 318,234 315,240 C314,244 323,246 328,244 C333,242 338,244 338,240 C338,232 337,222 334,216 C331,214 319,214 317,216Z", roots:["M323,217 C322,203 322,184 324,170 C326,159 330,155 333,158 C336,161 336,180 334,196 L330,218Z"], lx:328, ly:256 },
  { id:"32", crown:"M343,216 C344,224 344,234 341,240 C340,244 348,246 353,244 C358,242 363,244 363,240 C363,232 362,222 359,216 C356,214 345,214 343,216Z", roots:["M348,217 C347,202 347,184 349,170 C351,159 354,155 357,158 C359,161 359,180 358,196 L354,218Z"], lx:353, ly:256 },
  { id:"33", crown:"M370,216 C371,225 371,234 368,240 C367,244 376,246 382,244 C388,242 392,244 392,240 C392,232 391,223 388,216 C385,214 373,214 370,216Z", roots:["M375,217 C374,202 373,182 375,166 C377,154 381,149 384,152 C387,155 387,172 386,188 L382,218Z"], lx:381, ly:256 },
  { id:"34", crown:"M398,217 C399,226 399,236 396,242 C395,246 406,248 412,246 C418,244 424,246 424,242 C424,234 423,224 421,217 C417,215 401,215 398,217Z", roots:["M404,219 C403,205 403,190 405,178 C406,170 409,167 412,170 C414,173 413,190 411,204 L408,218Z","M416,219 C416,205 417,190 420,178 C422,170 425,167 427,171 C428,175 426,192 424,206 L420,218Z"], lx:411, ly:257 },
  { id:"35", crown:"M434,217 C435,226 435,236 432,242 C431,246 442,248 448,246 C454,244 460,246 460,242 C460,234 459,224 457,217 C453,215 437,215 434,217Z", roots:["M442,218 C441,205 440,191 442,179 C444,171 448,168 451,171 C453,174 453,190 452,204 L447,218Z"], lx:447, ly:258 },
  { id:"36", crown:"M464,214 C466,222 466,234 462,240 C460,246 474,248 486,246 C498,244 506,246 506,240 C506,232 504,220 500,214 C496,212 468,212 464,214Z", roots:["M470,216 C469,202 468,186 470,174 C472,166 476,162 480,165 C483,168 483,184 482,198 L476,214Z","M490,215 C490,200 490,184 493,172 C495,164 499,161 502,164 C504,167 502,184 500,198 L496,214Z"], lx:484, ly:262 },
  { id:"37", crown:"M508,216 C510,224 510,234 506,240 C504,246 516,248 526,246 C536,244 544,246 544,240 C544,234 542,224 540,216 C536,214 512,214 508,216Z", roots:["M514,218 C513,206 512,192 514,180 C516,172 520,168 523,171 C525,174 525,190 524,204 L520,216Z","M532,217 C532,204 532,190 534,178 C536,170 540,167 542,170 C544,173 542,190 540,204 L537,216Z"], lx:526, ly:262 },
  { id:"38", crown:"M548,218 C550,226 550,236 546,242 C542,248 554,250 564,248 C574,246 582,248 582,242 C582,236 580,226 578,218 C574,216 554,216 548,218Z", roots:["M554,220 C553,210 552,198 554,186 C556,178 560,175 562,177 C564,180 564,194 563,206 L560,218Z","M570,219 C570,208 570,196 572,184 C574,176 578,173 580,176 C582,179 580,194 578,206 L574,218Z"], lx:564, ly:264 },
] as const;

function AnatomicTooth({ id, crown, roots, lx, ly, status, onClick, readOnly }: {
  id: string; crown: string; roots: readonly string[];
  lx: number; ly: number; status?: ToothStatus;
  onClick?: () => void; readOnly?: boolean;
}) {
  const s      = status ? TOOTH_STATUS[status] : null;
  const fill   = s?.fill   ?? DEFAULT.fill;
  const stroke = s?.stroke ?? DEFAULT.stroke;
  const dash   = s?.dashArray;
  return (
    <g onClick={readOnly ? undefined : onClick}
       style={{ cursor: readOnly ? "default" : "pointer" }}
       className="hover:opacity-75 transition-opacity">
      {roots.map((d, i) => (
        <path key={i} d={d} fill={fill} stroke={stroke} strokeWidth={0.6} strokeDasharray={dash} />
      ))}
      <path d={crown} fill={fill} stroke={stroke} strokeWidth={0.8} strokeDasharray={dash} />
      <text x={lx} y={ly} textAnchor="middle" fontSize={7.5}
            fill={status ? "#94a3b8" : "#475569"} fontFamily="sans-serif"
            style={{ pointerEvents: "none", userSelect: "none" }}>
        {id}
      </text>
    </g>
  );
}

export default function AnatomicToothChart({
  value = {}, onChange, activeStatus = "caries", readOnly = false, className,
}: {
  value?: ToothChartData; onChange?: (d: ToothChartData) => void;
  activeStatus?: ToothStatus; readOnly?: boolean; className?: string;
}) {
  const [chart, setChart] = useState<ToothChartData>(value);
  const handleClick = useCallback((id: string) => {
    if (readOnly) return;
    const next = { ...chart };
    if (next[id] === activeStatus) delete next[id]; else next[id] = activeStatus;
    setChart(next); onChange?.(next);
  }, [chart, activeStatus, readOnly, onChange]);

  return (
    <div className={cn("w-full", className)}>
      <svg width="100%" viewBox="0 0 620 310"
           aria-label="Anatomik diş şeması (odontogram)" role="img">
        <line x1={310} y1={20}  x2={310} y2={290} stroke="#1e2535" strokeWidth={0.8}/>
        <line x1={30}  y1={155} x2={590} y2={155} stroke="#1e2535" strokeWidth={0.8}/>
        {[{x:155,y:13,l:"Sağ Üst — Q1"},{x:465,y:13,l:"Sol Üst — Q2"},
          {x:155,y:300,l:"Sağ Alt — Q4"},{x:465,y:300,l:"Sol Alt — Q3"}].map(q=>(
          <text key={q.l} x={q.x} y={q.y} textAnchor="middle"
                fontSize={9} fill="#334155" fontFamily="sans-serif">{q.l}</text>
        ))}
        {UPPER_TEETH.map(t=><AnatomicTooth key={t.id} {...t} status={chart[t.id]} onClick={()=>handleClick(t.id)} readOnly={readOnly}/>)}
        {LOWER_TEETH.map(t=><AnatomicTooth key={t.id} {...t} status={chart[t.id]} onClick={()=>handleClick(t.id)} readOnly={readOnly}/>)}
      </svg>

      {!readOnly && (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          {(Object.entries(TOOTH_STATUS) as [ToothStatus, typeof TOOTH_STATUS[ToothStatus]][]).map(([key,cfg])=>(
            <span key={key} className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="inline-block h-2.5 w-2.5 rounded-[2px]"
                    style={{background:cfg.fill,border:`1px solid ${cfg.stroke}`,
                            outline:key==="missing"?"1px dashed #252d3f":undefined}}/>
              {cfg.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Kullanım:**

```tsx
import AnatomicToothChart, { ToothChartData, ToothStatus }
  from "@/components/dental/AnatomicToothChart";

const [chart, setChart] = useState<ToothChartData>({});
const [status, setStatus] = useState<ToothStatus>("caries");

<select value={status} onChange={e => setStatus(e.target.value as ToothStatus)}>
  <option value="caries">Çürük</option>
  <option value="filled">Dolgulu</option>
  <option value="missing">Eksik</option>
  <option value="crown">Kuron</option>
  <option value="implant">İmplant</option>
  <option value="extract">Çekilecek</option>
  <option value="healthy">Sağlıklı</option>
</select>

<AnatomicToothChart value={chart} onChange={setChart} activeStatus={status} />

// Salt okunur (muayene görüntüleme):
<AnatomicToothChart value={examRecord.toothChart as ToothChartData} readOnly />

// Kaydetmek için (Prisma ExamRecord.toothChart alanı Json):
await prisma.examRecord.create({ data: { toothChart: chart, ...rest } });
```

---

## 2. ToothCrossSection — Diş Kesiti

**Dosya:** `src/components/dental/ToothCrossSection.tsx`

Hasta bilgilendirme ve onboarding sayfaları için anatomik dikey kesit.

```tsx
export default function ToothCrossSection({
  width = "100%", showLabels = true, className,
}: { width?: string|number; showLabels?: boolean; className?: string }) {
  return (
    <svg width={width} viewBox="0 0 680 340" role="img"
         aria-label="Diş anatomisi kesiti" className={className}>
      <title>Diş Anatomisi Kesiti</title>
      <desc>Mine, dentin, pulpa, sement ve periodontal ligament katmanlarını gösteren dikey kesit.</desc>

      {/* Alveolar bone */}
      <path d="M252,220 C245,240 242,268 246,295 C253,318 268,330 290,332 C312,330 327,318 334,295 C338,268 335,240 328,220 Z"
            fill="#3b1a2a" stroke="#5a2a3a" strokeWidth={0.8}/>
      {/* Enamel */}
      <path d="M290,30 C270,30 240,50 230,90 C218,135 215,170 218,210 C220,240 225,270 240,295 C252,315 268,325 290,328 C312,325 328,315 340,295 C355,270 360,240 362,210 C365,170 362,135 350,90 C340,50 310,30 290,30 Z"
            fill="#1e3a5f" stroke="#2d5a9e" strokeWidth={1}/>
      {/* Dentin */}
      <path d="M290,50 C275,50 254,66 246,98 C237,140 235,172 238,208 C240,234 244,260 255,282 C264,300 275,308 290,310 C305,308 316,300 325,282 C336,260 340,234 342,208 C345,172 343,140 334,98 C326,66 305,50 290,50 Z"
            fill="#0f2a4a" stroke="#1e4a7a" strokeWidth={0.8}/>
      {/* Pulp */}
      <path d="M290,80 C281,80 270,90 265,112 C260,138 259,162 261,192 C262,212 265,234 272,252 C278,266 283,272 290,274 C297,272 302,266 308,252 C315,234 318,212 319,192 C321,162 320,138 315,112 C310,90 299,80 290,80 Z"
            fill="#2e1a0a" stroke="#5a3a1a" strokeWidth={0.8}/>
      {/* Gum line */}
      <rect x={210} y={208} width={160} height={4} rx={2} fill="#4a1a2a" opacity={0.7}/>
      {/* PDL fibers */}
      {[225,248,270].map(y=>(
        <g key={y}>
          <line x1={240} y1={y} x2={252} y2={y-3} stroke="#3a2a1a" strokeWidth={1.2} opacity={0.8}/>
          <line x1={340} y1={y} x2={328} y2={y-3} stroke="#3a2a1a" strokeWidth={1.2} opacity={0.8}/>
        </g>
      ))}
      {/* Apex */}
      <ellipse cx={290} cy={330} rx={5} ry={3} fill="#1a0a0a" stroke="#3a1a1a" strokeWidth={0.8}/>
      {/* Crown/Root label */}
      <text x={150} y={213} fontSize={9} fill="#334155" fontFamily="sans-serif">↑ Kron</text>
      <text x={150} y={226} fontSize={9} fill="#334155" fontFamily="sans-serif">↓ Kök</text>

      {showLabels && <>
        <line x1={352} y1={72}  x2={390} y2={60}  stroke="#2d5a9e" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={394} y={64}  fontSize={12} fill="#60a5fa" fontFamily="sans-serif" fontWeight={500}>Mine</text>
        <text x={394} y={77}  fontSize={10} fill="#475569" fontFamily="sans-serif">En sert doku</text>
        <line x1={342} y1={110} x2={390} y2={104} stroke="#1e4a7a" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={394} y={108} fontSize={12} fill="#38bdf8" fontFamily="sans-serif" fontWeight={500}>Dentin</text>
        <text x={394} y={121} fontSize={10} fill="#475569" fontFamily="sans-serif">Minenin altı</text>
        <line x1={320} y1={155} x2={390} y2={150} stroke="#5a3a1a" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={394} y={154} fontSize={12} fill="#fbbf24" fontFamily="sans-serif" fontWeight={500}>Pulpa</text>
        <text x={394} y={167} fontSize={10} fill="#475569" fontFamily="sans-serif">Sinir ve damarlar</text>
        <line x1={280} y1={210} x2={390} y2={200} stroke="#4a1a2a" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={394} y={204} fontSize={12} fill="#f472b6" fontFamily="sans-serif" fontWeight={500}>Diş eti</text>
        <text x={394} y={217} fontSize={10} fill="#475569" fontFamily="sans-serif">Gingiva</text>
        <line x1={238} y1={260} x2={170} y2={250} stroke="#3a2a1a" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={52}  y={254} fontSize={12} fill="#fb923c" fontFamily="sans-serif" fontWeight={500}>Sement</text>
        <text x={52}  y={267} fontSize={10} fill="#475569" fontFamily="sans-serif">Kök yüzeyi</text>
        <line x1={242} y1={244} x2={170} y2={290} stroke="#3a2a1a" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={38}  y={294} fontSize={12} fill="#a78bfa" fontFamily="sans-serif" fontWeight={500}>Periodontal lig.</text>
        <text x={38}  y={307} fontSize={10} fill="#475569" fontFamily="sans-serif">Dişi tutar</text>
        <line x1={290} y1={332} x2={390} y2={332} stroke="#3a1a1a" strokeWidth={0.7} strokeDasharray="3 2"/>
        <text x={394} y={336} fontSize={12} fill="#f87171" fontFamily="sans-serif" fontWeight={500}>Apikal foramen</text>
      </>}
    </svg>
  );
}
```

---

## 3. JawSchema — Çene Şeması

**Dosya:** `src/components/dental/JawSchema.tsx`

Üst (maksilla) ve alt (mandibula) çene oklüzal görünümü. `highlightTeeth` prop'u ile belirli dişleri vurgulayabilirsin.

```tsx
export default function JawSchema({
  width = "100%", className, highlightTeeth = [],
}: { width?: string|number; className?: string; highlightTeeth?: string[] }) {

  const hi = (id: string, base: string, bs: string) =>
    highlightTeeth.includes(id)
      ? { fill: "#3d2c0a", stroke: "#8b5a0a" }
      : { fill: base, stroke: bs };

  // [cx, cy, rx, ry, id]
  const upper: [number,number,number,number,string][] = [
    [-96,0,10,14,"18"],[-86,-22,9,13,"17"],[-72,-40,9,13,"16"],
    [-55,-54,8,11,"15"],[-37,-63,7,10,"14"],[-18,-68,7,9,"13"],
    [0,-70,7,9,"12"],[18,-68,7,9,"11"],
    [37,-63,7,10,"21"],[55,-54,8,11,"22"],[72,-40,9,13,"23"],
    [86,-22,9,13,"24"],[96,0,10,14,"25"],[96,22,10,14,"26"],
    [86,38,9,13,"27"],[-86,38,9,13,"28"],[-96,22,10,14,"18x"],
  ];
  const lower: [number,number,number,number,string][] = [
    [-96,4,10,13,"48"],[-86,-18,9,12,"47"],[-72,-36,9,12,"46"],
    [-55,-50,8,10,"45"],[-37,-59,7,9,"44"],[-18,-63,6,8,"43"],
    [0,-65,6,8,"42"],[18,-63,6,8,"41"],
    [37,-59,7,9,"31"],[55,-50,8,10,"32"],[72,-36,9,12,"33"],
    [86,-18,9,12,"34"],[96,4,10,13,"35"],[96,22,10,13,"36"],
    [86,36,9,12,"37"],[-86,36,9,12,"38"],[-96,22,10,13,"48x"],
  ];

  return (
    <svg width={width} viewBox="0 0 680 420" role="img"
         aria-label="Çene şeması — üst ve alt çene oklüzal görünüm" className={className}>
      <title>Çene Şeması</title>

      {/* Upper jaw */}
      <text x={340} y={34}  fontSize={11} fill="#60a5fa" textAnchor="middle" fontFamily="sans-serif" fontWeight={500}>Üst Çene (Maksilla)</text>
      <text x={340} y={47}  fontSize={9}  fill="#334155" textAnchor="middle" fontFamily="sans-serif">Oklüzal görünüm</text>
      <g transform="translate(340,110)">
        <ellipse cx={0} cy={-68} rx={28} ry={18} fill="#1a1025" stroke="#2e1f5e" strokeWidth={0.8} strokeDasharray="3 2"/>
        <path d="M-110,0 C-110,-60 -70,-90 0,-92 C70,-90 110,-60 110,0 C110,30 80,50 0,52 C-80,50 -110,30 -110,0Z"
              fill="#1a1d2a" stroke="#2d3748" strokeWidth={0.8}/>
        <line x1={0} y1={-90} x2={0} y2={50} stroke="#252d3f" strokeWidth={0.6} strokeDasharray="3 2"/>
        <circle cx={0} cy={-74} r={5} fill="#111520" stroke="#252d3f" strokeWidth={0.6}/>
        {upper.map(([cx,cy,rx,ry,id])=>{
          const c=hi(id,"#1e3a5f","#2d5a9e");
          return <ellipse key={id} cx={cx} cy={cy} rx={rx} ry={ry} fill={c.fill} stroke={c.stroke} strokeWidth={0.7}/>;
        })}
      </g>

      {/* Lower jaw */}
      <text x={340} y={222} fontSize={11} fill="#38bdf8" textAnchor="middle" fontFamily="sans-serif" fontWeight={500}>Alt Çene (Mandibula)</text>
      <text x={340} y={235} fontSize={9}  fill="#334155" textAnchor="middle" fontFamily="sans-serif">Oklüzal görünüm</text>
      <g transform="translate(340,310)">
        <path d="M-115,10 C-118,-20 -100,-55 -65,-72 C-30,-86 30,-86 65,-72 C100,-55 118,-20 115,10 C112,38 88,52 0,54 C-88,52 -112,38 -115,10Z"
              fill="#1a1d2a" stroke="#2d3748" strokeWidth={0.8}/>
        <line x1={0} y1={-85} x2={0} y2={52} stroke="#252d3f" strokeWidth={0.6} strokeDasharray="3 2"/>
        <circle cx={-52} cy={14} r={4} fill="#111520" stroke="#252d3f" strokeWidth={0.6}/>
        <circle cx={52}  cy={14} r={4} fill="#111520" stroke="#252d3f" strokeWidth={0.6}/>
        {lower.map(([cx,cy,rx,ry,id])=>{
          const c=hi(id,"#0f2a4a","#1e4a7a");
          return <ellipse key={id} cx={cx} cy={cy} rx={rx} ry={ry} fill={c.fill} stroke={c.stroke} strokeWidth={0.7}/>;
        })}
      </g>

      {/* Side labels */}
      {[{x:66,y:115,l:"Sağ"},{x:614,y:115,l:"Sol"},{x:66,y:315,l:"Sağ"},{x:614,y:315,l:"Sol"}].map(o=>(
        <text key={o.x+o.y} x={o.x} y={o.y} fontSize={9} fill="#334155" textAnchor="middle" fontFamily="sans-serif">{o.l}</text>
      ))}

      {/* Legend */}
      <circle cx={220} cy={400} r={6} fill="#1e3a5f" stroke="#2d5a9e" strokeWidth={0.7}/>
      <text x={230} y={404} fontSize={10} fill="#60a5fa" fontFamily="sans-serif">Posterior (molar / premolar)</text>
      <circle cx={430} cy={400} r={6} fill="#0f2a4a" stroke="#1e4a7a" strokeWidth={0.7}/>
      <text x={440} y={404} fontSize={10} fill="#38bdf8" fontFamily="sans-serif">Anterior (kesici / köpek dişi)</text>
    </svg>
  );
}
```

**Kullanım:**

```tsx
import JawSchema from "@/components/dental/JawSchema";

// Normal
<JawSchema />

// Tedavi planındaki dişleri vurgula
<JawSchema highlightTeeth={["16","17","36","37"]} />
```

---

## 4. EmptyStateIllustration — Boş Durum İllüstrasyonları

**Dosya:** `src/components/dental/EmptyStateIllustration.tsx`

```tsx
type EmptyVariant = "appointments"|"patients"|"invoices"|"inventory"|"exam"|"documents";

const ICONS: Record<EmptyVariant, ()=>React.ReactElement> = {
  appointments: ()=>(
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <rect x={8}  y={12} width={48} height={44} rx={8} fill="#1e3a5f" stroke="#2d5a9e" strokeWidth={1}/>
      <rect x={8}  y={22} width={48} height={2}        fill="#2d5a9e" opacity={0.5}/>
      <rect x={18} y={8}  width={4}  height={10} rx={2} fill="#60a5fa"/>
      <rect x={42} y={8}  width={4}  height={10} rx={2} fill="#60a5fa"/>
      <rect x={16} y={32} width={14} height={4}  rx={2} fill="#1e3a5f"/>
      <rect x={34} y={32} width={14} height={4}  rx={2} fill="#1e3a5f"/>
      <rect x={16} y={40} width={10} height={4}  rx={2} fill="#1e3a5f"/>
      <circle cx={46} cy={46} r={10} fill="#0a0b0f" stroke="#1e2535" strokeWidth={1}/>
      <line x1={42} y1={46} x2={50} y2={46} stroke="#334155" strokeWidth={1.5} strokeLinecap="round"/>
      <line x1={46} y1={42} x2={46} y2={50} stroke="#334155" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
  patients: ()=>(
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <circle cx={32} cy={22} r={12} fill="#2e1f5e" stroke="#5a3fa0" strokeWidth={1}/>
      <circle cx={32} cy={22} r={6}  fill="#1a1025" stroke="#3a2a5a" strokeWidth={0.8}/>
      <path d="M12 56 C12 44 20 38 32 38 C44 38 52 44 52 56" fill="#2e1f5e" stroke="#5a3fa0" strokeWidth={1}/>
      <line x1={28} y1={48} x2={36} y2={48} stroke="#3a2a5a" strokeWidth={5} strokeLinecap="round"/>
      <line x1={32} y1={44} x2={32} y2={52} stroke="#3a2a5a" strokeWidth={5} strokeLinecap="round"/>
    </svg>
  ),
  invoices: ()=>(
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <rect x={14} y={8}  width={36} height={46} rx={6} fill="#3d2c0a" stroke="#6b4a12" strokeWidth={1}/>
      <rect x={20} y={18} width={24} height={2}  rx={1} fill="#6b4a12"/>
      <rect x={20} y={24} width={18} height={2}  rx={1} fill="#6b4a12"/>
      <rect x={20} y={30} width={20} height={2}  rx={1} fill="#6b4a12"/>
      <rect x={20} y={38} width={24} height={8}  rx={3} fill="#5a3a0a"/>
      <line x1={26} y1={42} x2={38} y2={42} stroke="#3d2c0a" strokeWidth={5} strokeLinecap="round"/>
    </svg>
  ),
  inventory: ()=>(
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <path d="M32 8 L54 46 L10 46 Z" fill="#0a2e1a" stroke="#1a4a2e" strokeWidth={1}/>
      <line x1={32} y1={22} x2={32} y2={34} stroke="#34d399" strokeWidth={2.5} strokeLinecap="round"/>
      <circle cx={32} cy={39} r={2} fill="#34d399"/>
      <circle cx={50} cy={50} r={8} fill="#0a2e1a" stroke="#1a4a2e" strokeWidth={1}/>
      <path d="M47 50 L49.5 52.5 L53 47" stroke="#34d399" strokeWidth={1.5}
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  exam: ()=>(
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <rect x={12} y={8}  width={40} height={48} rx={6} fill="#3b1a12" stroke="#6b3a20" strokeWidth={1}/>
      <rect x={20} y={18} width={24} height={2}  rx={1} fill="#6b3a20"/>
      <rect x={20} y={24} width={16} height={2}  rx={1} fill="#6b3a20"/>
      <path d="M20 36 C20 32 24 30 28 30 C32 30 36 32 36 36 C36 40 34 42 28 44 C22 42 20 40 20 36Z"
            fill="#5a2a14" stroke="#7a3a18" strokeWidth={0.8}/>
      <line x1={28} y1={33} x2={28} y2={39} stroke="#fb923c" strokeWidth={1.5} strokeLinecap="round"/>
      <line x1={25} y1={36} x2={31} y2={36} stroke="#fb923c" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
  documents: ()=>(
    <svg width={64} height={64} viewBox="0 0 64 64" aria-hidden>
      <path d="M36 10 L48 22 L48 50 C48 52.2 46.2 54 44 54 L20 54 C17.8 54 16 52.2 16 50 L16 14 C16 11.8 17.8 10 20 10 Z"
            fill="#1e2535" stroke="#2d3748" strokeWidth={1}/>
      <path d="M36 10 L36 22 L48 22" fill="none" stroke="#2d3748" strokeWidth={1}/>
      <line x1={24} y1={30} x2={40} y2={30} stroke="#2d3748" strokeWidth={4} strokeLinecap="round"/>
      <line x1={24} y1={37} x2={36} y2={37} stroke="#2d3748" strokeWidth={4} strokeLinecap="round"/>
      <circle cx={32} cy={32} r={14} fill="none" stroke="#334155" strokeWidth={1.5} strokeDasharray="3 3"/>
      <line x1={22} y1={22} x2={42} y2={42} stroke="#3b1212" strokeWidth={1.5} strokeLinecap="round"/>
    </svg>
  ),
};

const COPY: Record<EmptyVariant,{title:string;description:string}> = {
  appointments: { title:"Randevu yok",       description:"Henüz randevu oluşturulmamış" },
  patients:     { title:"Hasta yok",          description:"İlk hastayı kaydedin"          },
  invoices:     { title:"Fatura yok",         description:"Bekleyen ödeme bulunmuyor"     },
  inventory:    { title:"Stok normal",        description:"Kritik uyarı yok"              },
  exam:         { title:"Muayene kaydı yok",  description:"Henüz muayene yapılmamış"      },
  documents:    { title:"Belge yok",          description:"Henüz dosya yüklenmemiş"       },
};

export default function EmptyStateIllustration({
  variant, title, description, action,
}: { variant:EmptyVariant; title?:string; description?:string; action?:React.ReactNode }) {
  const Icon = ICONS[variant];
  const copy = COPY[variant];
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4"><Icon /></div>
      <h3 className="mb-1 text-[14px] font-medium text-slate-400">{title ?? copy.title}</h3>
      <p className="mb-4 max-w-[200px] text-[12px] leading-relaxed text-slate-600">{description ?? copy.description}</p>
      {action}
    </div>
  );
}
```

---

## 5. ModuleIcon — Modül İkonları

**Dosya:** `src/components/dental/ModuleIcon.tsx`

```tsx
import { Calendar,Users,ClipboardCheck,DollarSign,Package,
         BarChart2,Smartphone,Radio,Share2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleKey = "appointments"|"patients"|"exam"|"finance"|"inventory"|"reports"|"patientApp"|"clinic"|"integrations";

const M: Record<ModuleKey,{Icon:LucideIcon;bg:string;text:string}> = {
  appointments: { Icon:Calendar,       bg:"bg-[#1e3a5f]", text:"text-[#60a5fa]" },
  patients:     { Icon:Users,          bg:"bg-[#2e1f5e]", text:"text-[#a78bfa]" },
  exam:         { Icon:ClipboardCheck, bg:"bg-[#3b1a12]", text:"text-[#fb923c]" },
  finance:      { Icon:DollarSign,     bg:"bg-[#3d2c0a]", text:"text-[#fbbf24]" },
  inventory:    { Icon:Package,        bg:"bg-[#0a2e1a]", text:"text-[#34d399]" },
  reports:      { Icon:BarChart2,      bg:"bg-[#0c2340]", text:"text-[#38bdf8]" },
  patientApp:   { Icon:Smartphone,     bg:"bg-[#3b1228]", text:"text-[#f472b6]" },
  clinic:       { Icon:Radio,          bg:"bg-[#1e2535]", text:"text-[#94a3b8]" },
  integrations: { Icon:Share2,         bg:"bg-[#3b1212]", text:"text-[#f87171]" },
};

const S = {
  sm: { w:"h-7 w-7 rounded-lg",   i:"h-3.5 w-3.5" },
  md: { w:"h-8 w-8 rounded-lg",   i:"h-[15px] w-[15px]" },
  lg: { w:"h-10 w-10 rounded-xl", i:"h-5 w-5" },
};

export default function ModuleIcon({ module, size="md", className }:
  { module:ModuleKey; size?:"sm"|"md"|"lg"; className?:string }) {
  const { Icon, bg, text } = M[module];
  const s = S[size];
  return (
    <div className={cn("flex shrink-0 items-center justify-center", bg, s.w, className)}>
      <Icon className={cn(text, s.i)} strokeWidth={1.8}/>
    </div>
  );
}
```

---

## 6. DentaFlowLogo — Logo

**Dosya:** `src/components/dental/DentaFlowLogo.tsx`

```tsx
import { cn } from "@/lib/utils";

const Icon = ({ size=32 }:{ size?:number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden>
    <defs>
      <linearGradient id="df-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#6366f1"/>
      </linearGradient>
    </defs>
    <rect width={36} height={36} rx={9} fill="url(#df-g)"/>
    <path d="M18 6 C14 6 11 9 11 13 C11 16 12.5 18 14 20 L15 26 L21 26 L22 20 C23.5 18 25 16 25 13 C25 9 22 6 18 6Z"
          fill="white" opacity={0.95}/>
    <path d="M15 26 C15 28 16.2 29 18 29 C19.8 29 21 28 21 26"
          fill="none" stroke="white" strokeWidth={1.2} strokeLinecap="round" opacity={0.7}/>
  </svg>
);

export default function DentaFlowLogo({
  variant="full", iconSize=32, className,
}:{ variant?:"icon"|"full"|"wordmark"; iconSize?:number; className?:string }) {
  if (variant==="icon") return <div className={className}><Icon size={iconSize}/></div>;

  if (variant==="wordmark") return (
    <svg width={120} height={28} viewBox="0 0 120 28" aria-label="DentaFlow" className={className}>
      <defs>
        <linearGradient id="df-wm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#818cf8"/>
        </linearGradient>
      </defs>
      <text x={0}  y={20} fontSize={18} fontWeight={600} fontFamily="sans-serif" fill="url(#df-wm)" letterSpacing={-0.5}>Denta</text>
      <text x={58} y={20} fontSize={18} fontWeight={300} fontFamily="sans-serif" fill="#f1f5f9"      letterSpacing={-0.5}>Flow</text>
    </svg>
  );

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Icon size={iconSize}/>
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold leading-none tracking-tight text-slate-100">DentaFlow</span>
        <span className="mt-0.5 text-[11px] tracking-wide text-slate-500">Klinik Yönetimi</span>
      </div>
    </div>
  );
}
```

---

## Klasör Özeti

```
src/components/dental/
  AnatomicToothChart.tsx      ← Anatomik odontogram (32 diş, interaktif)
  ToothCrossSection.tsx       ← Diş anatomisi kesiti (etiketli/etiketsiz)
  JawSchema.tsx               ← Üst + alt çene şeması (oklüzal görünüm)
  EmptyStateIllustration.tsx  ← 6 boş durum illüstrasyonu
  ModuleIcon.tsx              ← Renkli modül ikonları (9 modül)
  DentaFlowLogo.tsx           ← Logo (icon / full / wordmark)
```

## Bağımlılıklar

```bash
pnpm add lucide-react   # zaten kurulu olmalı
# Ekstra paket gerekmez
```
