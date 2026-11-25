import {NextResponse} from 'next/server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const topics=new Set(['Booking or live performance','Music collaboration','Media or interview','General inquiry']);
const attempts=new Map();
const reply=(status,error)=>NextResponse.json({ok:status===200,...(error?{error}:{})},{status,headers:{'Cache-Control':'no-store'}});
function permittedOrigin(request){try{const origin=new URL(request.headers.get('origin')||'');return origin.protocol==='https:'&&(['samsahotra.com','www.samsahotra.com','samsahotra.vercel.app','samsahotra-ops-2099.vercel.app'].includes(origin.hostname)||(/^samsahotra-[a-z0-9]+-ops-2099\.vercel\.app$/.test(origin.hostname)&&origin.host===request.headers.get('host')))}catch{return false}}
export async function POST(request){
 if(!permittedOrigin(request))return reply(403,'Please submit from the official website.');
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,'Invalid submission.');
 try{
 const raw=await request.text();if(raw.length>12000)return reply(413,'Message is too long.');
 const body=JSON.parse(raw);if(!body||typeof body!=='object')return reply(400,'Invalid submission.');
 const clean=(v)=>typeof v==='string'?v.trim():'';
 if(clean(body._honey))return reply(400,'Unable to submit this message.');
 const name=clean(body.name),email=clean(body.email),topic=clean(body['Inquiry type']),message=clean(body.message);
 if(!name||name.length>100||/[\r\n]/.test(name)||email.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||!topics.has(topic)||message.length<5||message.length>3000)return reply(400,'Please check all required fields.');
 const now=Date.now(),ip=(request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();
 for(const [key,v] of attempts){if(v.until<=now)attempts.delete(key)}
 const count=attempts.get(ip)||{count:0,until:now+600000};
 if(count.count>=4)return reply(429,'Too many submissions. Please try again later.');
 if(attempts.size<5000||attempts.has(ip))attempts.set(ip,{...count,count:count.count+1});
 const token=process.env.MAILTRAP_API_TOKEN;if(!token){console.error('Contact mail configuration missing');return reply(503,'Email service is temporarily unavailable.');}
 const result=await fetch('https://send.api.mailtrap.io/api/send',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({from:{email:'website@samsahotra.com',name:'Sam Sahotra Website'},to:[{email:'sam@samsahotra.com'}],reply_to:{email,name},subject:'Website inquiry: '+topic,text:'New message from SamSahotra.com\n\nName: '+name+'\nEmail: '+email+'\nInquiry: '+topic+'\n\n'+message,category:'Website contact'}),signal:AbortSignal.timeout(12000),cache:'no-store'});
 const data=await result.json().catch(()=>null);
 if(!result.ok||data?.success!==true){console.error('Contact email rejected; status',result.status);return reply(502,'Email service could not accept your message.');}
 return reply(200);
 }catch{console.error('Contact request failed');return reply(502,'Unable to process your message right now.');}
}
