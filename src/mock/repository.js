import initialData from './seed.json' with {type:'json'};

export const today=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Africa/Cairo'}).format(new Date());
export const now=()=>new Date().toISOString();
const id=()=>globalThis.crypto.randomUUID();
const clone=value=>structuredClone(value);
const fail=(message,field)=>{const error=new Error(message);error.field=field;throw error;};
const money=value=>Math.round(Number(value)*100)/100;
export const relations={
 branches:{branchManagerUserId:'users'},users:{roleId:'roles'},branchUsers:{userId:'users',branchId:'branches'},rolePermissions:{roleId:'roles',permissionId:'permissions'},
 patientContacts:{patientId:'patients'},patientAllergies:{patientId:'patients'},patientConditions:{patientId:'patients'},
 doctorProfiles:{userId:'users',specialtyId:'specialties'},doctorEducation:{doctorProfileId:'doctorProfiles'},doctorExperiences:{doctorProfileId:'doctorProfiles'},
 doctorSchedules:{doctorProfileId:'doctorProfiles',branchId:'branches'},doctorScheduleExceptions:{doctorProfileId:'doctorProfiles',branchId:'branches'},
 servicePrices:{serviceId:'services',branchId:'branches',doctorProfileId:'doctorProfiles'},appointments:{patientId:'patients',branchId:'branches',doctorProfileId:'doctorProfiles',serviceId:'services'},
 appointmentStatusHistory:{appointmentId:'appointments',changedByUserId:'users'},visits:{patientId:'patients',branchId:'branches',doctorProfileId:'doctorProfiles',appointmentId:'appointments'},
 vitalSigns:{visitId:'visits',recordedBy:'users'},consultations:{visitId:'visits'},diagnoses:{visitId:'visits'},
 prescriptions:{visitId:'visits',doctorProfileId:'doctorProfiles'},prescriptionItems:{prescriptionId:'prescriptions',medicationId:'medications'},
 diagnosticOrders:{visitId:'visits',doctorProfileId:'doctorProfiles'},medicalAttachments:{patientId:'patients',visitId:'visits',diagnosticOrderId:'diagnosticOrders',uploadedByUserId:'users'},
 medicalUploadRequests:{patientId:'patients',visitId:'visits',diagnosticOrderId:'diagnosticOrders',requestedByUserId:'users'},
 treatmentPlans:{patientId:'patients',doctorProfileId:'doctorProfiles'},treatmentPlanItems:{treatmentPlanId:'treatmentPlans',serviceId:'services'},
 invoices:{patientId:'patients',branchId:'branches',visitId:'visits'},invoiceItems:{invoiceId:'invoices',serviceId:'services',doctorProfileId:'doctorProfiles'},
 payments:{invoiceId:'invoices',createdByUserId:'users'},paymentRefunds:{paymentId:'payments',createdByUserId:'users'},
};
const required={clinics:'name slug status',branches:'name',users:'fullName email roleId',branchUsers:'userId branchId',roles:'name code',permissions:'code',rolePermissions:'roleId permissionId',patients:'fullName mrn',patientContacts:'patientId name relationship',patientAllergies:'patientId substance',patientConditions:'patientId conditionName',doctorProfiles:'userId specialtyId clinicalRank',doctorEducation:'doctorProfileId university degree',doctorExperiences:'doctorProfileId organization position',doctorSchedules:'doctorProfileId branchId weekday startTime endTime',doctorScheduleExceptions:'doctorProfileId branchId startAt endAt type',services:'code nameAr nameEn durationMinutes',servicePrices:'serviceId price validFrom',appointments:'patientId doctorProfileId branchId serviceId scheduledStartAt status',visits:'patientId doctorProfileId branchId status',vitalSigns:'visitId recordedAt',consultations:'visitId',diagnoses:'visitId description type',prescriptions:'visitId doctorProfileId status',prescriptionItems:'prescriptionId medicationName dose frequency',medications:'genericName',diagnosticOrders:'visitId doctorProfileId type name status',medicalAttachments:'patientId fileName attachmentType source',medicalUploadRequests:'patientId attachmentType expiresAt status',treatmentPlans:'patientId doctorProfileId status',treatmentPlanItems:'treatmentPlanId description status',invoices:'patientId branchId invoiceNumber status',invoiceItems:'invoiceId description qty unitPrice',payments:'invoiceId amount method status',paymentRefunds:'paymentId amount status'};
export const enums={clinics:{status:['active','suspended','closed']},appointments:{status:['scheduled','confirmed','checkedin','cancelled','noshow']},visits:{status:['waiting','progress','completed','cancelled']},invoices:{status:['draft','issued','cancelled']},prescriptions:{status:['draft','issued','cancelled']},diagnoses:{type:['provisional','confirmed','differential']},diagnosticOrders:{type:['lab','imaging'],status:['ordered','completed','cancelled']},medicalUploadRequests:{status:['pending','opened','completed','expired','revoked']},treatmentPlans:{status:['draft','active','completed','cancelled']},treatmentPlanItems:{status:['pending','completed','cancelled']},payments:{status:['pending','completed','failed']},paymentRefunds:{status:['pending','completed','failed']},doctorScheduleExceptions:{type:['unavailable','extra','leave']}};
export function seedData(){const data=clone(initialData);const day=today();for(const collection of Object.values(data))for(const row of collection)for(const key of Object.keys(row))if(typeof row[key]==='string'&&row[key].startsWith('2026-11-19'))row[key]=row[key].replace('2026-11-19',day);return data;}
export function financials(data,invoiceId){const invoice=data.invoices.find(r=>r.id===invoiceId);const payments=data.payments.filter(r=>r.invoiceId===invoiceId&&r.status==='completed');const gross=money(payments.reduce((n,r)=>n+Number(r.amount),0));const refunds=money(data.paymentRefunds.filter(r=>payments.some(p=>p.id===r.paymentId)&&r.status==='completed').reduce((n,r)=>n+Number(r.amount),0));const net=money(gross-refunds);return {gross,refunds,net,balance:Math.max(0,money((invoice?.total||0)-net)),state:gross>0&&refunds>=gross?'refunded':net>=(invoice?.total||Infinity)?'paid':net>0?'partial':'unpaid'};}
export function resolvePrice(data,serviceId,branchId,doctorProfileId,at=now()){return data.servicePrices.filter(r=>r.serviceId===serviceId&&(!r.branchId||r.branchId===branchId)&&(!r.doctorProfileId||r.doctorProfileId===doctorProfileId)&&new Date(r.validFrom)<=new Date(at)&&(!r.validTo||new Date(r.validTo)>=new Date(at))).sort((a,b)=>(Number(!!b.doctorProfileId)*2+Number(!!b.branchId))-(Number(!!a.doctorProfileId)*2+Number(!!a.branchId))||b.validFrom.localeCompare(a.validFrom))[0];}

export function createRepository(seed=seedData(),persistence=null){
 let state=clone(seed);const listeners=new Set();
 const get=(type,recordId,data=state)=>data[type]?.find(r=>r.id===recordId);
 const emit=data=>{state=data;persistence?.save(data);for(const listener of listeners)listener();};
 const unique=(data,type,row,keys,scope=true)=>{if(data[type].some(r=>r.id!==row.id&&(!scope||r.clinicId===row.clinicId)&&keys.every(k=>String(r[k]??'').toLowerCase()===String(row[k]??'').toLowerCase())))fail(`A record already uses this ${keys.join(' / ')}.`,keys.at(-1));};
 function validate(data,type,row){
   if(!data[type])fail('Unknown collection.');
   for(const field of (required[type]||'').split(' ').filter(Boolean))if(row[field]==null||String(row[field]).trim()==='')fail(`${field} is required.`,field);
   if(!['clinics','roles','permissions','rolePermissions','specialties','medications','auditLogs'].includes(type)&&!get('clinics',row.clinicId,data))fail('Select a valid clinic.','clinicId');
   for(const [field,target] of Object.entries(relations[type]||{})){if(!row[field])continue;const related=get(target,row[field],data);if(!related)fail(`Select a valid ${field}.`,field);if(row.clinicId&&related.clinicId&&related.clinicId!==row.clinicId)fail('Related records must belong to the same clinic.',field);}
   for(const [field,values] of Object.entries(enums[type]||{}))if(!values.includes(row[field]))fail(`Select a valid ${field}.`,field);
   for(const field of ['price','qty','unitPrice','amount','durationMinutes'])if(row[field]!==undefined&&!(Number(row[field])>0))fail(`${field} must be greater than zero.`,field);
   for(const field of ['weight','height','systolic','diastolic','heartRate','respiratoryRate','temperature'])if(row[field]!==undefined&&row[field]!==''&&row[field]!=null&&Number(row[field])<=0)fail(`${field} must be positive.`,field);
   if(row.oxygenSaturation!==undefined&&(Number(row.oxygenSaturation)<0||Number(row.oxygenSaturation)>100))fail('Oxygen saturation must be between 0 and 100.','oxygenSaturation');
   if(type==='clinics'){unique(data,type,row,['slug'],false);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug))fail('Use lowercase letters, numbers and hyphens.','slug');}
   if(type==='users'){unique(data,type,row,['email'],false);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email))fail('Enter a valid email address.','email');if(data.doctorProfiles.some(p=>p.userId===row.id)&&get('roles',row.roleId,data)?.code!=='DOCTOR')fail('A doctor profile requires the Doctor role.','roleId');}
   if(type==='roles'||type==='permissions'||type==='specialties')unique(data,type,row,['code'],false);
   if(type==='patients')unique(data,type,row,['mrn']);
   if(type==='services')unique(data,type,row,['code']);
   if(type==='invoices')unique(data,type,row,['invoiceNumber']);
   if(type==='branchUsers')unique(data,type,row,['userId','branchId']);
   if(type==='rolePermissions')unique(data,type,row,['roleId','permissionId'],false);
   if(type==='doctorProfiles'){unique(data,type,row,['userId']);const user=get('users',row.userId,data);if(get('roles',user?.roleId,data)?.code!=='DOCTOR')fail('Choose a user with the Doctor role.','userId');}
   if(type==='doctorExperiences'&&!row.isCurrent&&row.fromYear&&row.toYear&&Number(row.toYear)<Number(row.fromYear))fail('End year must follow start year.','toYear');
   if(['doctorSchedules','doctorScheduleExceptions','appointments'].includes(type)){
     const doctor=get('doctorProfiles',row.doctorProfileId,data);
     if((row.isActive!==false&&!doctor?.isActive)||!data.branchUsers.some(b=>b.userId===doctor?.userId&&b.branchId===row.branchId&&b.isActive))fail('Assign this doctor to the selected branch first.','branchId');
   }
   if(type==='doctorSchedules'){
     if(Number(row.weekday)<0||Number(row.weekday)>6)fail('Choose a weekday.','weekday');
     if(row.startTime>=row.endTime)fail('End time must follow start time.','endTime');
     if(row.isActive&&data.doctorSchedules.some(r=>r.id!==row.id&&r.isActive&&r.doctorProfileId===row.doctorProfileId&&r.branchId===row.branchId&&Number(r.weekday)===Number(row.weekday)&&row.startTime<r.endTime&&row.endTime>r.startTime))fail('These hours overlap an active schedule.','startTime');
   }
   if(type==='doctorScheduleExceptions'&&row.startAt>=row.endAt)fail('End must follow start.','endAt');
   if(type==='servicePrices'){
     if(row.validTo&&new Date(row.validTo)<new Date(row.validFrom))fail('Valid to must follow valid from.','validTo');
     if(data.servicePrices.some(r=>r.id!==row.id&&r.serviceId===row.serviceId&&(r.branchId||'')===(row.branchId||'')&&(r.doctorProfileId||'')===(row.doctorProfileId||'')&&new Date(row.validFrom)<=new Date(r.validTo||'9999-01-01')&&new Date(row.validTo||'9999-01-01')>=new Date(r.validFrom)))fail('A price already covers this scope and period. End its validity before adding a new price.','validFrom');
   }
   if(type==='appointments'){
     if(!Number.isFinite(new Date(row.scheduledStartAt).getTime()))fail('Choose a valid start time.','scheduledStartAt');
     const visit=data.visits.find(v=>v.appointmentId===row.id);if(visit&&['patientId','doctorProfileId','branchId'].some(k=>visit[k]!==row[k]))fail('A checked-in booking must keep its patient, doctor and branch.');
   }
   if(type==='visits'&&row.appointmentId){unique(data,type,row,['appointmentId']);const a=get('appointments',row.appointmentId,data);if(['patientId','doctorProfileId','branchId'].some(k=>a[k]!==row[k]))fail('Visit details must match its appointment.');}
   if(type==='consultations')unique(data,type,row,['visitId']);
   if(['prescriptions','diagnosticOrders'].includes(type)){const v=get('visits',row.visitId,data);if(row.doctorProfileId!==v.doctorProfileId)fail('Use the visit doctor.','doctorProfileId');}
   if(['medicalAttachments','medicalUploadRequests','invoices'].includes(type)){
     const v=row.visitId?get('visits',row.visitId,data):null;if(v&&row.patientId!==v.patientId)fail('The visit must belong to the selected patient.','visitId');
     if(type==='invoices'&&v){unique(data,type,row,['visitId']);if(row.branchId!==v.branchId)fail('Use the visit branch.','branchId');}
     if(row.diagnosticOrderId){const order=get('diagnosticOrders',row.diagnosticOrderId,data);const visit=get('visits',order.visitId,data);if(visit.patientId!==row.patientId||(row.visitId&&order.visitId!==row.visitId))fail('The diagnostic order must match the patient and visit.','diagnosticOrderId');}
   }
   if(type==='medicalUploadRequests'&&['pending','opened'].includes(row.status)&&new Date(row.expiresAt)<=new Date())fail('Choose a future expiration.','expiresAt');
   if(type==='payments'){
     const invoice=get('invoices',row.invoiceId,data);if(invoice.status!=='issued')fail('Payments require an issued invoice.','invoiceId');
     if(row.status==='completed'){const others=clone(data);others.payments=others.payments.filter(p=>p.id!==row.id);if(Number(row.amount)>financials(others,row.invoiceId).balance)fail('Payment exceeds the outstanding balance.','amount');}
   }
   if(type==='paymentRefunds'){
     const payment=get('payments',row.paymentId,data);if(payment.status!=='completed')fail('Only completed payments can be refunded.','paymentId');
     const refunded=data.paymentRefunds.filter(r=>r.id!==row.id&&r.paymentId===row.paymentId&&r.status!=='failed').reduce((n,r)=>n+Number(r.amount),0);if(row.status!=='failed'&&refunded+Number(row.amount)>Number(payment.amount))fail('Total refunds cannot exceed the original payment.','amount');
   }
 }
 function write(data,type,input,recordId,actor){
   const old=recordId?get(type,recordId,data):null;if(recordId&&!old)fail('Record no longer exists.');
   if(old&&['payments','paymentRefunds'].includes(type)&&old.status==='completed')fail('Completed financial history cannot be edited. Record a refund instead.');
   if(old&&type==='prescriptions'&&old.status==='issued'&&input.status!=='cancelled')fail('Cancel an issued prescription; its original items are preserved.');
   if(old&&type==='invoices'&&old.status!=='draft'&&input.status!==old.status&&input.status!=='cancelled')fail('An issued invoice may only be cancelled.');
   if(old&&type==='roles'&&old.code!==input.code&&['DOCTOR','CLINIC_OWNER'].includes(old.code))fail('This built-in role code is fixed.','code');
   const row={...old,...clone(input),id:old?.id||input.id||id(),createdAt:old?.createdAt||now()};
   delete row.password;delete row.confirm;delete row.items;
   if(type==='patients'&&!row.mrn)row.mrn=`MRN-${id().slice(0,8).toUpperCase()}`;
   if(type==='invoices'&&!row.invoiceNumber)row.invoiceNumber=`INV-${id().slice(0,8).toUpperCase()}`;
   if(type==='appointments'){const service=get('services',row.serviceId,data);if(!row.scheduledStartAt||!service)fail('Choose a service and start time.','serviceId');row.scheduledStartAt=row.scheduledStartAt.slice(0,16);row.scheduledEndAt=new Date(new Date(`${row.scheduledStartAt}:00Z`).getTime()+Number(service.durationMinutes)*60000).toISOString().slice(0,16);}
   if(type==='visits'){
     if(row.appointmentId){const a=get('appointments',row.appointmentId,data);if(!a)fail('Select an appointment.');Object.assign(row,{patientId:a.patientId,doctorProfileId:a.doctorProfileId,branchId:a.branchId,clinicId:a.clinicId});}
     row.checkedInAt=row.checkedInAt||now();if(row.status==='progress'&&!row.startedAt)row.startedAt=now();if(row.status==='completed'&&!row.endedAt)row.endedAt=now();
   }
   if(type==='prescriptions')row.issuedAt=row.status==='issued'?old?.issuedAt||now():old?.issuedAt||null;
   if(type==='treatmentPlanItems')row.completedAt=row.status==='completed'?row.completedAt||now():null;
   if(type==='invoiceItems')row.lineTotal=money(Number(row.qty)*Number(row.unitPrice));
   if(type==='doctorExperiences'&&row.isCurrent)row.toYear=null;
   if(type==='payments'&&row.status==='completed')row.paidAt=row.paidAt||now();
   if(type==='paymentRefunds'&&row.status==='completed')row.refundedAt=row.refundedAt||now();
   validate(data,type,row);
   if(type==='diagnoses'&&row.isPrimary)data.diagnoses=data.diagnoses.map(r=>r.visitId===row.visitId?{...r,isPrimary:false}:r);
   data[type]=old?data[type].map(r=>r.id===row.id?row:r):[...data[type],row];
   if(type==='branches'&&row.branchManagerUserId&&!data.branchUsers.some(r=>r.userId===row.branchManagerUserId&&r.branchId===row.id&&r.isActive))write(data,'branchUsers',{clinicId:row.clinicId,userId:row.branchManagerUserId,branchId:row.id,isActive:true,assignedAt:now()},null,actor);
   if(type==='appointments'&&old?.status!==row.status)write(data,'appointmentStatusHistory',{clinicId:row.clinicId,appointmentId:row.id,fromStatus:old?.status||null,toStatus:row.status,changedAt:now(),changedByUserId:actor||null,reason:input.reason||''},null,actor);
   if(type==='visits'&&row.appointmentId&&get('appointments',row.appointmentId,data)?.status!=='checkedin')write(data,'appointments',{...get('appointments',row.appointmentId,data),status:'checkedin'},row.appointmentId,actor);
   if(!['auditLogs','appointmentStatusHistory'].includes(type))data.auditLogs.push({id:id(),clinicId:row.clinicId||null,actorUserId:actor||null,action:old?'update':'create',resourceType:type,resourceId:row.id,occurredAt:now()});
   return row;
 }
 const transact=callback=>{const data=clone(state);const result=callback(data);emit(data);return result;};
 const save=(type,input,recordId,actor)=>transact(data=>write(data,type,input,recordId,actor));
 function remove(type,recordId,actor){return transact(data=>{
   const row=get(type,recordId,data);if(!row)fail('Record no longer exists.');
   if(type==='clinics')fail('Close the clinic instead of deleting it.');
   if(['payments','paymentRefunds','appointmentStatusHistory','auditLogs'].includes(type))fail('Financial and audit history cannot be deleted.');
   if(type==='invoices'&&row.status!=='draft')fail('Cancel an issued invoice instead of deleting it.');
   if(type==='prescriptions'&&row.status!=='draft')fail('Cancel an issued prescription instead of deleting it.');
   if(['prescriptionItems','invoiceItems'].includes(type)){const parent=get(type==='invoiceItems'?'invoices':'prescriptions',row[type==='invoiceItems'?'invoiceId':'prescriptionId'],data);if(parent.status!=='draft')fail('Issued document items are preserved.');}
   if(type==='branchUsers'&&data.branches.some(b=>b.id===row.branchId&&b.branchManagerUserId===row.userId))fail('Choose another branch manager before removing this assignment.');
   const owned={invoices:['invoiceItems'],prescriptions:['prescriptionItems'],treatmentPlans:['treatmentPlanItems']};
   for(const [child,keys] of Object.entries(relations))for(const [key,target] of Object.entries(keys))if(target===type&&!(owned[type]||[]).includes(child)&&data[child].some(r=>r[key]===recordId))fail('This record has linked history. Deactivate or cancel it where available.');
   for(const child of owned[type]||[])data[child]=data[child].filter(r=>!Object.entries(relations[child]).some(([key,target])=>target===type&&r[key]===recordId));
   data[type]=data[type].filter(r=>r.id!==recordId);
   data.auditLogs.push({id:id(),clinicId:row.clinicId||null,actorUserId:actor||null,action:'remove',resourceType:type,resourceId:recordId,occurredAt:now()});
 });}
 function saveDocument(type,input,items,recordId,actor){return transact(data=>{
   const old=recordId?get(type,recordId,data):null;
   if(old&&['invoices','prescriptions'].includes(type)&&old.status!=='draft')fail('Issued documents are immutable. Cancel the document if necessary.');
   if(!items.length)fail('Add at least one item.','items');
   const child=type==='invoices'?'invoiceItems':type==='prescriptions'?'prescriptionItems':'treatmentPlanItems';
   const foreign=type==='invoices'?'invoiceId':type==='prescriptions'?'prescriptionId':'treatmentPlanId';
   const header={...input};
   if(type==='invoices'){header.subtotal=money(items.reduce((n,r)=>n+Number(r.qty)*Number(r.unitPrice),0));header.discount=Number(input.discount||0);if(header.discount<0||header.discount>header.subtotal)fail('Discount must be between zero and subtotal.','discount');header.total=money(header.subtotal-header.discount);}
   const row=write(data,type,header,recordId,actor);
   data[child]=data[child].filter(r=>r[foreign]!==row.id);
   for(const item of items)write(data,child,{...item,id:item.id||id(),clinicId:row.clinicId,[foreign]:row.id},null,actor);
   return row;
 });}
 return {
  getSnapshot:()=>state,subscribe:listener=>{listeners.add(listener);return()=>listeners.delete(listener);},getAll:type=>state[type]||[],getById:get,
  create:(type,input,actor)=>save(type,input,null,actor),update:(type,recordId,input,actor)=>save(type,input,recordId,actor),remove,saveDocument,
  batch:(type,items,actor)=>transact(data=>items.map(item=>write(data,type,item,null,actor))),
  registerClinic:(clinic,owner)=>transact(data=>{const c=write(data,'clinics',{...clinic,status:'active'},null,null);const role=data.roles.find(r=>r.code==='CLINIC_OWNER');const user=write(data,'users',{fullName:owner.fullName,email:owner.email,clinicId:c.id,roleId:role.id,isActive:true},null,null);return {clinic:c,user};}),
  createDoctor:(profile,user,branchId,actor)=>transact(data=>{let userId=profile.userId;if(userId==='new'){const role=data.roles.find(r=>r.code==='DOCTOR');userId=write(data,'users',{...user,clinicId:profile.clinicId,roleId:role.id,isActive:true},null,actor).id;}const doctor=write(data,'doctorProfiles',{...profile,userId},null,actor);if(branchId)write(data,'branchUsers',{clinicId:profile.clinicId,userId,branchId,isActive:true,assignedAt:now()},null,actor);return doctor;}),
  setPermissions:(roleId,permissionIds)=>transact(data=>{data.rolePermissions=data.rolePermissions.filter(r=>r.roleId!==roleId);for(const permissionId of permissionIds)write(data,'rolePermissions',{roleId,permissionId},null,null);}),
  completeUpload:(requestId,files)=>transact(data=>{const request=get('medicalUploadRequests',requestId,data);if(!request||['expired','revoked','completed'].includes(request.status)||new Date(request.expiresAt)<=new Date())fail('This upload request is no longer available.');if(!files.length)fail('Choose at least one file.');const result=files.map(file=>write(data,'medicalAttachments',{...file,clinicId:request.clinicId,patientId:request.patientId,visitId:request.visitId||null,diagnosticOrderId:request.diagnosticOrderId||null,attachmentType:request.attachmentType,source:'patient',uploadedByUserId:null},null,null));write(data,'medicalUploadRequests',{...request,status:'completed',completedAt:now()},request.id,null);return result;}),
  reset:()=>emit(seedData()),validateAll:()=>{for(const [type,rows] of Object.entries(state))for(const row of rows){try{validate(state,type,row);}catch(error){throw new Error(`${type} ${row.id}: ${error.message}`);}}return true;},
 };
}
