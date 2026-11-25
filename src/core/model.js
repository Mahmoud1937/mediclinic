import {repository} from '../mock/index.js';
import {today,financials,resolvePrice} from '../mock/repository.js';
export const demoDate=today();
const aliases={doctors:'doctorProfiles',contacts:'patientContacts',allergies:'patientAllergies',conditions:'patientConditions',education:'doctorEducation',experience:'doctorExperiences',schedules:'doctorSchedules',exceptions:'doctorScheduleExceptions',prices:'servicePrices',appointmentHistory:'appointmentStatusHistory',vitals:'vitalSigns',attachments:'medicalAttachments',uploadRequests:'medicalUploadRequests',treatmentItems:'treatmentPlanItems',refunds:'paymentRefunds'};
export const collectionFor=type=>aliases[type]||type;
export function branchIds(userId){return repository.getAll('branchUsers').filter(r=>r.userId===userId&&r.isActive).map(r=>r.branchId);}
function present(type,row){
 const r={...row};if(r.doctorProfileId)r.doctorId=r.doctorProfileId;
 if(type==='users')Object.assign(r,{name:r.fullName,branchIds:branchIds(r.id),status:r.isActive?'active':'inactive'});
 if(type==='doctorProfiles')Object.assign(r,{name:repository.getById('users',r.userId)?.fullName||'—',branchIds:branchIds(r.userId),status:r.isActive?'active':'inactive'});
 if(type==='patients')r.name=r.fullName;
 if(type==='branches')Object.assign(r,{managerUserId:r.branchManagerUserId,status:r.isActive?'active':'inactive'});
 if(type==='services')r.name=r.nameAr;
 if(type==='patientConditions')r.name=r.conditionName;
 if(type==='doctorSchedules')Object.assign(r,{start:r.startTime,end:r.endTime});
 if(type==='appointments')Object.assign(r,{date:r.scheduledStartAt?.slice(0,10),time:r.scheduledStartAt?.slice(11,16)});
 if(type==='visits')Object.assign(r,{date:r.checkedInAt?.slice(0,10),checkin:r.checkedInAt?.slice(11,16),start:r.startedAt?.slice(11,16),end:r.endedAt?.slice(11,16)});
 if(type==='invoices')r.date=r.createdAt?.slice(0,10);
 if(type==='payments')Object.assign(r,{status:r.status==='completed'?'paid':r.status,date:r.paidAt?.slice(0,10)});
 if(type==='appointmentStatusHistory')Object.assign(r,{date:r.changedAt?.slice(0,10),time:r.changedAt?.slice(11,16)});
 if(type==='treatmentPlanItems')r.planId=r.treatmentPlanId;
 if(type==='medicalAttachments')r.type=r.attachmentType;
 if(type==='medicalUploadRequests')r.type=r.attachmentType;
 return r;
}
export const model=new Proxy({}, {get:(_,type)=>repository.getAll(collectionFor(type)).map(r=>present(collectionFor(type),r))});
export const record=(type,id)=>{const value=repository.getById(collectionFor(type),id);return value?present(collectionFor(type),value):undefined;};
export const label=(type,id)=>{const r=record(type,id);if(!r)return '—';if(type==='roles'&&typeof document!=='undefined'&&document.documentElement.lang==='en')return {ADMIN:'Admin',RECEPTIONIST:'Receptionist',DOCTOR:'Doctor',ACCOUNTANT:'Accountant',CLINIC_OWNER:'Clinic Owner',BRANCH_MANAGER:'Branch Manager'}[r.code]||r.name;return r.name||r.nameAr||r.fullName||r.description||r.invoiceNumber||id;};
export const clinicRows=(type,clinicId)=>model[type].filter(r=>r.clinicId===clinicId);
export const invoicePayments=id=>model.payments.filter(r=>r.invoiceId===id&&r.status==='paid');
export const invoiceRefunds=id=>model.refunds.filter(r=>invoicePayments(id).some(p=>p.id===r.paymentId));
export const netPaid=id=>financials(repository.getSnapshot(),id).net;
export const paymentState=invoice=>financials(repository.getSnapshot(),invoice.id).state;
export const currentPrice=(serviceId,branchId,doctorId,date)=>resolvePrice(repository.getSnapshot(),serviceId,branchId,doctorId,date?`${date}T23:59:59`:undefined);
