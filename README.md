# mediClinic — React Core Clinic Management Prototype

واجهة SaaS عربية باتجاه RTL لإدارة العيادات، مبنية بمكونات **React** وCSS مخصص، مع بيانات تجريبية مترابطة وبدون Backend أو APIs.

## التشغيل

```powershell
npm.cmd install
npm.cmd run dev
```

افتح العنوان الذي يعرضه Vite، عادةً `http://127.0.0.1:5173`.

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview
npm.cmd run test:browser
```

The application uses React, React DOM, and Vite. No UI framework, Tailwind, Bootstrap, backend, or external assets are used. Node is required for development/build; the built `dist/` is a static site. Serve it over HTTP. The React version replaces the earlier direct-file vanilla prototype.

## Sources reviewed

1. **Clinic_Professional_ERD_Diagrams.pdf** — authoritative revised model, supplied subsequently. Its SaaS & Access, Doctors & Patients, and Appointments & Billing diagrams define the current UI relationships. Its Medical Core — Phase 2 diagram is excluded.
2. **Clinic_Core_ERD.pdf** — the earlier core model, inspected before implementation and superseded by the professional diagrams.
3. **Clinic_Management_System_Guide_AR.docx** — read for the broader architecture and operational requirements; the user's restricted core phase takes precedence over its broader medical scope and technology suggestions.
4. **Clinic Core ERD.md / .html** — inspected as companions to the earlier PDF.

These documents were read from their original locations in the parent Downloads folder and were not changed.

## Architecture represented

| Revised ERD entities | UI |
| --- | --- |
| Tenants → Clinics → Branches | Separate platform dashboard, tenant lists/details, organizational lists and details |
| Users → TenantUsers → UserRoleAssignments | Global accounts, tenant membership IDs, multiple roles, optional clinic and branch scope |
| Roles → RolePermissions → Permissions | Role lists/details, eight permission groups, checkbox previews |
| Doctors → DoctorSpecialties / DoctorBranches | Basic classification, multiple assigned branches, schedules, appointments, visits |
| DoctorSchedules / DoctorScheduleExceptions | Weekly overview, searchable tables, editing, leave/holiday/exception forms |
| Patients / PatientContacts / PatientGuardians / PatientIdentifiers | Tenant-owned basic files, contact/guardian/identifier summaries, operational tabs |
| Services / ServicePrices | Tenant catalogue, default/branch/doctor pricing, validity dates |
| Appointments / AppointmentStatusHistory | Day/week/month calendars, list, details and status history |
| Visits | Appointment-linked visits and walk-in visits with independent patient/doctor/branch links |
| Invoices / InvoiceItems | Patient, branch, optional visit, service lines, stored unit prices |
| Payments / PaymentRefunds | Invoice payments and refunds linked to original payments |
| AuditLogs | User/tenant/resource/action/time, searchable with filters |

Patients and services remain **tenant-owned**, regardless of selected clinic. Branch-scoped operational screens filter appointments, doctors, schedules, visits, and finance. Selected tenant is always visible in the tenant workspace. This is visual isolation of demo datasets, not an authorization system.

The brief asks for additional presentation information such as branch address/phone, list status badges, appointment source, visit arrival/end times, invoice date, and refund reason. Where absent from the abbreviated revised ERD, these are **demo display metadata**, not claims about database columns. Financial totals and report percentages only summarize the static records; no pricing, billing, or conflict engine is implemented. Invoice remaining balances exclude refunds, which are shown separately. Net collection subtracts refunds.

## Screens and interactions

30 React screens cover platform/tenant dashboards, tenants, clinics, branches, patients, doctors, users, roles, schedules, services/prices, appointments, visits, invoices, payments, refunds, audit logs, reports, settings, and their detail views.

- Hash routes work on static hosts without rewrite rules, for example `#/patients` and `#/patient-details?id=P-001248&tenant=TN-001`.
- Existing `.html` bookmarks redirect to the corresponding React screen. The legacy `billing.html` opens invoices.
- Tenant/clinic/branch selectors, desktop sidebar collapse, usable mobile drawer, shared search, filters, pagination, and useful empty states.
- Global search (`Ctrl/Cmd K`) by patient name, phone, MRN, doctor, appointment or invoice; the platform context searches tenants.
- Working day/week/month calendar, date navigation, day drill-down, appointment details, visit states and walk-ins.
- Add/edit/invite forms validate native fields and produce a review card; returning to edit preserves entered values.
- Forms **do not create records, send invitations, take payments, or save organizational settings**. They explicitly describe this behavior.
- Permission checkboxes preview selection without enforcing authorization.
- Filtered CSV exports, invoice/report printing, recent activity dropdown, report period selection.
- Sidebar/table-density preferences and selected context persist locally in the browser. Mock records remain static.
- The demo day is **19 November 2026**, timezone `Africa/Cairo`. All people and transactions are fictional.

No specialty modules, medical records, consultation forms, clinical observations, prescriptions, authentication, backend calls, or database access are included.

## Source layout

```text
src/
  main.jsx               React entry
  App.jsx                Shared sidebar/topbar/context and screen routing
  store.jsx              React context, selected scope, preferences and navigation
  data.js                One normalized, linked mock dataset
  ui.jsx                 Shared accessible UI, tables, tabs, cards, CSV export
  tables.jsx             Shared entity columns and operational tables
  Dashboard.jsx          Platform and tenant dashboards
  Lists.jsx              Entity lists
  Details.jsx            Entity details and relationship tabs
  Operations.jsx         Appointment calendars, visits and doctor schedules
  ReportsSettings.jsx    Reports, settings and preferences
  Modal.jsx              React-controlled forms, review cards and global search
css/styles.css           Shared responsive RTL styles, printing, reduced motion
tools/check.mjs          Structural and cross-tenant data-integrity checks
tools/browser-check.mjs  Dependency-free Chrome/Edge smoke checks
tools/generate-aliases.mjs  Rebuild compatibility HTML redirects
vite.config.js           Static production build including old entry filenames
```

`npm run test:browser` requires locally installed Chrome or Edge, runs a headless browser and temporary local HTTP server, and writes screenshots/report under `.preview/`. It stops the browser and server when finished. Set `CHROME_PATH` to override the browser executable. The test has no npm browser dependencies. On Windows, `npm.cmd` avoids PowerShell execution-policy restrictions on `npm.ps1`.
