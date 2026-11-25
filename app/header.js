'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {links} from '../lib/catalog.mjs';
const routes=[['/','Home'],['/music','Music'],['/videos','Videos'],['/about','Biography'],['/connect','Connect'],['/contact','Contact']];
export default function Header(){const pathname=usePathname();return <><a className="skip" href="#main-content">Skip to content</a><header className="header"><div className="shell nav"><Link href="/" className="logo" aria-label="Sam Sahotra home"><img src="/brand/sam-sahotra-logo.png" alt="Sam Sahotra official logo" width={791} height={558}/></Link><nav aria-label="Main navigation">{routes.map(([url,label])=>{const active=url==='/'?pathname==='/':pathname===url||pathname.startsWith(url+'/');return <Link key={url} href={url} aria-current={active?'page':undefined}>{label}</Link>})}</nav><a className="navlisten" href={links.apple} target="_blank" rel="noopener noreferrer">Listen now ↗</a></div><div className="scroll-progress" aria-hidden="true"/></header></>}
