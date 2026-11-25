# mediClinic clinic workspace

A bilingual Arabic/English React and Vite clinic management frontend for Egyptian multi-branch clinics. The interface was redesigned against `Clinic_Core_ERD_Final_Reviewed.pdf` (five pages, reviewed 25 November 2026).

## Entry and setup

- `/` displays Login. Any valid email format and nonempty sample password demonstrate the transition to the dashboard. No identity is verified.
- `/register-clinic` is a two-step clinic/owner wizard with slug validation and password confirmation. Only clinic display details and the owner's name pass to the next screen in React state. Passwords are discarded.
- `/onboarding` offers five setup tasks: branch, services, prices, doctors, staff. Start Setup opens the existing preview forms; Go to Dashboard opens the demo workspace.
- The public routes have static directory entry files in the production output. Operational pages retain the existing hash routing, for example `/#/patients`.
- No authentication flag, session, credentials, token, or registration record is stored. Operational demo routes remain directly accessible. Reloading clears registration display data. Local storage holds only language and clinic display preferences.

## Run

```powershell
npm.cmd install
npm.cmd run dev
```

```powershell
npm.cmd run lint
npm.cmd run check
npm.cmd run build
npm.cmd run test:browser
```

`test:browser` uses locally installed Chrome or Edge and writes screenshots and a report to `.preview/`. The browser test may need permission to connect to Chrome's local DevTools port in a restricted environment.

## Product structure

- **Workspace:** daily operations, patients, appointments, visits.
- **Care:** doctors, services and price history.
- **Billing:** invoices and payments, with refunds inside invoice history.
- **Staff & Access:** users and role permissions.
- **Clinic:** branches and clinic settings.
- Patient details hold visits, medical history, prescriptions, diagnostics, treatment plans, medical files and billing.
- Doctor profiles hold professional information, education, experience, branch assignments, weekly hours and temporary exceptions.
- The visit page is the clinical workspace. Invoice details keep original line prices, payments and refunds visible.
- Clinic Settings includes general details, branches, lifecycle status (Active / Suspended / Closed), and a Danger Zone. The Close Clinic dialog requires the clinic name and previews confirmation without changing the clinic or deleting data.
- Document requests collect type, instructions and expiry, then display a mock link. Opening the link in the same tab carries those values to the patient upload preview. It is not a secure or shareable production upload link.
- Arabic uses RTL; English uses LTR. The language and clinic choice persist locally. Desktop tables become readable record cards on mobile.

## Data and backend gaps

This repository has **no backend or API integration**. `src/data.js` is the earlier fictional dataset. `src/core/model.js` adapts it to the reviewed clinic model and adds a few explicitly fictional clinical records to demonstrate the redesigned screens. Data entry drawers review values only; they do not save records, take payments, send upload links, accept files or enforce permissions. The patient upload route is a mobile-friendly preview of the requested document flow, and it clearly states that files are not submitted. Clinic Owner and Branch Manager are included as mock roles, alongside Admin, Receptionist, Doctor and Accountant.

The fixture cannot supply every field in the reviewed ERD. For example, its patients lack national ID and passport values; most doctors lack education and experience records; appointment status history lacks actor and reason; service names in English are represented by service codes; and clinical records exist only for selected demo patients and visits. The new UI displays empty or unavailable values rather than implying that the missing data is stored.

The old HTML entry files still redirect legacy bookmarks into the React app. They no longer expose separate tenant, refund, schedule, or raw relationship modules in navigation.

## Source layout

```text
src/core/App.jsx       Clinic shell, navigation, localization and routing
src/core/Entry.jsx     Login, clinic registration and onboarding
src/core/ClinicSettings.jsx  Clinic details, lifecycle review and closure confirmation
src/core/DocumentRequest.jsx  Mock request and upload-link flow
src/core/pages.jsx     Operational lists, patient and doctor profiles, clinical workspace, billing
src/core/ui.jsx        Shared tables, status badges, tabs, empty states and preview drawers
src/core/icons.jsx     Shared icon paths
src/core/model.js      Adapter from existing fictional records to the reviewed model
src/core/style.css     Responsive RTL/LTR design system
src/core/entry.css     Public entry, setup, settings and typography refinements
tools/lint.mjs         Syntax and interface model checks
tools/check.mjs        Existing fixture integrity checks
tools/browser-check.mjs  Browser routes, language, viewport and interaction smoke tests
```
