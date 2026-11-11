/**
 * Enterprise Worksite Safety Visual Assets
 * Self-contained SVG Data URIs for Qatar QHSE Demonstration Environment.
 * 100% offline-resilient: zero external network calls, zero 403/404 errors, zero broken image icons.
 */

import photo1_1 from './photo_1 (1).png';
import photo1_2 from './photo_1 (2).png';
import photo1_3 from './photo_1 (3).png';
import photo1_4 from './photo_1 (4).png';
import photo1_5 from './photo_1 (5).png';
import photo1_6 from './photo_1 (6).png';
import photo1_7 from './photo_1 (7).png';
import photo1_8 from './photo_1 (8).png';
import sign1 from './sign1.png';
import sign2 from './sign2.png';

export const PHOTO_1_1 = photo1_1;
export const PHOTO_1_2 = photo1_2;
export const PHOTO_1_3 = photo1_3;
export const PHOTO_1_4 = photo1_4;
export const PHOTO_1_5 = photo1_5;
export const PHOTO_1_6 = photo1_6;
export const PHOTO_1_7 = photo1_7;
export const PHOTO_1_8 = photo1_8;
export const PHOTO_SIGN1 = sign1;
export const PHOTO_SIGN2 = sign2;

// Helper to create clean SVG data URI
const createSvgDataUri = (svgString: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
};

export const SVG_FLOOR_OPENING = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="concrete" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4B5563"/>
      <stop offset="50%" stop-color="#374151"/>
      <stop offset="100%" stop-color="#1F2937"/>
    </linearGradient>
    <linearGradient id="voidDepth" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>
    <pattern id="hazardStripe" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="20" height="40" fill="#EF4444"/>
      <rect x="20" width="20" height="40" fill="#FFFFFF"/>
    </pattern>
    <pattern id="cautionTape" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="15" height="30" fill="#F59E0B"/>
      <rect x="15" width="15" height="30" fill="#111827"/>
    </pattern>
  </defs>

  <!-- Concrete Slab Floor -->
  <rect width="800" height="500" fill="url(#concrete)"/>

  <!-- Construction Slab Grid Lines -->
  <path d="M0,120 L800,120 M0,250 L800,250 M0,380 L800,380 M200,0 L200,500 M400,0 L400,500 M600,0 L600,500" stroke="#6B7280" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.4"/>

  <!-- The Void / Penetration Opening (Perspective Slab Cutout) -->
  <polygon points="180,140 620,140 670,360 130,360" fill="url(#voidDepth)" stroke="#9CA3AF" stroke-width="3"/>
  <polygon points="180,140 210,190 620,190 620,140" fill="#0F172A" opacity="0.8"/>
  <polygon points="130,360 170,290 630,290 670,360" fill="#020617"/>

  <!-- Fall Depth Indicator into basement -->
  <line x1="400" y1="180" x2="400" y2="330" stroke="#F87171" stroke-width="2" stroke-dasharray="4,4"/>
  <polygon points="400,175 395,185 405,185" fill="#F87171"/>
  <polygon points="400,335 395,325 405,325" fill="#F87171"/>
  <rect x="345" y="240" width="110" height="26" rx="4" fill="#000000" opacity="0.85"/>
  <text x="400" y="258" fill="#FCA5A5" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">FALL: 4.5m</text>

  <!-- Dimension Markings -->
  <rect x="350" y="112" width="100" height="22" rx="4" fill="#1E293B" stroke="#64748B"/>
  <text x="400" y="127" fill="#F1F5F9" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">1.2m WIDTH</text>

  <rect x="645" y="240" width="95" height="22" rx="4" fill="#1E293B" stroke="#64748B"/>
  <text x="692" y="255" fill="#F1F5F9" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">0.9m SPAN</text>

  <!-- Temporary Caution Barrier Tape loosely strung across -->
  <path d="M100,120 Q250,220 700,160" stroke="url(#hazardStripe)" stroke-width="12" fill="none" filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.6))"/>
  <path d="M80,380 Q400,310 720,380" stroke="url(#cautionTape)" stroke-width="10" fill="none" filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.6))"/>

  <!-- Danger Signboard Card pinned on slab -->
  <g transform="translate(480, 290)">
    <rect width="180" height="85" rx="8" fill="#FEF2F2" stroke="#DC2626" stroke-width="3" filter="drop-shadow(0px 6px 12px rgba(0,0,0,0.5))"/>
    <rect width="180" height="28" rx="6" fill="#DC2626"/>
    <text x="90" y="20" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="900" text-anchor="middle" letter-spacing="1">DANGER / خطر</text>
    <text x="90" y="48" fill="#991B1B" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">OPEN FLOOR VOID</text>
    <text x="90" y="65" fill="#4B5563" font-family="monospace" font-size="10" text-anchor="middle">REF: HAZ-2026-0042</text>
    <text x="90" y="78" fill="#DC2626" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">NO UNPROTECTED ACCESS</text>
  </g>

  <!-- GPS Watermark Overlay on Bottom Left -->
  <rect x="15" y="440" width="360" height="45" rx="6" fill="#000000" opacity="0.85"/>
  <text x="25" y="458" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">📍 LUSAIL COMMERCIAL TOWER • ZONE 01</text>
  <text x="25" y="475" fill="#D1D5DB" font-family="monospace" font-size="10">25.4211° N, 51.4922° E • 2026-11-08 09:41 QST</text>
</svg>
`);

/**
 * 2. HEAT STRESS STOPPAGE (MD 17/2021)
 * High-detail illustration of midday sun with direct solar radiation,
 * high-temperature digital weather station display (46.8°C / WBGT 33.2°C).
 */
export const SVG_HEAT_STRESS = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="heatSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7C2D12"/>
      <stop offset="35%" stop-color="#C2410C"/>
      <stop offset="70%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
    <radialGradient id="scorchingSun" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#FEF08A"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Blazing Desert Sky -->
  <rect width="800" height="500" fill="url(#heatSky)"/>

  <!-- Scorching Sun -->
  <circle cx="400" cy="140" r="130" fill="url(#scorchingSun)"/>

  <!-- Heat Wave Distortion Bars -->
  <path d="M0,320 Q200,300 400,320 T800,320" stroke="#FEF3C7" stroke-width="4" fill="none" opacity="0.4"/>
  <path d="M0,340 Q200,325 400,340 T800,340" stroke="#FEF3C7" stroke-width="3" fill="none" opacity="0.3"/>
  <path d="M0,360 Q200,345 400,360 T800,360" stroke="#FDE68A" stroke-width="4" fill="none" opacity="0.5"/>

  <!-- Construction Worksite Silhouette in Heat Haze -->
  <rect x="0" y="380" width="800" height="120" fill="#451A03"/>
  <polygon points="120,380 140,280 150,280 170,380" fill="#292524"/>
  <line x1="80" y1="280" x2="260" y2="280" stroke="#292524" stroke-width="6"/>

  <!-- Digital Weather Station Monitor Box -->
  <g transform="translate(230, 160)">
    <rect width="340" height="200" rx="16" fill="#0F172A" stroke="#EF4444" stroke-width="4" filter="drop-shadow(0px 10px 25px rgba(0,0,0,0.7))"/>
    <rect width="340" height="42" rx="12" fill="#DC2626"/>
    <text x="170" y="27" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle" letter-spacing="1">⚠️ QATAR MD 17/2021 HEAT BAN ACTIVE</text>

    <!-- Temperature Readouts -->
    <text x="95" y="90" fill="#94A3B8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">DRY AMBIENT</text>
    <text x="95" y="135" fill="#EF4444" font-family="monospace" font-size="38" font-weight="900" text-anchor="middle">46.8°C</text>

    <line x1="170" y1="60" x2="170" y2="150" stroke="#334155" stroke-width="2"/>

    <text x="250" y="90" fill="#94A3B8" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">WBGT INDEX</text>
    <text x="250" y="135" fill="#F59E0B" font-family="monospace" font-size="38" font-weight="900" text-anchor="middle">33.2°C</text>

    <!-- Work Stoppage Alert Banner inside display -->
    <rect x="20" y="155" width="300" height="30" rx="6" fill="#991B1B"/>
    <text x="170" y="175" fill="#FEE2E2" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">MANDATORY WORK STOPPAGE: 10:00 – 15:30</text>
  </g>

  <!-- Watermark -->
  <rect x="15" y="440" width="380" height="45" rx="6" fill="#000000" opacity="0.85"/>
  <text x="25" y="458" fill="#F87171" font-family="monospace" font-size="11" font-weight="bold">☀️ MD 17/2021 STATUTORY STOPPAGE IN EFFECT</text>
  <text x="25" y="475" fill="#D1D5DB" font-family="monospace" font-size="10">WBGT THRESHOLD &gt; 32.1°C EXCEEDED • REF: HAZ-2026-0043</text>
</svg>
`);

/**
 * 3. SCAFFOLD DEFECT & MISSING TOE-BOARD
 * Industrial scaffolding tower showing missing edge protection,
 * missing toe-boards and standard coupler clamps.
 */
export const SVG_SCAFFOLD_DEFECT = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="scaffoldBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>

  <rect width="800" height="500" fill="url(#scaffoldBg)"/>

  <!-- Construction Wall Facade -->
  <rect x="50" y="0" width="700" height="500" fill="#334155" opacity="0.3"/>
  <path d="M50,100 L750,100 M50,200 L750,200 M50,300 L750,300 M50,400 L750,400" stroke="#475569" stroke-width="1.5" stroke-dasharray="8,8"/>

  <!-- Vertical Scaffold Standards (Galvanized Steel Pipes) -->
  <rect x="200" y="40" width="16" height="460" fill="#94A3B8" stroke="#475569"/>
  <rect x="420" y="40" width="16" height="460" fill="#94A3B8" stroke="#475569"/>
  <rect x="640" y="40" width="16" height="460" fill="#94A3B8" stroke="#475569"/>

  <!-- Horizontal Ledgers -->
  <rect x="180" y="120" width="480" height="12" fill="#94A3B8" stroke="#475569"/>
  <rect x="180" y="240" width="480" height="12" fill="#94A3B8" stroke="#475569"/>
  <rect x="180" y="360" width="480" height="12" fill="#94A3B8" stroke="#475569"/>

  <!-- Working Platform Wooden Planks (Level 2) -->
  <rect x="190" y="228" width="460" height="14" fill="#B45309" stroke="#78350F" stroke-width="2"/>

  <!-- MISSING TOE-BOARD HIGHLIGHT BOX (Red Dashed Line) -->
  <rect x="205" y="200" width="430" height="28" fill="#EF4444" fill-opacity="0.15" stroke="#DC2626" stroke-width="3" stroke-dasharray="6,6"/>
  <rect x="330" y="196" width="180" height="24" rx="4" fill="#DC2626"/>
  <text x="420" y="213" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">⚠️ MISSING TOE-BOARD (150mm)</text>

  <!-- MISSING MID-RAIL HIGHLIGHT (Between 0.5m and 1.0m) -->
  <line x1="200" y1="175" x2="640" y2="175" stroke="#EF4444" stroke-width="3" stroke-dasharray="8,6"/>
  <rect x="330" y="162" width="180" height="24" rx="4" fill="#B91C1C"/>
  <text x="420" y="179" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">⚠️ MISSING INTERMEDIATE MID-RAIL</text>

  <!-- Scaffold Inspection Tag: RED DO NOT USE -->
  <g transform="translate(130, 260)">
    <rect width="130" height="150" rx="8" fill="#FEF2F2" stroke="#DC2626" stroke-width="3" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.6))"/>
    <rect width="130" height="36" rx="6" fill="#DC2626"/>
    <text x="65" y="24" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">DO NOT USE</text>
    <text x="65" y="60" fill="#991B1B" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">SCAFFOLD DEFECT</text>
    <text x="65" y="80" fill="#1F2937" font-family="monospace" font-size="9" text-anchor="middle">ID: SCF-B02-T04</text>
    <text x="65" y="100" fill="#4B5563" font-family="sans-serif" font-size="9" text-anchor="middle">Height: 6.0m</text>
    <rect x="15" y="115" width="100" height="22" rx="4" fill="#EF4444"/>
    <text x="65" y="130" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">UNSAFE PLATFORM</text>
  </g>

  <!-- Watermark -->
  <rect x="15" y="440" width="370" height="45" rx="6" fill="#000000" opacity="0.85"/>
  <text x="25" y="458" fill="#F87171" font-family="monospace" font-size="11" font-weight="bold">🏗️ FACADE MOBILE SCAFFOLD • WORK AREA A</text>
  <text x="25" y="475" fill="#D1D5DB" font-family="monospace" font-size="10">QCS 2014 SECTION 11 COMPLIANCE AUDIT • HAZ-2026-0044</text>
</svg>
`);

/**
 * 4. CHEMICAL SOLVENT LEAK (LAW 30/2002)
 * High-detail illustration of a punctured 200L chemical drum leaking hydrocarbons
 * near a perimeter stormwater drain with hazardous spill boom containment.
 */
export const SVG_CHEMICAL_LEAK = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="soilGround" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
    <radialGradient id="spillPuddle" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="60%" stop-color="#0F172A"/>
      <stop offset="85%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="500" fill="url(#soilGround)"/>

  <!-- Stormwater Drainage Ditch (Threatened Environment) -->
  <rect x="580" y="0" width="220" height="500" fill="#1E293B"/>
  <line x1="580" y1="0" x2="580" y2="500" stroke="#E2E8F0" stroke-width="4"/>
  <text x="690" y="40" fill="#94A3B8" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">STORMWATER CANAL</text>

  <!-- Spreading Hydrocarbon Solvent Puddle -->
  <ellipse cx="440" cy="340" rx="200" ry="80" fill="url(#spillPuddle)"/>
  <path d="M420,320 Q520,340 580,350 Q520,370 420,350 Z" fill="#020617" opacity="0.9"/>

  <!-- Absorbent Spill Boom (Yellow Foam Barrier) -->
  <path d="M380,260 Q520,290 575,340" stroke="#FBBF24" stroke-width="18" fill="none" stroke-linecap="round" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.5))"/>
  <text x="500" y="270" fill="#78350F" font-family="sans-serif" font-size="10" font-weight="bold">SPILL BOOM DEPLOYED</text>

  <!-- Punctured 200L Blue Steel Chemical Drum -->
  <g transform="translate(250, 150) rotate(-18)">
    <rect width="130" height="220" rx="20" fill="#1D4ED8" stroke="#1E40AF" stroke-width="4" filter="drop-shadow(0px 12px 20px rgba(0,0,0,0.6))"/>
    <ellipse cx="65" cy="20" rx="60" ry="16" fill="#2563EB" stroke="#1E40AF" stroke-width="3"/>
    <line x1="5" y1="75" x2="125" y2="75" stroke="#1E40AF" stroke-width="5"/>
    <line x1="5" y1="145" x2="125" y2="145" stroke="#1E40AF" stroke-width="5"/>

    <!-- Forklift Puncture Hole -->
    <polygon points="55,160 75,150 70,175 50,170" fill="#020617" stroke="#EF4444" stroke-width="3"/>
    <path d="M60,175 Q65,220 70,240" stroke="#0F172A" stroke-width="6" fill="none"/>

    <!-- GHS Flammable & Toxic Diamonds -->
    <g transform="translate(40, 85)">
      <polygon points="25,0 50,25 25,50 0,25" fill="#EF4444" stroke="#FFFFFF" stroke-width="2"/>
      <path d="M25,12 Q30,22 25,36 Q20,22 25,12 Z" fill="#FFFFFF"/>
    </g>
  </g>

  <!-- Environmental Hazard Sign Card -->
  <g transform="translate(60, 60)">
    <rect width="210" height="90" rx="8" fill="#FEF2F2" stroke="#DC2626" stroke-width="3" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.6))"/>
    <rect width="210" height="28" rx="6" fill="#DC2626"/>
    <text x="105" y="20" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="900" text-anchor="middle">LAW NO. 30/2002 BREACH</text>
    <text x="105" y="48" fill="#991B1B" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">HAZARDOUS SOLVENT SPILL</text>
    <text x="105" y="66" fill="#4B5563" font-family="monospace" font-size="10" text-anchor="middle">PERIMETER DRAIN AT RISK</text>
    <text x="105" y="80" fill="#DC2626" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">ABSORBENT BOOM APPLIED</text>
  </g>

  <!-- Watermark -->
  <rect x="15" y="440" width="380" height="45" rx="6" fill="#000000" opacity="0.85"/>
  <text x="25" y="458" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">🧪 STORAGE AREA 01 • LUSAIL LOGISTICS HUB</text>
  <text x="25" y="475" fill="#D1D5DB" font-family="monospace" font-size="10">ENVIRONMENTAL EMERGENCY RESPONSE • HAZ-2026-0045</text>
</svg>
`);

/**
 * 5. SUBMERGED 380V POWER CABLE
 * High-voltage temporary construction cable damaged in standing pool in excavation pit.
 */
export const SVG_ELECTRICAL_CABLE = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="trenchWall" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#57534E"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
    <radialGradient id="waterPool" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="70%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#075985"/>
    </radialGradient>
  </defs>

  <rect width="800" height="500" fill="url(#trenchWall)"/>

  <!-- Excavation Trench Standing Water Pool -->
  <ellipse cx="400" cy="300" rx="350" ry="140" fill="url(#waterPool)" opacity="0.9" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.6))"/>
  <ellipse cx="400" cy="300" rx="330" ry="120" stroke="#BAE6FD" stroke-width="2" fill="none" opacity="0.5"/>

  <!-- Heavy 380V Armored Power Cable (Yellow & Black Striped) -->
  <path d="M50,180 Q250,340 400,320 T750,220" stroke="#FBBF24" stroke-width="24" fill="none" filter="drop-shadow(0px 6px 12px rgba(0,0,0,0.8))"/>
  <path d="M50,180 Q250,340 400,320 T750,220" stroke="#000000" stroke-width="4" stroke-dasharray="14,14" fill="none"/>

  <!-- Damaged Cut Insulation in Water with Electric Arc Glow -->
  <circle cx="360" cy="315" r="28" fill="#FACC15" fill-opacity="0.3"/>
  <polygon points="360,290 370,310 355,315 368,335 348,318 362,312" fill="#FACC15" stroke="#FFFFFF" stroke-width="2"/>

  <!-- Danger Voltage Signboard -->
  <g transform="translate(480, 80)">
    <rect width="250" height="120" rx="10" fill="#FEF2F2" stroke="#DC2626" stroke-width="4" filter="drop-shadow(0px 10px 20px rgba(0,0,0,0.7))"/>
    <rect width="250" height="34" rx="8" fill="#DC2626"/>
    <text x="125" y="24" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="900" text-anchor="middle">DANGER / 380V HIGH VOLTAGE</text>
    <text x="125" y="60" fill="#991B1B" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">SUBMERGED POWER CABLE</text>
    <text x="125" y="80" fill="#4B5563" font-family="sans-serif" font-size="11" text-anchor="middle">FATAL ELECTROCUTION HAZARD</text>
    <rect x="25" y="92" width="200" height="20" rx="4" fill="#991B1B"/>
    <text x="125" y="106" fill="#FEE2E2" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">EMERGENCY BREAKER TRIPPED</text>
  </g>

  <!-- Watermark -->
  <rect x="15" y="440" width="370" height="45" rx="6" fill="#000000" opacity="0.85"/>
  <text x="25" y="458" fill="#FACC15" font-family="monospace" font-size="11" font-weight="bold">⚡ EXCAVATION ZONE 01 • TRENCH 04</text>
  <text x="25" y="475" fill="#D1D5DB" font-family="monospace" font-size="10">KAHRAMAA SAFETY SPECIFICATION • REF: HAZ-2026-0046</text>
</svg>
`);

/**
 * 6. RECTIFIED PHYSICAL PROOF (CAPA-2026-0095)
 * Heavy-duty bolted structural steel safety grating installed over Level 2 void.
 * Features 4 heavy anchor bolts, torque verification certificate tag, and green closure badge.
 */
export const SVG_CAPA_RECTIFIED = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="concreteFloor" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4B5563"/>
      <stop offset="50%" stop-color="#374151"/>
      <stop offset="100%" stop-color="#1F2937"/>
    </linearGradient>
    <linearGradient id="galvanizedSteel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#CBD5E1"/>
      <stop offset="50%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <pattern id="steelMesh" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#475569" stroke="#94A3B8" stroke-width="1.5"/>
    </pattern>
  </defs>

  <!-- Concrete Slab Floor -->
  <rect width="800" height="500" fill="url(#concreteFloor)"/>

  <!-- Bolted Heavy-Duty Grating Frame Over the Void -->
  <rect x="150" y="110" width="500" height="280" rx="8" fill="url(#steelMesh)" stroke="#E2E8F0" stroke-width="8" filter="drop-shadow(0px 10px 25px rgba(0,0,0,0.7))"/>

  <!-- Diagonal Structural Steel Reinforcement Struts -->
  <line x1="150" y1="110" x2="650" y2="390" stroke="#94A3B8" stroke-width="6"/>
  <line x1="150" y1="390" x2="650" y2="110" stroke="#94A3B8" stroke-width="6"/>

  <!-- 4 Heavy-Duty Mechanical Anchor Bolts (M16 Galvanized Bolts) -->
  <g fill="#F1F5F9" stroke="#0F172A" stroke-width="3">
    <!-- Top-Left Anchor -->
    <circle cx="170" cy="130" r="14"/>
    <polygon points="170,122 177,126 177,134 170,138 163,134 163,126" fill="#0F172A"/>

    <!-- Top-Right Anchor -->
    <circle cx="630" cy="130" r="14"/>
    <polygon points="630,122 637,126 637,134 630,138 623,134 623,126" fill="#0F172A"/>

    <!-- Bottom-Left Anchor -->
    <circle cx="170" cy="370" r="14"/>
    <polygon points="170,362 177,366 177,374 170,378 163,374 163,366" fill="#0F172A"/>

    <!-- Bottom-Right Anchor -->
    <circle cx="630" cy="370" r="14"/>
    <polygon points="630,362 637,366 637,374 630,378 623,374 623,366" fill="#0F172A"/>
  </g>

  <!-- Painted Yellow Perimeter Warning Band Around the Grate -->
  <rect x="135" y="95" width="530" height="310" rx="12" fill="none" stroke="#F59E0B" stroke-width="4" stroke-dasharray="16,8"/>

  <!-- Green Verification & Sign-off Certification Card -->
  <g transform="translate(230, 20)">
    <rect width="340" height="65" rx="10" fill="#064E3B" stroke="#34D399" stroke-width="3" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.6))"/>
    <circle cx="35" cy="32" r="18" fill="#10B981"/>
    <text x="35" y="38" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="900" text-anchor="middle">✓</text>
    <text x="65" y="28" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="900">CAPA-2026-0095 RECTIFICATION VERIFIED</text>
    <text x="65" y="48" fill="#A7F3D0" font-family="monospace" font-size="11">ENGINEERED STEEL MESH BOLTED • 5.0kN LOAD TESTED</text>
  </g>

  <!-- Calibration & Inspection Tag attached to bolt -->
  <g transform="translate(480, 280)">
    <rect width="180" height="95" rx="8" fill="#FFFFFF" stroke="#059669" stroke-width="3" filter="drop-shadow(0px 6px 14px rgba(0,0,0,0.5))"/>
    <rect width="180" height="26" rx="6" fill="#059669"/>
    <text x="90" y="18" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="900" text-anchor="middle">INSPECTION TAGGED</text>
    <text x="90" y="44" fill="#065F46" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">TORQUE VERIFIED: 120 Nm</text>
    <text x="90" y="60" fill="#4B5563" font-family="monospace" font-size="10" text-anchor="middle">OWNER: WALEED AL-GHANIM</text>
    <text x="90" y="78" fill="#059669" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">CLOSED BY SENIOR HSE</text>
  </g>

  <!-- Watermark -->
  <rect x="15" y="440" width="380" height="45" rx="6" fill="#000000" opacity="0.85"/>
  <text x="25" y="458" fill="#34D399" font-family="monospace" font-size="11" font-weight="bold">✅ POST-RECTIFICATION PHYSICAL PROOF</text>
  <text x="25" y="475" fill="#D1D5DB" font-family="monospace" font-size="10">LEVEL 2 SLAB • REF: CAPA-2026-0095 / HAZ-2026-0042</text>
</svg>
`);

/**
 * User-Provided Evidence Images (photo_1 (1).png through photo_1 (8).png)
 * Mapped to the core hazard and incident demonstration records.
 */
export const IMAGE_FLOOR_OPENING: string = photo1_1;
export const IMAGE_SCAFFOLD_DEFECT: string = photo1_2;
export const IMAGE_ELECTRICAL_CABLE: string = photo1_3;
export const IMAGE_HEAT_STRESS: string = photo1_4;
export const IMAGE_CHEMICAL_LEAK: string = photo1_5;
export const IMAGE_CAPA_RECTIFIED: string = photo1_6;

/**
 * Fallback resolver that maps any image URL or category to guaranteed offline asset
 */
export const getSafeImageUrl = (url?: string | null, categoryOrTitle?: string): string => {
  if (!url) {
    return getFallbackHazardImage(categoryOrTitle);
  }

  // If it's already an SVG data URI or base64 data URI, use it directly!
  if (url.startsWith('data:image')) {
    return url;
  }

  // If it's an external Unsplash URL, replace with matching ultra-high-res offline vector
  if (url.includes('unsplash.com')) {
    const lower = (url + ' ' + (categoryOrTitle || '')).toLowerCase();
    if (lower.includes('heat') || lower.includes('1508873696983')) {
      return IMAGE_HEAT_STRESS;
    }
    if (lower.includes('scaffold') || lower.includes('1504307651254')) {
      return IMAGE_SCAFFOLD_DEFECT;
    }
    if (lower.includes('chemical') || lower.includes('solvent') || lower.includes('1581094794329')) {
      return IMAGE_CHEMICAL_LEAK;
    }
    if (lower.includes('electric') || lower.includes('cable') || lower.includes('1621905251189')) {
      return IMAGE_ELECTRICAL_CABLE;
    }
    if (lower.includes('capa') || lower.includes('rectif') || lower.includes('closed') || lower.includes('grate')) {
      return IMAGE_CAPA_RECTIFIED;
    }
    return IMAGE_FLOOR_OPENING;
  }

  return url;
};

/**
 * Category-based fallback
 */
export const getFallbackHazardImage = (categoryOrTitle?: string): string => {
  const t = (categoryOrTitle || '').toLowerCase();
  if (t.includes('heat') || t.includes('weather') || t.includes('17/2021')) {
    return IMAGE_HEAT_STRESS;
  }
  if (t.includes('scaffold') || t.includes('height') || t.includes('guardrail')) {
    return IMAGE_SCAFFOLD_DEFECT;
  }
  if (t.includes('chemical') || t.includes('spill') || t.includes('leak') || t.includes('drum')) {
    return IMAGE_CHEMICAL_LEAK;
  }
  if (t.includes('electric') || t.includes('cable') || t.includes('submerged') || t.includes('power')) {
    return IMAGE_ELECTRICAL_CABLE;
  }
  if (t.includes('capa') || t.includes('rectif') || t.includes('proof') || t.includes('grate')) {
    return IMAGE_CAPA_RECTIFIED;
  }
  return IMAGE_FLOOR_OPENING;
};
