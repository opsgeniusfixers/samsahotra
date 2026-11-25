import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {links,releases,videos} from './catalog.mjs';
export {links,videos};
export const catalog=releases.map(r=>({...r,cover:existsSync(join(process.cwd(),'public','artwork',r.slug+'.jpg'))?'/artwork/'+r.slug+'.jpg':r.cover}));
