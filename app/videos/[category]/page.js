import {notFound} from 'next/navigation';
import {VideoCategory} from '../page';
export const dynamicParams=false;
export function generateStaticParams(){return [{category:'commercial'},{category:'gospel'}]}
export async function generateMetadata({params}){const {category}=await params;if(!['commercial','gospel'].includes(category))return {};const title=(category==='commercial'?'Commercial Music Videos':'Gospel Music Videos')+' | Sam Sahotra';const description=category==='commercial'?'Watch Punjabi and commercial music videos by Sam Sahotra.':'Watch Christian gospel songs, Masihi Geet and Christmas music videos by Sam Sahotra.';return {title,description,alternates:{canonical:'/videos/'+category},openGraph:{title,description,url:'/videos/'+category,type:'website'}}}
export default async function Category({params}){const {category}=await params;if(!['commercial','gospel'].includes(category))notFound();return <VideoCategory filter={category}/>}
