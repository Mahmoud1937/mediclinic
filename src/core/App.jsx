import React, {createContext, useContext, useEffect, useMemo, useRef, useState,useSyncExternalStore} from 'react';
import {repository} from '../mock/index.js';
import {model, record, demoDate} from './model.js';
import {Dashboard, ListPage, DetailPage, UploadPage} from './pages.jsx';
import {Icon, Empty, PreviewDrawer, useModalFocus} from './ui.jsx';
import {EntryPage, OnboardingPage} from './Entry.jsx';
import './style.css';
import './entry.css';
import './functional.css';

const Core = createContext(null);
export const useCore = () => useContext(Core);

const oldPages = {prices:'services', schedules:'doctors', refunds:'payments', clinics:'settings', 'clinic-details':'settings', reports:'dashboard', audit:'settings', platform:'dashboard', tenants:'dashboard', 'tenant-details':'dashboard'};
const oldDetails = {'patient-details':'patient', 'doctor-details':'doctor', 'branch-details':'branch', 'user-details':'user', 'role-details':'role', 'appointment-details':'appointment', 'visit-details':'visit', 'invoice-details':'invoice'};
function readRoute() {
  const raw = location.hash ? location.hash.replace(/^#\/?/, '') : location.pathname.replace(/^\/+|\/+$/g,'').replace(/(?:^|\/)index\.html$/,'');
  const [path, query] = raw.split('?');
  const [page = 'dashboard', id] = path.split('/');
  const params = new URLSearchParams(query);
  if (oldDetails[page]) return {page:oldDetails[page], id:params.get('id') || id};
  return {page:oldPages[page] || page || 'login', id};
}
export const routeHref=(page,id)=>['login','register-clinic','onboarding'].includes(page)?(page==='login'?'/':`/${page}`):`/#/${page}${id?`/${encodeURIComponent(id)}`:''}`;
export function navigate(page,id){history.pushState(null,'',routeHref(page,id));window.dispatchEvent(new PopStateEvent('popstate'));}
const nav = [
  {title:['العمل اليومي','WORKSPACE'], items:[['dashboard','لوحة التحكم','Dashboard','grid'],['patients','المرضى','Patients','users'],['appointments','المواعيد','Appointments','calendar'],['visits','الزيارات','Visits','visit']]},
  {title:['الرعاية','CARE'], items:[['doctors','الأطباء','Doctors','doctor'],['services','الخدمات والأسعار','Services & pricing','service']]},
  {title:['الفوترة','BILLING'], items:[['invoices','الفواتير','Invoices','invoice'],['payments','المدفوعات','Payments','wallet']]},
  {title:['الفريق والصلاحيات','STAFF & ACCESS'], items:[['users','المستخدمون','Users','users'],['roles','الأدوار والصلاحيات','Roles & permissions','shield']]},
  {title:['العيادة','CLINIC'], items:[['branches','الفروع','Branches','branch'],['settings','إعدادات العيادة','Clinic settings','settings']]},
];
const pageParent = {patient:'patients',doctor:'doctors',appointment:'appointments',visit:'visits',invoice:'invoices',branch:'branches',user:'users',role:'roles'};

export function CoreLink({to, id, children, className='', ...props}) {
  const {onClick,...rest}=props;
  return <a href={routeHref(to,id)} className={className} {...rest} onClick={event=>{onClick?.(event);if(!event.defaultPrevented&&event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&rest.target!=='_blank'){event.preventDefault();navigate(to,id);}}}>{children}</a>;
}
function NavLink({item, close}) {
  const {route, tr, branchId, clinicId} = useCore();
  const [page, ar, en, icon] = item;
  const active = (pageParent[route.page] || route.page) === page;
  const count = page === 'appointments' ? model.appointments.filter(a => a.clinicId === clinicId && (!branchId || a.branchId === branchId) && a.date === demoDate).length : null;
  return <CoreLink to={page} className={`nav-item ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} onClick={close}><Icon name={icon}/><span>{tr(ar,en)}</span>{count != null && <small>{count}</small>}</CoreLink>;
}
function SearchDialog({close}) {
  const {clinicId, tr} = useCore();
  const [query,setQuery] = useState('');
  const panel=useRef(null);
  useModalFocus(panel);
  const q = query.trim().toLowerCase();
  const collections = [['patients','patient'],['doctors','doctor'],['appointments','appointment'],['invoices','invoice']];
  const results = q ? collections.flatMap(([type,page]) => model[type].filter(item => item.clinicId === clinicId && `${item.name || item.invoiceNumber || ''} ${item.id} ${item.phone || ''} ${item.mrn || ''}`.toLowerCase().includes(q)).map(item => ({...item,page}))).slice(0,10) : [];
  return <div className="scrim" onMouseDown={e => e.target === e.currentTarget && close()}><div ref={panel} className="search-dialog" role="dialog" aria-modal="true" aria-label={tr('البحث السريع','Quick search')}><div className="search-entry"><Icon name="search"/><input autoFocus aria-label={tr('البحث السريع','Quick search')} value={query} onChange={e=>setQuery(e.target.value)} placeholder={tr('ابحث باسم أو رقم ملف أو موعد أو فاتورة…','Search name, MRN, appointment or invoice…')}/><button className="icon-button" onClick={close} aria-label={tr('إغلاق','Close')}><Icon name="close"/></button></div><div className="search-results">{results.length ? results.map(item => <CoreLink key={`${item.page}-${item.id}`} to={item.page} id={item.id} onClick={close} className="search-result"><span className="search-result-icon"><Icon name={item.page === 'patient' ? 'users' : item.page === 'doctor' ? 'doctor' : item.page === 'appointment' ? 'calendar' : 'invoice'}/></span><span><strong>{item.name || item.invoiceNumber || item.id}</strong><small dir="ltr">{item.id}</small></span></CoreLink>) : <Empty compact title={q ? tr('لا توجد نتائج','No results') : tr('ابدأ الكتابة للبحث','Start typing to search')}/>}</div></div></div>;
}

function Shell() {
  const core = useCore();
  const {clinicId,setClinicId,branchId,setBranchId,lang,setLang,route,drawer,setDrawer,tr,clinicProfile,ownerProfile,message,setActorId} = core;
  const [menuOpen,setMenuOpen] = useState(false);
  const [searchOpen,setSearchOpen] = useState(false);
  const clinic = clinicProfile;
  const branches = model.branches.filter(b=>b.clinicId===clinicId);
  useEffect(()=>{setMenuOpen(false);setSearchOpen(false);setDrawer(null);},[route.page,route.id,setDrawer]);
  useEffect(()=>{const onKey=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setSearchOpen(true);}if(e.key==='Escape'){setSearchOpen(false);setMenuOpen(false);setDrawer(null);}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[setDrawer]);
  const pageTitle = nav.flatMap(group=>group.items).find(item=>item[0]===(pageParent[route.page]||route.page));
  const isUpload = route.page === 'upload';
  if (['login','register-clinic'].includes(route.page)) return <EntryPage key={route.page}/>;
  if (route.page === 'onboarding') return <><OnboardingPage/>{drawer&&<PreviewDrawer/>}</>;
  if (isUpload) return <UploadPage/>;
  return <div className="app-shell"><a className="skip-link" href="#main">{tr('انتقل إلى المحتوى','Skip to content')}</a><aside className={`sidebar ${menuOpen?'open':''}`} aria-label={tr('التنقل الرئيسي','Main navigation')}>
    <CoreLink to="dashboard" className="brand" onClick={()=>setMenuOpen(false)}><span className="brand-mark"><Icon name="plus"/></span><span><strong>mediClinic</strong><small>{tr('مساحة العمل الطبية','CLINIC WORKSPACE')}</small></span></CoreLink>
    <div className="workspace-card"><span className="workspace-symbol"><Icon name="building"/></span><div><strong>{clinic?.name}</strong><small>{tr('مساحة العيادة','Clinic workspace')}</small></div><Icon name="down"/></div>
    <nav className="nav-list">{nav.map(group=><div className="nav-section" key={group.title[1]}><p>{tr(...group.title)}</p>{group.items.map(item=><NavLink key={item[0]} item={item} close={()=>setMenuOpen(false)}/>)}</div>)}</nav>
    <div className="sidebar-footer"><span className="avatar">{ownerProfile.name.slice(0,1)}</span><span><strong>{ownerProfile.name}</strong><small>{tr('مالك العيادة','Clinic Owner')} · {tr('عرض تجريبي','Demo')}</small></span><CoreLink to="login" className="exit-demo" aria-label={tr('العودة إلى تسجيل الدخول','Return to sign in')} title={tr('العودة إلى تسجيل الدخول','Return to sign in')}><Icon name="lock"/></CoreLink></div>
  </aside><button className={`mobile-overlay ${menuOpen?'show':''}`} onClick={()=>setMenuOpen(false)} aria-label={tr('إغلاق القائمة','Close menu')}/>
  <div className="work-area"><header className="topbar"><div className="topbar-start"><button className="icon-button menu-trigger" onClick={()=>setMenuOpen(v=>!v)} aria-label={tr('فتح القائمة','Open menu')} aria-expanded={menuOpen}><Icon name="menu"/></button><div className="topbar-location"><span>{tr('مساحة العمل','Workspace')}</span><Icon name="chevron"/><strong>{pageTitle?tr(pageTitle[1],pageTitle[2]):tr('التفاصيل','Details')}</strong></div></div><div className="topbar-end"><button className="search-trigger" onClick={()=>setSearchOpen(true)}><Icon name="search"/><span>{tr('بحث سريع','Quick search')}</span><kbd>⌘ K</kbd></button><button className="language-switch" onClick={()=>setLang(lang==='ar'?'en':'ar')} aria-label={tr('تغيير اللغة إلى الإنجليزية','Switch language to Arabic')}>{lang==='ar'?'EN':'عربي'}</button><span className="top-avatar">أ</span></div></header>
    <div className="scopebar"><div className="scope-inner"><label><span>{tr('العيادة','Clinic')}</span><select aria-label={tr('العيادة','Clinic')} value={clinicId} onChange={e=>{setClinicId(e.target.value);setActorId(repository.getAll('users').find(user=>user.clinicId===e.target.value)?.id||null);setBranchId('');navigate('dashboard');}}>{model.clinics.map(c=><option key={c.id} value={c.id}>{c.id===clinicId?clinic.name:c.name}</option>)}</select></label><span className="scope-divider"/><label><span>{tr('الفرع','Branch')}</span><select aria-label={tr('الفرع','Branch')} value={branchId} onChange={e=>setBranchId(e.target.value)}><option value="">{tr('كل الفروع','All branches')}</option>{branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></label><span className="demo-pill"><span/> {tr('بيانات تجريبية','Demo data')} · {demoDate}</span></div></div>
    <main id="main" tabIndex={-1} className="page-content">{route.page === 'dashboard' ? <Dashboard/> : ['patient','doctor','appointment','visit','invoice','branch','user','role'].includes(route.page) ? <DetailPage key={`${route.page}-${route.id}-${clinicId}`}/> : ['patients','doctors','appointments','visits','services','invoices','payments','branches','users','roles','settings'].includes(route.page) ? <ListPage key={`${route.page}-${clinicId}`}/> : <div className="surface"><Empty title={tr('الصفحة غير متاحة','Page unavailable')} text={tr('اختر صفحة من القائمة الرئيسية.','Choose a page from the navigation.')}/></div>}</main>
  </div>{searchOpen && <SearchDialog close={()=>setSearchOpen(false)}/>} {drawer && <PreviewDrawer/>}{message&&<div className="app-message" role="status">{message}</div>}</div>;
}

export default function App() {
  const data=useSyncExternalStore(repository.subscribe,repository.getSnapshot);
  const [route,setRoute] = useState(readRoute);
  const [clinicId,setClinicId] = useState(()=>{const saved=localStorage.getItem('mediclinic.clinic');return repository.getById('clinics',saved)?saved:'CL-001';});
  const [branchId,setBranchId] = useState('');
  const [lang,setLang] = useState(()=>localStorage.getItem('mediclinic.lang') || 'ar');
  const [drawer,setDrawer] = useState(null);
  const [registration,setRegistration] = useState(null);
  const [uploadPreview,setUploadPreview] = useState(null);
  const [actorId,setActorId]=useState(()=>repository.getAll('users').find(user=>user.clinicId===clinicId)?.id||'U-001');
  const [message,notify]=useState('');
  useEffect(()=>{if(message){const timer=setTimeout(()=>notify(''),5000);return()=>clearTimeout(timer);}},[message]);
  const tr = (ar,en)=>lang==='ar'?ar:en;
  useEffect(()=>{const update=()=>{setRoute(readRoute());window.scrollTo(0,0);};window.addEventListener('hashchange',update);window.addEventListener('popstate',update);return()=>{window.removeEventListener('hashchange',update);window.removeEventListener('popstate',update);};},[]);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('mediclinic.lang',lang);},[lang]);
  useEffect(()=>{localStorage.setItem('mediclinic.clinic',clinicId);},[clinicId]);
  useEffect(()=>{document.title=`${tr('نظام العيادة','Clinic workspace')} | mediClinic`;},[lang,route]);
  const clinicProfile=record('clinics',clinicId);
  const ownerProfile={name:repository.getById('users',actorId)?.fullName||tr('أحمد محمد','Ahmed Mohamed')};
  const value=useMemo(()=>({route,clinicId,setClinicId,branchId,setBranchId,lang,setLang,drawer,setDrawer,tr,registration,setRegistration,clinicProfile,ownerProfile,uploadPreview,setUploadPreview,data,repository,actorId,setActorId,message,notify}),[route,clinicId,branchId,lang,drawer,registration,uploadPreview,data,actorId,message]);
  return <Core.Provider value={value}><Shell/></Core.Provider>;
}
