import React from 'react';
import {CoreLink,useCore} from '../core/App.jsx';
import {label} from '../core/model.js';
import {Action,DetailGrid,fmtDate,PageHeading,Section,Tabs,DataTable,Status} from '../core/ui.jsx';
import {EntitySection,RecordActions,DocumentList} from './EntitySection.jsx';
export default function Patient({patient}){
 const {data,tr,lang}=useCore();const visits=data.visits.filter(v=>v.patientId===patient.id),invoices=data.invoices.filter(i=>i.patientId===patient.id),allergies=data.patientAllergies.filter(a=>a.patientId===patient.id&&a.isActive),age=patient.birthDate?Math.floor((Date.now()-new Date(patient.birthDate).getTime())/31557600000):null;
 const parent={patientId:patient.id};
 const linked=(rows,to,fields)=> <DataTable rows={rows} columns={[...fields.map(([key,ar,en])=>({key,label:tr(ar,en),render:r=>key==='status'?<Status value={r.status}/>:r[key]||'—'})),{key:'open',label:'',render:r=><CoreLink to={to} id={r.id} className="text-link">{tr('فتح','Open')}</CoreLink>}]} />;
 return <><PageHeading back="patients" eyebrow="MRN" title={patient.fullName} description={<span dir="auto">{patient.mrn} · {age??'—'} {tr('سنة','years')} · {patient.phone||'—'}</span>} actions={<><Action entity="appointment" defaults={parent} label={tr('حجز موعد','Book appointment')}/><RecordActions entity="patient" row={patient}/></>}/>{allergies.length>0&&<div className="clinical-alert"><strong>{tr('حساسية','Allergies')}</strong><span>{allergies.map(a=>`${a.substance} (${a.reaction||translateSeverity(a.severity)})`).join(' · ')}</span></div>}
 <Tabs items={[
  {key:'overview',label:tr('نظرة عامة','Overview'),content:<><Section title={tr('بيانات المريض','Patient information')}><div className="section-body"><DetailGrid items={[[tr('الاسم الكامل','Full name'),patient.fullName],['MRN',patient.mrn],[tr('الهاتف','Phone'),patient.phone],[tr('الرقم القومي','National ID'),patient.nationalId],[tr('الجواز','Passport'),patient.passportNumber],[tr('تاريخ الميلاد','Birth date'),fmtDate(patient.birthDate,lang)],[tr('النوع','Gender'),patient.gender],[tr('تاريخ التسجيل','Created at'),fmtDate(patient.createdAt,lang)]]}/></div></Section><EntitySection entity="contact" title={tr('جهات الاتصال والأوصياء','Contacts & guardians')} parent={parent}/><Section title={tr('المواعيد','Appointments')} action={<Action entity="appointment" defaults={parent} label={tr('إضافة موعد','Add appointment')} secondary/>}>{linked(data.appointments.filter(a=>a.patientId===patient.id),'appointment',[['scheduledStartAt','الموعد','Scheduled start'],['status','الحالة','Status']])}</Section></>},
  {key:'visits',label:tr('الزيارات','Visits'),content:<Section title={tr('تاريخ الزيارات','Visit history')} action={<Action entity="visit" defaults={parent} label={tr('تسجيل زيارة','Check in')} secondary/>}>{linked(visits,'visit',[['checkedInAt','الوصول','Check-in'],['status','الحالة','Status']])}</Section>},
  {key:'history',label:tr('التاريخ الطبي','Medical History'),content:<><EntitySection entity="allergy" title={tr('الحساسية','Allergies')} parent={parent}/><EntitySection entity="condition" title={tr('الحالات المرضية','Conditions')} parent={parent}/></>},
  {key:'prescriptions',label:tr('الوصفات','Prescriptions'),content:<DocumentList entity="prescription" parent={parent}/>},
  {key:'diagnostics',label:tr('الفحوصات','Diagnostics'),content:<EntitySection entity="diagnostic" parent={parent}/>},
  {key:'plans',label:tr('خطط العلاج','Treatment Plans'),content:<DocumentList entity="plan" parent={parent}/>},
  {key:'files',label:tr('الملفات الطبية','Medical Files'),content:<><EntitySection entity="file" parent={parent}/><EntitySection entity="upload" parent={parent}/></>},
  {key:'billing',label:tr('الفواتير','Billing'),content:<Section title={tr('فواتير المريض','Patient invoices')} action={<Action entity="invoice" defaults={parent} label={tr('إنشاء فاتورة','Create invoice')} secondary/>}>{linked(invoices,'invoice',[['invoiceNumber','رقم الفاتورة','Invoice number'],['total','الإجمالي','Total'],['status','الحالة','Status']])}</Section>},
 ]}/></>;
}
const translateSeverity=value=>value||'—';
