import './globals.css';
import Header from './header';
import Footer from './footer';
import {links} from '../lib/catalog.mjs';
export const metadata={metadataBase:new URL('https://samsahotra.com'),title:'Sam Sahotra | Official Artist Website',description:'Explore the music of Sam Sahotra, Punjabi singer and gospel artist. Listen to the latest releases and discover official music videos.',alternates:{canonical:'/'},openGraph:{title:'Sam Sahotra | Official Artist Website',description:'Music. Faith. Connection.',url:'/',type:'website'},icons:{icon:'/brand/sam-sahotra-logo.png'}};
export default function RootLayout({children}) {const schema={'@context':'https://schema.org','@type':'Person',name:'Sam Sahotra',alternateName:'Samson John',jobTitle:'Recording artist',email:'sam@samsahotra.com',image:'https://samsahotra.com/brand/sam-sahotra-logo.png',url:'https://samsahotra.com',sameAs:[links.apple,links.youtube,links.instagram,links.facebook,links.soundcloud,links.tiktok]};return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><Header/>{children}<Footer/></body></html>}
