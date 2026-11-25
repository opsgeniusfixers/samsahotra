import Link from 'next/link';
import BrandLinks from './brand-links';
import {Artwork} from './release-library';
import {catalog,links} from '../lib/site-catalog.mjs';
const external={target:'_blank',rel:'noopener noreferrer'};
function Arrow(){return <span aria-hidden="true">↗</span>}
export default function Home(){const latest=catalog[0];return <main id="main-content">
<section className="hero" aria-labelledby="hero-title">
<div className="hero-backdrop" aria-hidden="true"><img src={latest.cover} alt="" fetchPriority="low"/><div className="hero-mesh"/></div>
<div className="shell hero-inner">
<div className="hero-copy"><div className="eyebrow hero-eyebrow"><i/> OFFICIAL ARTIST WEBSITE</div><h1 id="hero-title">Sam<br/><em>Sahotra<span>.</span></em></h1><p className="hero-tagline">Music from the heart.</p><p className="hero-description">Pakistani-American Punjabi singer and Christian gospel artist. Explore the music of Sam Sahotra (real name Samson John).</p>
<div className="actions"><a className="button primary" href={latest.href} {...external}><span className="play-mini" aria-hidden="true">▶</span> Listen to the latest <Arrow/></a><a className="button secondary" href="/videos">Watch music videos <span aria-hidden="true">↗</span></a></div>
<div className="hero-social"><p className="micro-label">FOLLOW THE JOURNEY</p><BrandLinks/></div></div>
<div className="hero-feature"><div className="release-kicker"><span className="equalizer" aria-hidden="true">{[0,1,2,3,4].map(i=><b key={i} style={{'--i':i}}/>)}</span> LATEST RELEASE <span className="release-year">2026</span></div>
<div className="record-stage"><div className="record-orbit orbit-one" aria-hidden="true"/><div className="record-orbit orbit-two" aria-hidden="true"/><div className="vinyl" aria-hidden="true"><div className="vinyl-label"><i/></div></div><a className="hero-cover" href={latest.href} aria-label="Listen to Tu Mera Dil on Apple Music" {...external}><Artwork release={latest} eager/><span className="cover-action" aria-hidden="true">▶</span></a></div>
<div className="feature-caption"><div><div className="micro-label">OUT NOW / SINGLE</div><h2>Tu Mera Dil</h2><p>Sam Sahotra × Akash Pervaiz</p></div><a className="round" aria-label="Listen to Tu Mera Dil" href={latest.href} {...external}><Arrow/></a></div></div>
</div><div className="shell hero-bottom"><a href="/music"><span className="scroll-indicator" aria-hidden="true">↓</span> EXPLORE THE MUSIC</a><span>LAHORE ROOTS <i/> VIRGINIA, USA</span></div>
</section>
<section className="platform-band" aria-label="Streaming platforms"><div className="shell platforms"><div className="platform-heading"><p className="micro-label">YOUR MUSIC. YOUR WAY.</p><strong>Listen everywhere.</strong></div><BrandLinks items={['spotify','apple','itunes','youtube','soundcloud']} variant="stream" label="Music streaming platforms"/></div></section>
<section id="music" className="shell section home-music"><div className="heading reveal"><div><div className="eyebrow">EXPLORE THE MUSIC</div><h2>Featured <em>releases.</em></h2><p>Discover the latest songs from Sam Sahotra.</p></div><Link className="text-link" href="/music">View all music <Arrow/></Link></div><div className="release-grid">{catalog.slice(0,3).map((r,i)=><a className="release" href={'/music/'+r.slug} key={r.slug} style={{'--order':i}}><div className="release-art"><Artwork release={r}/><span className="release-type">{r.kind}</span><span className="card-play" aria-hidden="true">▶</span></div><div className="release-info"><div><h3>{r.title}</h3><p>{r.year} · {r.kind}</p></div><Arrow/></div></a>)}</div></section>
<section className="home-explore"><div className="shell section"><div className="heading"><div><div className="eyebrow">DISCOVER MORE</div><h2>Beyond the <em>music.</em></h2></div></div><div className="explore-grid">{[['videos','Music videos','Watch the songs and performances.','▶'],['about','Biography','Explore the artist’s journey, faith and purpose.','✦'],['connect','Connect','Follow the latest updates and social profiles.','↗'],['contact','Contact','Bookings, collaborations and media inquiries.','✉']].map(([slug,title,description,icon])=><Link id={slug} key={slug} href={'/'+slug} className="explore-card"><span className="explore-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{description}</p></div><Arrow/></Link>)}</div></div></section>
</main>}
