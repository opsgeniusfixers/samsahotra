import {siYoutube,siInstagram,siFacebook,siSpotify,siApplemusic,siApple,siTiktok,siSoundcloud} from 'simple-icons';
import {links} from '../lib/catalog.mjs';
const brands={
 youtube:{name:'YouTube',handle:'@samsahotra',action:'Subscribe',icon:siYoutube,url:links.youtube},
 instagram:{name:'Instagram',handle:'@samsahotra',action:'Follow',icon:siInstagram,url:links.instagram},
 facebook:{name:'Facebook',handle:'@samsahotramusik',action:'Follow',icon:siFacebook,url:links.facebook},
 tiktok:{name:'TikTok',handle:'Find Sam Sahotra',action:'Search',icon:siTiktok,url:links.tiktok},
 soundcloud:{name:'SoundCloud',handle:'@samsahotra',action:'Listen',icon:siSoundcloud,url:links.soundcloud},
 spotify:{name:'Spotify',handle:'Sam Sahotra',action:'Listen',icon:siSpotify,url:links.spotify},
 apple:{name:'Apple Music',handle:'Sam Sahotra',action:'Listen',icon:siApplemusic,url:links.apple},
 itunes:{name:'iTunes',handle:'Sam Sahotra',action:'Explore',icon:siApple,url:links.itunes}
};
export default function BrandLinks({items=['youtube','instagram','facebook','tiktok','soundcloud'],variant='compact',label='Follow Sam Sahotra'}) {
 return <div className={'brand-links brand-links--'+variant} aria-label={label}>{items.map(key=>{const b=brands[key];return <a key={key} className={'brand-link brand-'+key} href={b.url} target="_blank" rel="noopener noreferrer" aria-label={b.action+' on '+b.name+' — '+b.handle}><span className="brand-mark"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={b.icon.path}/></svg></span><span className="brand-copy"><strong>{b.name}</strong><small>{b.handle}</small></span>{variant==='cards'&&<span className="brand-arrow" aria-hidden="true">↗</span>}</a>})}</div>
}
