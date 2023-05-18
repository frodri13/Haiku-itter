
import { prisma } from '@/lib/prisma'
import { ProfileImage } from './ProfileImageProps';
import { useState } from 'react';


export default async function HaikuPosts() {
    const posts = await prisma.post.findMany();

    return(
        <div>
            {posts.map((post: any ) => {
            const content = JSON.parse(post.body).content;
            const src = post.userImage;

            return(
            <div key={post.id} className='flex gap-2'>
                <ProfileImage src={src}/>
                <p className='whitespace-pre-wrap'> {content}</p>
                <textarea 
                style={{height: 0}}
                placeholder='Haiku it?'
                className='flex-grow resize-none
                overflow-hidden p-4 text-sm outline-none' />
            </div>
            )
          })}
        </div>
    )
}