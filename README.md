# QHSE Management Platform
### Integrated Health, Safety and Environment Management (Qatar Enterprise Edition)

A mature, enterprise-grade, frontend-only Health, Safety and Environment (HSE) Management Platform designed for large organisations operating in the State of Qatar. Built using React, TypeScript, Tailwind CSS, Recharts, and Lucide Icons with zero backend dependencies and full browser-side data persistence.

---

## 🌟 Key Product Features

### 1. Dual Synchronised Workspaces (Side by Side)
- **Workspace A — Desktop HSE Control Centre:** Full-featured enterprise HSE management dashboard, sidebar navigation across 20 modules, interactive charts, data tables, risk matrices, detailed case dossiers, and reporting tools.
- **Workspace B — Mobile HSE Application:** Rendered inside a realistic titanium smartphone frame simulating a frontline worker experience with voice-assisted reporting, quick incident/hazard submissions, assigned CAPA tasks, and digital safety passports.
- **Independent Workspace Controls:**
  - `Desktop Full`: Expands desktop workspace to 100% width.
  - `Side by Side`: Displays Desktop Control Centre and Mobile smartphone app side-by-side.
  - `Mobile Only`: Centers the smartphone frame in the viewport for mobile testing.
  - Preserves navigation state, active filters, form values, and selected records when toggling views.

### 2. Comprehensive Qatar Legal & Regulatory Compliance Centre
A major dedicated application module mapping statutory workplace obligations to operational evidence based on authoritative sources (Qatar Al Meezan, Official Gazette, Ministry of Labour, Ministry of Public Health, Civil Defence, MECC, and ILO):
- **Law No. 14 of 2004 (Qatar Labour Law):** Articles 100–102 occupational safety, medical facilities, and worker safety education.
- **Ministerial Decision No. 17 of 2021 (Heat Stress):** Enforces mandatory outdoor summer work restrictions between 10:00 and 15:30 from 1 June to 15 September; Wet Bulb Globe Temperature (WBGT) work stoppage threshold (>32.1°C); cool drinking water (15–20°C); shaded air-conditioned rest cabins.
- **Law No. 30 of 2002 (Environmental Protection Law):** MECC environmental permits, secondary chemical containment (110%), and hazardous waste manifests.
- **Law No. 25 of 2015 (Civil Defence Law):** Fire safety licenses, emergency exits, and evacuation drills.
- **Qatar Construction Specifications (QCS 2014) Section 1 Part 10:** Work at height (100% tie-off >1.8m), excavation shoring (>1.2m), certified lifting tackle.
- **Distinguishes Legal Classifications:** `VERIFIED LEGAL REQUIREMENT`, `OFFICIAL GUIDANCE`, `INDUSTRY STANDARD`, `ORGANISATIONAL CONTROL`, and `REQUIRES LEGAL REVIEW`.
- **Legal Applicability Matrix:** Direct operational linkage between laws, modules, controls, and evidence documents.

### 3. Role-Based Access Control (RBAC) Simulation
- **40 Seeded Demonstration Users** across 6 enterprise tiers:
  - *Workforce:* Worker, Contractor Worker, Subcontractor Worker, Equipment Operator, Technician, Maintenance Personnel, Visitor.
  - *Supervision:* Team Leader, Site Supervisor, Contractor Supervisor, Area Supervisor, Construction Manager, Site Manager.
  - *HSE Department:* HSE Officer, Senior HSE Officer, HSE Supervisor, HSE Inspector, HSE Investigator, HSE Coordinator, Environmental Officer, Occupational Health & Safety Officer, Emergency Response Coordinator, HSE Manager, Senior HSE Manager.
  - *Leadership:* Project Manager, Project Director, Operations Manager, Client Representative.
  - *Specialist Roles:* Corrective Action Owner, CAPA Verifier, Permit Applicant, Permit Issuer, Permit Approver, Training Coordinator, Document Controller, ERT Member, Internal Auditor.
  - *Administration:* System Administrator, User Administrator, Project Administrator, Read-only Auditor.
- Instant user-switching dropdown in the topbar to test realistic role behaviours.

### 4. All 20 Functional Operational Modules
1. **Executive Dashboard:** Live metrics calculated from shared dataset, incident trends, severity breakdown, WBGT heat stress analysis, recent incidents and active permits.
2. **Incident Management:** Injury logging, first-aid, medical treatment, lost-time incidents (LTI), Qatar MD 19/2005 24-hour statutory notification tracking, closure & reopen workflow.
3. **Near Miss Management:** Leading indicators (dropped objects, vehicle near-misses, electrical flashes) to prevent recordable incidents.
4. **Hazard Reporting:** Unsafe conditions, Stop Work Authority logging, severity classification, supervisor assignments.
5. **Investigation Management:** Formal root cause analysis featuring 5-Whys diagnostic chain, 6M Ishikawa Fishbone diagrams, witness statements, and formal PDF investigation dossiers.
6. **Corrective & Preventive Actions (CAPA):** Kanban board & table views, status progression (Open → Assigned → In Progress → Submitted for Verification → Verified → Closed), evidence uploads, and verifier approval/rejection workflows.
7. **Risk Register:** Interactive 5×5 Risk Matrix with clickable heat-map cells, initial inherent score vs residual controlled score, hierarchy of controls.
8. **Inspections & Audits:** Configurable checklists (Pass/Fail/NA), scoring percentages, and Qatar MD 17/2021 heat stress inspection protocol.
9. **Permit to Work (PTW):** Hot work, confined space entry with 4-gas testing (O2, LEL, H2S, CO), work at height, electrical isolation (LOTO), and excavation.
10. **Training & Competency:** Qatar Labour Law Art. 102 compliance, 10 standard courses, 40 workforce records, expiring certification alerts, and Excel matrix export.
11. **Emergency Preparedness:** Civil Defence fire evacuation plans, emergency drill evaluation scores, assembly points, and muster times.
12. **Environmental Management:** Hazardous waste manifest logs, GHS chemical inventory, secondary containment pallets, and diesel/water consumption metrics.
13. **Qatar Legal Compliance:** Full legislative register, authority directory, article detail views, official source links, and compliance audit workflows.
14. **Document Control:** Version-controlled policies, procedures, risk assessments, permits, and PDF preview cards.
15. **Analytics & Reports:** Browser-side Excel spreadsheet, CSV, and printable PDF dossier generation.
16. **AI-Assisted HSE Search:** Natural language search prototype querying historical records, repeated observations, and overdue CAPAs.
17. **Notifications & Alerts:** Live notifications for hazard submissions, CAPA assignments, and heat stress threshold alerts.
18. **Users and Roles:** 40-user directory with RBAC permission simulation.
19. **Audit Trail:** Chronological compliance ledger tracking all CREATE, REVIEW, VERIFY, CLOSE, and REOPEN actions.
20. **Settings & Technical Architecture:** Fictional client profile, risk scoring thresholds, and enterprise Qatar sovereign cloud hosting advisory.

### 5. Connected End-to-End Demonstration Scenario
- **Worker Ahmed Hassan (EMP-1045)** identifies an uncovered floor opening in **Work Area A, Qatar Project — Demo Site 01** (Potential consequence: Fall from height; Immediate action: Temporary barricading; Ref: **HAZ-2026-0042**).
- Walk through the interactive 6-step lifecycle using the **"Scenario Walkthrough"** button in the topbar:
  1. Worker submits hazard from mobile phone.
  2. Site Supervisor Tariq Al-Mansoor reviews in Desktop Control Centre.
  3. HSE Officer Fatima Al-Kuwari classifies severity as High and assigns Investigator.
  4. Investigator Omar Al-Sulaiti completes 5-Whys and Fishbone root causes (INV-2026-0042).
  5. Action Owner Waleed Al-Ghanim bolts heavy-duty steel safety grates and submits test evidence (CAPA-2026-0095).
  6. CAPA Verifier Khalid Al-Nuaimi inspects and approves; HSE Manager closes case.
  7. Audit ledger logs all events; dashboard metrics and AI search reflect real-time closure.

---

## 🛠️ Technology Stack & Architecture

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS with enterprise palette (`#073B2F` Dark Green, `#087F5B` Emerald, `#20A887` Teal, `#DDF5EA` Mint, `#F4F7F5` Neutral Background)
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (Line charts, Bar charts, Pie charts)
- **Client-Side Document & Spreadsheet Generation:** jsPDF, SheetJS (`xlsx`)
- **Persistence:** Local browser storage (`localStorage`) with event-driven cross-workspace reactivity and initial seed reset capability.
- **Strict Architecture Boundary:** No backend servers, databases, ORMs, cloud infrastructure, or external APIs.

---

## 🚀 Installation & Running Instructions

### Prerequisites
- Node.js v18 or higher (v20+ recommended)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will start at `http://localhost:3000/`.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📋 Demonstration Disclaimers
1. **Fictional Environment:** Client Organisation name (*"Client Organisation — Qatar Demonstration Environment"*), projects, locations, and personnel are completely fictional.
2. **Statutory Legal Notice:** Legal information is provided for demonstration and compliance-management purposes. Applicability and interpretation must be confirmed against current official Arabic legislation, applicable amendments, regulator requirements, and qualified Qatar legal advice. This platform does not replace legal advice or regulator approval.
3. **Frontend Access Control:** Role-based access control (RBAC) demonstrates simulated frontend behavior because there is no backend enforcement.
