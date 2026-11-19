import {defineConfig} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  base:'./',
  build:{rollupOptions:{input:Object.fromEntries(fs.readdirSync(root).filter(f=>f.endsWith('.html')).map(f=>[f.replace(/\.html$/,''),path.join(root,f)]))}},
});
