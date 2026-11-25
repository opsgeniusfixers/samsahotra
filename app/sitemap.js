import {releases} from '../lib/catalog.mjs';
export default function sitemap(){return ['/','/music','/videos','/about','/connect','/contact',...releases.map(r=>'/music/'+r.slug)].map(path=>({url:'https://samsahotra.com'+path,changeFrequency:path==='/'||path==='/music'?'monthly':'yearly',priority:path==='/'?1:.8}))}
