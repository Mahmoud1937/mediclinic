import {defineConfig} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  base:'./',
  plugins:[{
    name:'static-entry-routes',
    writeBundle(options){
      const output=path.resolve(root,options.dir||'dist');
      const html=fs.readFileSync(path.join(output,'index.html'),'utf8').replaceAll('./assets/','../assets/');
      for(const route of ['register-clinic','onboarding']){
        const target=path.join(output,route);
        fs.mkdirSync(target,{recursive:true});
        fs.writeFileSync(path.join(target,'index.html'),html);
      }
    },
  }],
  build:{rollupOptions:{input:Object.fromEntries(fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>[f.replace(/\.html$/,''),path.join(root,f)]))}},
});
