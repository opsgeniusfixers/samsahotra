import {NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const topics=new Set(['Booking or live performance','Music collaboration','Media or interview','General inquiry']);
const attempts=new Map();
function permittedOrigin(request){try{const origin=new URL(request.headers.get('origin')||'');return origin.protocol==='https:'&&(['samsahotra.com','www.samsahotra.com','samsahotra.vercel.app','samsahotra-ops-2099.vercel.app'].includes(origin.hostname)||(/^samsahotra-[a-z0-9]+-ops-2099\.vercel\.app$/.test(origin.hostname)&&origin.host===request.headers.get('host')))}catch{return false}}
export async function POST(request){
 const reference=randomUUID().slice(0,8);
 const type=request.headers.get('content-type')||'';
 const native=type.startsWith('application/x-www-form-urlencoded');
 const reply=(status,error)=>{console.info('Contact submission',reference,'status',status);if(native&&status===200)return NextResponse.redirect(new URL('/contact/thank-you',request.url),303);if(native)return new Response('Unable to submit your message. '+(error||'')+' Reference: '+reference+' — please return to the contact page or email sam@samsahotra.com.',{status,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});return NextResponse.json({ok:status===200,reference,...(error?{error}:{})},{status,headers:{'Cache-Control':'no-store'}})};
 if(!permittedOrigin(request))return reply(403,'Please submit from the official website.');
 if(!native&&!type.startsWith('application/json'))return reply(415,'Invalid submission.');
 try{
 const raw=await request.text();if(raw.length>20000)return reply(413,'Message is too long.');
 let body;try{body=native?Object.fromEntries(new URLSearchParams(raw)):JSON.parse(raw)}catch{return reply(400,'Invalid submission.')}
 if(!body||typeof body!=='object')return reply(400,'Invalid submission.');
 const clean=(v)=>typeof v==='string'?v.trim():'';
 if(clean(body._honey))return reply(400,'Unable to submit this message.');
 const name=clean(body.name),email=clean(body.email),phone=clean(body.phone),topic=clean(body['Inquiry type']),message=clean(body.message);
 if(!name||name.length>100||/[\r\n]/.test(name)||email.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||phone.length>40||(phone&&!/^[0-9+().\-\s#xX]+$/.test(phone))||!topics.has(topic)||message.length<5||message.length>3000)return reply(400,'Please check all required fields and the phone number.');
 const now=Date.now(),ip=(request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')||'unknown').split(',')[0].trim();
 for(const [key,v] of attempts){if(v.until<=now)attempts.delete(key)}
 const count=attempts.get(ip)||{count:0,until:now+600000};
 if(count.count>=4)return reply(429,'Too many submissions. Please try again later.');
 if(attempts.size<5000||attempts.has(ip))attempts.set(ip,{...count,count:count.count+1});
 const token=process.env.MAILTRAP_API_TOKEN;if(!token){console.error('Contact mail configuration missing',reference);return reply(503,'Email service is temporarily unavailable.');}
 const result=await fetch('https://send.api.mailtrap.io/api/send',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({from:{email:process.env.MAILTRAP_FROM_EMAIL||'website@samsahotra.com',name:'Sam Sahotra Website'},to:[{email:'sam@samsahotra.com'}],reply_to:{email,name},subject:'Website inquiry: '+topic,text:'New message from SamSahotra.com\n\nName: '+name+'\nEmail: '+email+'\nPhone: '+(phone||'Not provided')+'\nInquiry: '+topic+'\n\n'+message+'\n\nReference: '+reference,category:'Website contact'}),signal:AbortSignal.timeout(12000),cache:'no-store'});
 const data=await result.json().catch(()=>null);
 if(!result.ok||data?.success!==true){const details=JSON.stringify(data?.errors||data?.error||'').toLowerCase();const reason=result.status===401||result.status===403?'authorization or sending permission':details.includes('domain')?'sending domain':details.includes('reply_to')?'reply-to validation':details.includes('from')?'sender validation':result.status===429?'provider rate limit':'provider rejection';console.error('Contact email rejected',reference,'status',result.status,'reason',reason);return reply(502,'Email service could not accept your message.');}
 console.info('Mailtrap accepted contact email',reference,'message IDs',Array.isArray(data.message_ids)?data.message_ids.filter(id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(id)).join(','):'not returned');
 return reply(200);
 }catch(err){console.error('Contact request failed',reference,err?.name==='TimeoutError'?'timeout':'request error');return reply(502,'Unable to process your message right now.');}
}
