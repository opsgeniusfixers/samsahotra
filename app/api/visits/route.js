import {get,put,BlobPreconditionFailedError} from '@vercel/blob';
import {NextResponse} from 'next/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const key='website-visits-v1.json';
const cookie='ss_visit';
const allowed=new Set(['https://samsahotra.com','https://www.samsahotra.com']);
const response=(data,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex'}});
async function readCount(){const result=await get(key,{access:'private',useCache:false});if(!result)return {count:0,etag:null};if(result.statusCode!==200||!result.stream)throw Error('Counter read failed');const {count}=await new Response(result.stream).json();if(!Number.isSafeInteger(count)||count<0)throw Error('Invalid counter');return {count,etag:result.blob.etag}}
async function increment(){for(let i=0;i<6;i++){const {count,etag}=await readCount();try{await put(key,JSON.stringify({count:count+1}),{access:'private',addRandomSuffix:false,contentType:'application/json',...(etag?{allowOverwrite:true,ifMatch:etag}:{allowOverwrite:false})});return count+1}catch(e){const conflict=e instanceof BlobPreconditionFailedError||(!etag&&/already exists|overwrite|precondition/i.test(String(e?.message)));if(!conflict||i===5)throw e;await new Promise(resolve=>setTimeout(resolve,25*(i+1)))}}throw Error('Counter busy')}
export async function GET(){try{return response({count:(await readCount()).count})}catch(e){console.error('Visitor counter read failed',e?.name);return response({error:'Counter unavailable'},503)}}
export async function POST(request){const origin=request.headers.get('origin');const fetchSite=request.headers.get('sec-fetch-site');if(!allowed.has(origin)||(fetchSite&&fetchSite!=='same-origin'))return response({error:'Forbidden'},403);try{const seen=request.cookies.has(cookie);const bot=/bot|crawler|spider|headless|preview|facebookexternalhit/i.test(request.headers.get('user-agent')||'');const count=seen||bot?(await readCount()).count:await increment();const res=response({count});if(!seen&&!bot)res.cookies.set(cookie,'1',{httpOnly:true,secure:true,sameSite:'lax',path:'/'});return res}catch(e){console.error('Visitor counter write failed',e?.name);return response({error:'Counter unavailable'},503)}}
