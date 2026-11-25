'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import styles from './radio-player.module.css';

const profile='https://soundcloud.com/samsahotra';
const source='https://w.soundcloud.com/player/?'+new URLSearchParams({url:profile,color:'#e5bd7c',auto_play:'false',show_comments:'false',show_user:'true',show_reposts:'false',visual:'false'}).toString();

export function RadioLaunch(){return <button className="button primary" type="button" onClick={()=>window.dispatchEvent(new Event('sam-radio-open'))}><span aria-hidden="true">▶</span> Open radio player</button>}

export default function RadioPlayer(){
 const path=usePathname();
 const [open,setOpen]=useState(false),[loaded,setLoaded]=useState(false);
 const toggle=useRef(null);
 function show(){setLoaded(true);setOpen(true)}
 useEffect(()=>{const handler=()=>show();window.addEventListener('sam-radio-open',handler);return()=>window.removeEventListener('sam-radio-open',handler)},[]);
 useEffect(()=>{if(path==='/radio')show()},[path]);
 function minimize(){setOpen(false);toggle.current?.focus()}
 function stop(){setLoaded(false);minimize()}
 return <aside className={styles.dock} aria-label="Sam Sahotra Radio">
   <div id="sam-radio-panel" className={styles.panel} hidden={!open}>
    <div className={styles.heading}><div><span className="micro-label">OFFICIAL MUSIC PLAYER</span><h2>Sam Sahotra Radio</h2><p>Punjabi &amp; gospel music</p></div><button type="button" className={styles.close} onClick={minimize} aria-label="Minimize radio">−</button></div>
    {loaded&&<iframe className={styles.frame} title="Sam Sahotra songs on SoundCloud" src={source} allow="autoplay" loading="eager" />}
    <div className={styles.links}><a href={profile} target="_blank" rel="noopener noreferrer">Open SoundCloud ↗</a><button type="button" onClick={stop}>Stop &amp; close</button></div>
   </div>
   <div className={styles.bar}><button ref={toggle} className={styles.launch} type="button" aria-expanded={open} aria-controls="sam-radio-panel" onClick={open?minimize:show}><span className={styles.symbol} aria-hidden="true">♫</span><span><strong>Sam Sahotra Radio</strong><small>{open?'Minimize player':'Open music player'}</small></span><span aria-hidden="true">{open?'−':'▸'}</span></button>{path!=='/radio'&&<Link className={styles.pageLink} href="/radio" aria-label="Visit dedicated radio page">↗</Link>}</div>
 </aside>
}
