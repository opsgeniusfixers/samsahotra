import {releases} from '../lib/catalog.mjs';
export default function sitemap(){return ['/','/music','/music/albums','/music/singles','/videos','/videos/commercial','/videos/gospel','/about','/connect','/contact',...releases.map(r=>'/music/'+r.slug)].map(path=>({url:'https://samsahotra.com'+path,changeFrequency:path==='/'||path==='/music'?'monthly':'yearly',priority:path==='/'?1:.8}))}
