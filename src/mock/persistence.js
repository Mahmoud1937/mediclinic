// Only mock domain records are persisted. No credentials or authentication state.
const key='mediclinic.domain.v1';
export const domainPersistence={
 load(){try{const value=JSON.parse(localStorage.getItem(key));return value?.version===1?value.data:null;}catch{return null;}},
 save(data){try{localStorage.setItem(key,JSON.stringify({version:1,data}));}catch{/* Session state remains usable when browser storage is full or unavailable. */}},
};
