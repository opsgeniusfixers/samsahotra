'use client';
import {useState} from 'react';
import Link from 'next/link';
export function Artwork({release,eager=false}){
 const [failed,setFailed]=useState(false);
 return <div className={release.archive?"artwork archive-artwork":"artwork"}><span className="art-fallback">{release.title}</span>{!failed&&<img src={release.cover} alt={release.title+' original release cover'} width={354} height={354} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':undefined} onError={()=>setFailed(true)}/>}</div>
}
export function ReleaseLibrary({releases}){
 const [filter,setFilter]=useState('All');
 const visible=releases.filter(r=>filter==='All'||r.kind===filter);
 return <><div className="library-toolbar"><div className="filters" role="group" aria-label="Filter releases">{[['All','All releases'],['Single','Singles'],['Album','Albums']].map(([value,label])=><button key={value} type="button" aria-pressed={filter===value} className={filter===value?'active':''} onClick={()=>setFilter(value)}>{label}</button>)}</div><span className="release-count" aria-live="polite">{visible.length} {visible.length===1?'release':'releases'}</span></div><div className="release-grid" key={filter}>{visible.map((r,i)=><Link className="release" key={r.slug} href={'/music/'+r.slug} style={{'--order':i}}><div className="release-art"><Artwork release={r}/><span className="release-type">{r.archive?"Band album":r.kind}</span><span className="card-play" aria-hidden="true">{r.archive?"↗":"▶"}</span></div><div className="release-info"><div><h3>{r.title}</h3><p>{r.year} · {r.artist||r.kind}</p></div><span className="card-arrow" aria-hidden="true">↗</span></div></Link>)}</div></>
}
