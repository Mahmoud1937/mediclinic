import React, {useState} from 'react';
import {useCore,CoreLink} from './App.jsx';
import {model,record,label,clinicRows,demoDate,paymentState,currentPrice,invoicePayments,invoiceRefunds,netPaid} from './model.js';
import {Action,DataTable,DetailGrid,Empty,fmtDate,Icon,Money,PageHeading,Section,SmallLink,Status,Tabs} from './ui.jsx';


const daysAr=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const daysEn=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const dateShift=(date,amount)=>{const d=new Date(`${date}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+amount);return d.toISOString().slice(0,10);};
function useScope(){const {clinicId,branchId}=useCore();const rows=type=>clinicRows(type,clinicId).filter(item=>!item.branchId||!branchId||item.branchId===branchId);return {rows,clinicId,branchId};}
function PatientLink({id}){return <CoreLink to="patient" id={id} className="entity-link"><span className="table-avatar">{label('patients',id).slice(0,1)}</span><span><strong>{label('patients',id)}</strong><small dir="ltr">{id}</small></span></CoreLink>;}
function DoctorLink({id}){return <CoreLink to="doctor" id={id} className="text-link">{label('doctors',id)}</CoreLink>;}
function Metric({label,value,note,icon,to}){return <CoreLink to={to} className="metric"><span className="metric-icon"><Icon name={icon}/></span><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></CoreLink>;}
function miniTable(rows,columns,emptyTitle){return <DataTable rows={rows} columns={columns} toolbar={false} pageSize={6} emptyTitle={emptyTitle}/>;}

const appointmentColumns = (tr,lang)=>[
  {key:'time',label:tr('الوقت','Time'),render:r=><span className="mono" dir="ltr">{r.time}</span>},
  {key:'patient',label:tr('المريض','Patient'),render:r=><PatientLink id={r.patientId}/>,search:r=>label('patients',r.patientId)},
  {key:'doctor',label:tr('الطبيب والخدمة','Doctor & service'),render:r=><span className="stacked"><DoctorLink id={r.doctorId}/><small>{label('services',r.serviceId)}</small></span>},
  {key:'branch',label:tr('الفرع','Branch'),render:r=>label('branches',r.branchId),secondary:true},
  {key:'status',label:tr('الحالة','Status'),render:r=><Status value={r.status}/>},
  {key:'open',label:'',render:r=><SmallLink to="appointment" id={r.id}>{tr('فتح','Open')}</SmallLink>},
];
const visitColumns=tr=>[
  {key:'patient',label:tr('المريض','Patient'),render:r=><PatientLink id={r.patientId}/>,search:r=>label('patients',r.patientId)},
  {key:'doctor',label:tr('الطبيب','Doctor'),render:r=><DoctorLink id={r.doctorId}/>},
  {key:'checkin',label:tr('الوصول','Check-in'),render:r=><span className="mono" dir="ltr">{r.checkin||'—'}</span>},
  {key:'branch',label:tr('الفرع','Branch'),render:r=>label('branches',r.branchId),secondary:true},
  {key:'status',label:tr('الحالة','Status'),render:r=><Status value={r.status}/>},
  {key:'open',label:'',render:r=><SmallLink to="visit" id={r.id}>{tr('فتح الزيارة','Open visit')}</SmallLink>},
];
const invoiceColumns=(tr,lang)=>[
  {key:'id',label:tr('الفاتورة','Invoice'),render:r=><CoreLink to="invoice" id={r.id} className="text-link mono">{r.invoiceNumber}</CoreLink>},
  {key:'patient',label:tr('المريض','Patient'),render:r=><PatientLink id={r.patientId}/>,search:r=>label('patients',r.patientId)},
  {key:'date',label:tr('التاريخ','Date'),render:r=>fmtDate(r.date,lang),secondary:true},
  {key:'total',label:tr('الإجمالي','Total'),render:r=><Money value={r.total}/>,numeric:true},
  {key:'status',label:tr('حالة الفاتورة','Invoice status'),render:r=><Status value={r.status}/>},
  {key:'payment',label:tr('الدفع','Payment'),render:r=><Status value={paymentState(r)}/>},
  {key:'open',label:'',render:r=><SmallLink to="invoice" id={r.id}>{tr('عرض','View')}</SmallLink>},
];

export function Dashboard(){const {tr,lang}=useCore();const {rows,branchId}=useScope();const apps=rows('appointments').filter(a=>a.date===demoDate).sort((a,b)=>a.time.localeCompare(b.time));const visits=rows('visits').filter(v=>v.date===demoDate);const invoices=rows('invoices');const paidToday=model.payments.filter(p=>p.date===demoDate&&invoices.some(i=>i.id===p.invoiceId)&&p.status==='paid').reduce((n,p)=>n+p.amount,0);const refundedToday=model.refunds.filter(r=>r.date===demoDate&&invoices.some(i=>invoicePayments(i.id).some(p=>p.id===r.paymentId))&&r.status==='completed').reduce((n,r)=>n+r.amount,0);const waiting=visits.filter(v=>v.status==='waiting');const progress=visits.filter(v=>v.status==='progress');const outstanding=invoices.filter(i=>['unpaid','partial'].includes(paymentState(i)));return <>
  <PageHeading eyebrow={tr('لوحة التشغيل · ١٩ نوفمبر ٢٠٢٦','OPERATIONS · 19 NOV 2026')} title={tr('مساحة العمل اليومية','Today at the clinic')} description={tr('المواعيد والمرضى والتحصيل في لمحة واحدة. البيانات المعروضة تجريبية ليوم 19 نوفمبر.','Appointments, patients and collections derived from today?s mock records.')} actions={<><Action entity="patient" label={tr('مريض جديد','New patient')} secondary/><Action entity="appointment" label={tr('حجز موعد','Book appointment')}/></>}/>
  <div className="metrics"><Metric label={tr('مواعيد اليوم','Appointments today')} value={apps.length} note={tr('عبر الفروع المحددة','In selected branches')} icon="calendar" to="appointments"/><Metric label={tr('في الانتظار','Waiting patients')} value={waiting.length} note={tr('بحاجة إلى متابعة','Ready for follow-up')} icon="clock" to="visits"/><Metric label={tr('داخل الكشف','In consultation')} value={progress.length} note={tr('زيارات جارية','Visits in progress')} icon="visit" to="visits"/><Metric label={tr('المحصل اليوم','Collected today')} value={<Money value={paidToday-refundedToday}/>} note={tr('بعد الاستردادات','Net of refunds')} icon="wallet" to="payments"/></div>
  <div className="dashboard-grid"><Section title={tr('جدول اليوم','Today’s schedule')} caption={tr('المواعيد القادمة وحالة الوصول','Upcoming appointments and check-in status')} action={<CoreLink to="appointments" className="section-link">{tr('كل المواعيد','All appointments')} <Icon name="chevron"/></CoreLink>}>{miniTable(apps.filter(a=>['scheduled','confirmed','checkedin'].includes(a.status)),appointmentColumns(tr,lang),tr('لا توجد مواعيد قادمة','No upcoming appointments'))}</Section><div className="dashboard-side"><Section title={tr('طابور الزيارات','Visit queue')} action={<CoreLink to="visits" className="section-link">{tr('إدارة الزيارات','Manage visits')} <Icon name="chevron"/></CoreLink>}><div className="queue-list">{[...waiting,...progress].length ? [...waiting,...progress].map(v=><CoreLink to="visit" id={v.id} key={v.id} className="queue-item"><span className="queue-time mono" dir="ltr">{v.checkin}</span><span><strong>{label('patients',v.patientId)}</strong><small>{label('doctors',v.doctorId)} · {label('branches',v.branchId)}</small></span><Status value={v.status}/></CoreLink>) : <Empty compact title={tr('الطابور فارغ','Queue is clear')}/>}</div></Section><Section title={tr('المتابعة المالية','Billing follow-up')}><div className="finance-summary"><div><span>{tr('فواتير غير مسددة','Outstanding invoices')}</span><strong>{outstanding.length}</strong></div><div><span>{tr('الرصيد المستحق','Balance due')}</span><strong><Money value={outstanding.reduce((n,i)=>n+Math.max(0,i.total-netPaid(i.id)),0)}/></strong></div><CoreLink to="invoices" className="section-link">{tr('عرض الفواتير','View invoices')} <Icon name="chevron"/></CoreLink></div></Section></div></div>
  <div className="quick-actions"><span>{tr('إجراءات سريعة','Quick actions')}</span><Action entity="visit" label={tr('تسجيل حضور مباشر','Walk-in check-in')} secondary icon="visit"/><Action entity="payment" label={tr('تسجيل دفعة','Record payment')} secondary icon="wallet"/><CoreLink to="patients" className="button button-ghost"><Icon name="users"/>{tr('البحث عن مريض','Find patient')}</CoreLink></div>
  </>;
}


export {default as ListPage} from '../features/Directories.jsx';
export {default as DetailPage} from '../features/Details.jsx';
export {default as UploadPage} from '../features/Upload.jsx';
