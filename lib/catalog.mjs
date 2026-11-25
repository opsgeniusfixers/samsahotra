const amazon = 'https://m.media-amazon.com/images/I/';
const suffix = '._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg';
export const links = {
 apple:'https://music.apple.com/us/artist/sam-sahotra/376765720', itunes:'https://itunes.apple.com/us/artist/sam-sahotra/id376765720', spotify:'https://open.spotify.com/search/Sam%20Sahotra', youtube:'https://www.youtube.com/@samsahotra', instagram:'https://www.instagram.com/samsahotra/', facebook:'https://www.facebook.com/samsahotramusik/', tiktok:'https://www.tiktok.com/@realsamsahotra', soundcloud:'https://soundcloud.com/samsahotra'
};
const items = [
 ['tu-mera-dil','Tu Mera Dil',2026,'Single','6780648241','51YOICw1%2B0L'],
 ['yesu-aya-hai','Yesu Aya Hai',2025,'Single','1860724692','61oDpsesmPL'],
 ['khuda-de-per-de-haithan','Khuda De Per De Haithan',2025,'Single','1855386194','41OLJZ5jyUL'],
 ['ishq','Ishq',2025,'Single','1794858736','51lpSxMe9kL'],
 ['tayyar-ho-jao','Tayyar Ho Jao',2024,'Single','1770302914','51sfx1q%2BxmL'],
 ['the-light','The Light',2023,'Album','1721545110','41CfCLoMXML'],
 ['naukar','Naukar',2023,'Single','1688793190','51p8QCqz%2BSL'],
 ['yaar','Yaar',2023,'Single','1671446780','51xKZFS5MqL'],
 ['7-psalms','7 Psalms',2013,'Album','701064663','51U84Wg4w6L']
];
export const releases = items.map(([slug,title,year,kind,id,image])=>({slug,title,year,kind,id,cover:amazon+image+suffix,href:'https://music.apple.com/us/album/'+id}));
export const videos = [{title:'Ishq',slug:'ishq',url:links.youtube+'/search?query=Ishq'},{title:'Yesu Aya Hai',slug:'yesu-aya-hai',url:links.youtube+'/search?query=Yesu%20Aya%20Hai'},{title:'Christmas De Tappe',slug:'the-light',url:'https://www.youtube.com/watch?v=EB3jtJXoygY'}];
