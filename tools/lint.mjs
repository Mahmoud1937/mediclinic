import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {transform} from 'esbuild';
import {model,record} from '../src/core/model.js';

const directory=path.resolve('src/core');
const files=fs.readdirSync(directory).filter(file=>/\.(jsx|js)$/.test(file));
const retired=/\b(?:TenantUsers|ClinicUsers|UserRoleAssignments|PatientGuardians|PatientIdentifiers|DoctorBranches|SlotMinutes|MedicalRecords|DiagnosticOrderItems)\b/;
for(const file of files){
  const contents=fs.readFileSync(path.join(directory,file),'utf8');
  await transform(contents,{loader:file.endsWith('.jsx')?'jsx':'js',sourcefile:file});
  if(file!=='model.js')assert.ok(!retired.test(contents),`${file} exposes a retired data-model concept`);
}
const app=fs.readFileSync(path.resolve('src/core/App.jsx'),'utf8');
assert.ok(app.includes("document.documentElement.dir=lang==='ar'?'rtl':'ltr'"),'Both text directions must be set by language');
assert.ok(app.includes('clinicId')&&app.includes('branchId'),'Clinic and branch context are required');
for(const appointment of model.appointments){
  for(const [type,id] of [['patients',appointment.patientId],['doctors',appointment.doctorId],['branches',appointment.branchId],['services',appointment.serviceId]]){
    assert.equal(record(type,id)?.clinicId,appointment.clinicId,`${appointment.id} has a cross-clinic ${type} reference`);
  }
}
for(const visit of model.visits){
  for(const [type,id] of [['patients',visit.patientId],['doctors',visit.doctorId],['branches',visit.branchId]]){
    assert.equal(record(type,id)?.clinicId,visit.clinicId,`${visit.id} has a cross-clinic ${type} reference`);
  }
}
for(const price of model.prices){
  assert.equal(record('services',price.serviceId)?.clinicId,price.clinicId,`${price.id} has a cross-clinic service reference`);
  if(price.branchId)assert.equal(record('branches',price.branchId)?.clinicId,price.clinicId,`${price.id} has a cross-clinic branch reference`);
  if(price.doctorId)assert.equal(record('doctors',price.doctorId)?.clinicId,price.clinicId,`${price.id} has a cross-clinic doctor reference`);
}
for(const doctor of model.doctors){
  assert.equal(record('users',doctor.userId)?.clinicId,doctor.clinicId,`${doctor.id} is linked to another clinic's user`);
  for(const branchId of doctor.branchIds)assert.equal(record('branches',branchId)?.clinicId,doctor.clinicId,`${doctor.id} has a cross-clinic branch`);
}
for(const branch of model.branches){
  if(!branch.managerUserId)continue;
  const manager=record('users',branch.managerUserId);
  assert.equal(manager?.clinicId,branch.clinicId,`${branch.id} manager belongs to another clinic`);
  assert.ok(manager.branchIds.includes(branch.id),`${branch.id} manager is not assigned to the branch`);
}
console.log(`PASS: ${files.length} active source modules parse; clinic relationships are consistent; retired model terms are absent from the interface.`);
