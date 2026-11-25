import fs from 'node:fs';
import {model as m,record} from '../src/core/model.js';
const pick=(r,keys)=>Object.fromEntries(keys.split(' ').filter(k=>r[k]!==undefined).map(k=>[k,r[k]]));
const common=r=>pick(r,'id clinicId createdAt');
const parentClinic=(type,id)=>record(type,id)?.clinicId;
const seed={
 clinics:m.clinics.map(r=>pick(r,'id name slug phone status createdAt')),
 branches:m.branches.map(r=>({...pick(r,'id clinicId name address phone createdAt'),branchManagerUserId:r.managerUserId,isActive:r.status==='active'})),
 users:m.users.map(r=>({...pick(r,'id clinicId email roleId isActive createdAt'),fullName:r.name})),
 branchUsers:m.users.flatMap(u=>u.branchIds.map(branchId=>({id:`BU-${u.id}-${branchId}`,clinicId:u.clinicId,userId:u.id,branchId,isActive:true,assignedAt:'2026-03-15'}))),
 roles:m.roles.map(r=>({id:r.id,name:r.name,code:{'R-001':'ADMIN','R-002':'RECEPTIONIST','R-003':'DOCTOR','R-004':'ACCOUNTANT','R-005':'CLINIC_OWNER','R-006':'BRANCH_MANAGER'}[r.id]})),
 permissions:m.permissions.map(r=>({id:r.id.replace('.view','.read'),code:r.id.replace('.view','.read'),description:r.id.replace('.view','.read')})),
 rolePermissions:m.rolePermissions.map(r=>({id:`${r.roleId}-${r.permissionId.replace('.view','.read')}`,roleId:r.roleId,permissionId:r.permissionId.replace('.view','.read')})),
 specialties:m.specialties.map(r=>({id:r.id,code:'GENERAL',nameAr:r.name,nameEn:'General medicine'})),
 patients:m.patients.map(r=>({...pick(r,'id clinicId mrn phone nationalId passportNumber birthDate gender createdAt'),fullName:r.name})),
 patientContacts:m.contacts.map(r=>({...pick(r,'id clinicId patientId name phone relationship isGuardian isEmergencyContact')})),
 doctorProfiles:m.doctors.map(r=>pick(r,'id clinicId userId specialtyId licenseNumber clinicalRank academicTitle bio isActive')),
 services:m.services.map(r=>({...pick(r,'id clinicId code nameAr nameEn durationMinutes isActive')})),
 servicePrices:m.prices.map(r=>({...pick(r,'id clinicId serviceId branchId price validFrom validTo'),doctorProfileId:r.doctorId})),
 doctorSchedules:m.schedules.map(r=>({...pick(r,'id clinicId branchId weekday isActive'),doctorProfileId:r.doctorId,startTime:r.start,endTime:r.end})),
 doctorScheduleExceptions:m.exceptions.map(r=>({...pick(r,'id clinicId type startAt endAt reason'),doctorProfileId:r.doctorId,branchId:r.branchId||record('doctors',r.doctorId)?.branchIds[0]})),
 appointments:m.appointments.map(r=>({...pick(r,'id clinicId patientId branchId serviceId status scheduledStartAt scheduledEndAt notes'),doctorProfileId:r.doctorId,createdAt:r.date})),
 appointmentStatusHistory:m.appointmentHistory.map(r=>({...pick(r,'id appointmentId fromStatus toStatus reason'),clinicId:parentClinic('appointments',r.appointmentId),changedAt:`${r.date}T${r.time}`,changedByUserId:'U-002'})),
 visits:m.visits.map(r=>({...pick(r,'id clinicId patientId branchId appointmentId status followUpDate'),doctorProfileId:r.doctorId,checkedInAt:r.checkin?`${r.date}T${r.checkin}`:null,startedAt:r.start?`${r.date}T${r.start}`:null,endedAt:r.end?`${r.date}T${r.end}`:null,createdAt:r.date})),
 invoices:m.invoices.map(r=>({...pick(r,'id clinicId patientId branchId visitId invoiceNumber status subtotal discount total'),createdAt:r.date})),
 invoiceItems:m.invoiceItems.map(r=>({...pick(r,'id invoiceId serviceId description qty unitPrice'),clinicId:parentClinic('invoices',r.invoiceId),doctorProfileId:r.doctorId})),
 payments:m.payments.map(r=>({...pick(r,'id clinicId invoiceId amount method paidAt referenceNumber'),status:r.status==='paid'?'completed':r.status,createdByUserId:'U-002'})),
 paymentRefunds:m.refunds.map(r=>({...pick(r,'id clinicId paymentId amount status reason refundedAt'),createdByUserId:'U-002'})),
 medications:[{id:'MED-01',genericName:'Amlodipine',brandName:'',strength:'5 mg',form:'tablet',isActive:true}],
 auditLogs:[],
};
for(const [key,target,parent,fields] of [
 ['allergies','patientAllergies','patients','patientId substance reaction severity notes isActive'],['conditions','patientConditions','patients','patientId onsetDate status notes'],
 ['education','doctorEducation','doctors','university faculty degree graduationYear country'],['experience','doctorExperiences','doctors','organization position fromYear toYear isCurrent description'],
 ['vitals','vitalSigns','visits','visitId systolic diastolic heartRate respiratoryRate temperature oxygenSaturation weight height recordedAt recordedBy'],
 ['consultations','consultations','visits','visitId chiefComplaint history examination plan followUpInstructions'],['diagnoses','diagnoses','visits','visitId code description type isPrimary notes'],
 ['prescriptions','prescriptions','visits','visitId status issuedAt notes'],['diagnosticOrders','diagnosticOrders','visits','visitId type name instructions status orderedAt'],
 ['attachments','medicalAttachments','patients','patientId visitId diagnosticOrderId fileName description source createdAt'],['uploadRequests','medicalUploadRequests','patients','patientId visitId diagnosticOrderId instructions expiresAt status'],
 ['treatmentPlans','treatmentPlans','patients','patientId status createdAt'],
 ])seed[target]=m[key].map(r=>{const pid=parent==='doctors'?r.doctorId:parent==='visits'?r.visitId:r.patientId;const n={id:r.id,clinicId:parentClinic(parent,pid),...pick(r,fields)};if(parent==='doctors')n.doctorProfileId=r.doctorId;if(r.doctorId)n.doctorProfileId=r.doctorId;if(target==='patientConditions')n.conditionName=r.name;if(target==='medicalAttachments')Object.assign(n,{mimeType:'application/pdf',fileSize:24576,attachmentType:'result',uploadedByUserId:'U-002'});if(target==='medicalUploadRequests')Object.assign(n,{attachmentType:r.type,requestedByUserId:'U-002'});if(!n.createdAt)n.createdAt='2026-11-19';return n;});
seed.prescriptionItems=m.prescriptionItems.map(r=>({...pick(r,'id prescriptionId medicationName dose frequency route duration instructions'),clinicId:seed.prescriptions.find(p=>p.id===r.prescriptionId).clinicId,medicationId:'MED-01'}));
seed.treatmentPlanItems=m.treatmentItems.map(r=>({...pick(r,'id description status dueDate completedAt'),treatmentPlanId:r.planId,clinicId:seed.treatmentPlans.find(p=>p.id===r.planId).clinicId}));
for(const i of seed.invoiceItems)i.lineTotal=i.qty*i.unitPrice;
fs.mkdirSync('src/mock',{recursive:true});fs.writeFileSync('src/mock/seed.json',JSON.stringify(seed,null,2));
