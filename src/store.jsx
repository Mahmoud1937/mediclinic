import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import data from './data.js';

export const D=data;
export const get=(type,id)=>D[type].find(r=>r.id===id);
export const sum=(rows,key)=>rows.reduce((n,r)=>n+Number(r[key]||0),0);
export const paid=id=>sum(D.payments.filter(p=>p.invoiceId===id&&p.status==='paid'),'amount');
export const num=n=>Number(n).toLocaleString('en-US');
export const nameOf=(type,id)=>get(type,id)?.name||'—';
export const dayNames=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
export const titleMap={dashboard:'لوحة التحكم',platform:'لوحة إدارة المنصة',tenants:'العملاء',clinics:'العيادات',branches:'الفروع',patients:'المرضى',doctors:'الأطباء',schedules:'جداول الأطباء',users:'المستخدمون والأدوار',roles:'الأدوار والصلاحيات',services:'الخدمات',prices:'أسعار الخدمات',appointments:'المواعيد',visits:'الزيارات',invoices:'الفواتير',payments:'المدفوعات',refunds:'المبالغ المستردة',audit:'سجل التدقيق',reports:'التقارير',settings:'الإعدادات','tenant-details':'تفاصيل العميل','clinic-details':'تفاصيل العيادة','branch-details':'تفاصيل الفرع','patient-details':'ملف المريض','doctor-details':'ملف الطبيب','user-details':'ملف المستخدم','role-details':'تفاصيل الدور','appointment-details':'تفاصيل الموعد','visit-details':'تفاصيل الزيارة','invoice-details':'تفاصيل الفاتورة'};
export const parentPage={'tenant-details':'tenants','clinic-details':'clinics','branch-details':'branches','patient-details':'patients','doctor-details':'doctors','user-details':'users','role-details':'roles','appointment-details':'appointments','visit-details':'visits','invoice-details':'invoices'};
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(`mediclinic.react.${key}`))??fallback;}catch{return fallback;}};
const persist=(key,v)=>{try{localStorage.setItem(`mediclinic.react.${key}`,JSON.stringify(v));}catch{/* private/file environments may restrict local storage */}};
const readRoute=()=>{const [p,q]=location.hash.replace(/^#\/?/,'').split('?'),params=new URLSearchParams(q);return {page:p||'dashboard',id:params.get('id'),tenant:p==='tenant-details'&&get('tenants',params.get('id'))?params.get('id'):params.get('tenant')};};
const C=createContext(null);
export const useClinic=()=>useContext(C);
export function Provider({children}){
  const [route,setRoute]=useState(readRoute);
  const [context,setContext]=useState(()=>{const c=read('context',{tenant:'TN-001',clinic:'all',branch:'all'});if(!get('tenants',c.tenant))c.tenant='TN-001';if(route.tenant&&route.tenant!==c.tenant&&get('tenants',route.tenant))return {tenant:route.tenant,clinic:'all',branch:'all'};if(c.clinic!=='all'&&get('clinics',c.clinic)?.tenantId!==c.tenant)c.clinic='all';if(c.branch!=='all'){const b=get('branches',c.branch);if(!b||b.tenantId!==c.tenant||(c.clinic!=='all'&&b.clinicId!==c.clinic))c.branch='all';}return c;});
  const [preferences,setPreferences]=useState(()=>read('preferences',{density:'normal',collapsed:false}));
  const [modal,setModal]=useState(null),[toast,setToast]=useState(''),[mobileOpen,setMobileOpen]=useState(false);
  const platform=['platform','tenants','tenant-details'].includes(route.page);
  useEffect(()=>{const onHash=()=>{const r=readRoute();setRoute(r);setModal(null);setMobileOpen(false);if(r.tenant&&get('tenants',r.tenant))setContext(c=>c.tenant===r.tenant?c:{tenant:r.tenant,clinic:'all',branch:'all'});window.scrollTo(0,0);};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash);},[]);
  useEffect(()=>persist('context',context),[context]);
  useEffect(()=>persist('preferences',preferences),[preferences]);
  useEffect(()=>{document.title=`${titleMap[route.page]||'صفحة غير موجودة'} | mediClinic`;},[route.page]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),5000);return()=>clearTimeout(t);},[toast]);
  const api=useMemo(()=>{
    const tenantRows=(type,tenant=context.tenant)=>D[type].filter(r=>r.tenantId===tenant);
    const branches=tenantRows('branches').filter(b=>(context.clinic==='all'||b.clinicId===context.clinic)&&(context.branch==='all'||b.id===context.branch));
    const scoped=type=>tenantRows(type).filter(r=>!r.branchId||branches.some(b=>b.id===r.branchId));
    const memberships=(tenant=context.tenant)=>tenantRows('tenantUsers',tenant);
    const assignments=userId=>D.userRoleAssignments.filter(a=>memberships().some(m=>m.id===a.tenantUserId&&m.userId===userId));
    const users=memberships().map(m=>({...get('users',m.userId),membership:m})).filter(u=>assignments(u.id).some(a=>(context.clinic==='all'||!a.clinicId||a.clinicId===context.clinic)&&(context.branch==='all'||!a.branchId||a.branchId===context.branch)));
    const doctors=tenantRows('doctors').filter(d=>D.doctorBranches.some(a=>a.doctorId===d.id&&branches.some(b=>b.id===a.branchId)));
    const url=(page,id,tenant=context.tenant)=>`#/${page}?tenant=${encodeURIComponent(tenant)}${id?`&id=${encodeURIComponent(id)}`:''}`;
    const selectContext=(key,value)=>{
      setContext(c=>{const n={...c,[key]:value};if(key==='tenant'){n.clinic='all';n.branch='all';}if(key==='clinic')n.branch='all';return n;});
      if(parentPage[route.page])location.hash=url(parentPage[route.page],null,key==='tenant'?value:context.tenant);
      else if(key==='tenant'){const r=readRoute();location.hash=url(r.page,null,value);}
    };
    return {tenantRows,branches,scoped,memberships,assignments,users,doctors,url,selectContext};
  },[context,route.page]);
  return <C.Provider value={{...api,context,route,platform,preferences,setPreferences,modal,setModal,toast,notify:setToast,mobileOpen,setMobileOpen}}>{children}</C.Provider>;
}
