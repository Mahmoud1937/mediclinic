import assert from 'node:assert/strict';
import fs from 'node:fs';
import D from '../src/data.js';

let checks=0;
function ok(condition,message){assert.ok(condition,message);checks++;}
const get=(type,id)=>D[type].find(r=>r.id===id);
const fk=(rows,key,target,nullable=false)=>rows.forEach(r=>ok(nullable&&!r[key]||get(target,r[key]),`${key} ${r[key]} must reference ${target}`));
for(const [type,rows] of Object.entries(D)){if(!Array.isArray(rows)||!rows[0]?.id)continue;ok(new Set(rows.map(r=>r.id)).size===rows.length,`${type} IDs must be unique`);}
fk(D.clinics,'tenantId','tenants');fk(D.branches,'clinicId','clinics');
fk(D.tenantUsers,'tenantId','tenants');fk(D.tenantUsers,'userId','users');
fk(D.userRoleAssignments,'tenantUserId','tenantUsers');fk(D.userRoleAssignments,'roleId','roles');fk(D.userRoleAssignments,'clinicId','clinics',true);fk(D.userRoleAssignments,'branchId','branches',true);
fk(D.rolePermissions,'roleId','roles');fk(D.rolePermissions,'permissionId','permissions');
fk(D.doctors,'tenantId','tenants');fk(D.doctors,'userId','users',true);
fk(D.doctorSpecialties,'doctorId','doctors');fk(D.doctorSpecialties,'specialtyId','specialties');
fk(D.doctorBranches,'doctorId','doctors');fk(D.doctorBranches,'branchId','branches');
for(const rows of [D.schedules,D.scheduleExceptions]){fk(rows,'doctorId','doctors');fk(rows,'branchId','branches',rows===D.scheduleExceptions);}
for(const type of ['patients','services'])fk(D[type],'tenantId','tenants');
for(const type of ['patientContacts','patientGuardians','patientIdentifiers'])fk(D[type],'patientId','patients');
fk(D.patientGuardians,'guardianPatientId','patients',true);
fk(D.servicePrices,'serviceId','services');fk(D.servicePrices,'branchId','branches',true);fk(D.servicePrices,'doctorId','doctors',true);
for(const type of ['appointments','visits']){fk(D[type],'patientId','patients');fk(D[type],'doctorId','doctors');fk(D[type],'branchId','branches');}
fk(D.appointments,'serviceId','services');fk(D.appointmentStatusHistory,'appointmentId','appointments');fk(D.visits,'appointmentId','appointments',true);
fk(D.invoices,'patientId','patients');fk(D.invoices,'branchId','branches');fk(D.invoices,'visitId','visits',true);
fk(D.invoiceItems,'invoiceId','invoices');fk(D.invoiceItems,'serviceId','services',true);fk(D.invoiceItems,'doctorId','doctors',true);
fk(D.payments,'invoiceId','invoices');fk(D.paymentRefunds,'paymentId','payments');fk(D.auditLogs,'userId','users',true);
for(const type of ['branches','patients','doctors','services','tenantUsers','appointments','visits','invoices','invoiceItems','payments','paymentRefunds','auditLogs','schedules','scheduleExceptions','servicePrices']){
  for(const r of D[type]){
    ok(get('tenants',r.tenantId),`${type} must have a valid tenant`);
    for(const [key,target] of [['clinicId','clinics'],['branchId','branches'],['patientId','patients'],['doctorId','doctors'],['serviceId','services'],['invoiceId','invoices'],['visitId','visits'],['paymentId','payments'],['appointmentId','appointments']]){
      if(r[key])ok(get(target,r[key])?.tenantId===r.tenantId,`${type} ${r.id}: ${key} crosses tenants`);
    }
  }
}
for(const r of D.userRoleAssignments){const m=get('tenantUsers',r.tenantUserId);if(r.clinicId)ok(get('clinics',r.clinicId).tenantId===m.tenantId,'Role clinic stays in membership tenant');if(r.branchId){const b=get('branches',r.branchId);ok(b.tenantId===m.tenantId,'Role branch stays in membership tenant');ok(!r.clinicId||b.clinicId===r.clinicId,'Role branch stays in clinic scope');}}
for(const r of [...D.appointments,...D.visits,...D.schedules])ok(D.doctorBranches.some(b=>b.doctorId===r.doctorId&&b.branchId===r.branchId),'Operational doctor belongs to branch');
const visitAppointments=D.visits.map(v=>v.appointmentId).filter(Boolean);ok(new Set(visitAppointments).size===visitAppointments.length,'A booked appointment has at most one visit');ok(D.visits.some(v=>!v.appointmentId),'Walk-in visit exists');
for(const v of D.visits){if(v.appointmentId){const a=get('appointments',v.appointmentId);ok(a.patientId===v.patientId&&a.doctorId===v.doctorId&&a.branchId===v.branchId,'Visit agrees with appointment');}}
for(const i of D.invoices){const total=D.invoiceItems.filter(r=>r.invoiceId===i.id).reduce((n,r)=>n+r.qty*r.unitPrice,0);ok(total===i.total,`Stored invoice lines match ${i.id}`);if(i.visitId)ok(get('visits',i.visitId).patientId===i.patientId,'Invoice patient matches visit');}
for(const r of D.paymentRefunds)ok(r.amount<=get('payments',r.paymentId).amount,'Refund example fits original payment');
for(const type of ['patientContacts','patientGuardians','patientIdentifiers','doctorBranches','doctorSpecialties','rolePermissions','tenantUsers','userRoleAssignments'])ok(D[type].length>0,`${type} is represented independently`);
const sourceFiles=fs.readdirSync('src').filter(n=>/\.(jsx|js)$/.test(n)).map(n=>fs.readFileSync(`src/${n}`,'utf8')).join('\n');
ok(!/dangerouslySetInnerHTML|innerHTML\s*=/.test(sourceFiles),'React renders actual components, without HTML injection');
ok(!/\bfetch\(|XMLHttpRequest|axios|https?:\/\//.test(sourceFiles),'Application is offline and has no backend/network requests');
ok(!/DentalChart|MedicalRecords|Consultations|Prescriptions|GrowthChart|Pregnancies|VitalSigns/.test(sourceFiles),'Medical phase 2 and specialty entities are excluded');
ok(fs.readFileSync('index.html','utf8').includes('dir="rtl"'),'RTL entry point');
console.log(`PASS: ${checks} structural, relationship, isolation and frontend-only checks.`);
