import { prisma } from '@/lib/prisma'
import { ProfileImage } from './ProfileImageProps';
import { useState } from 'react';
import NewHaikuForm from './NewHaikuForm';
import { getAllHaikus } from '@/lib/api';

export default async function HaikuPosts() {
    const posts = await prisma.post.findMany(
        {include: {
            comments: true, // Include the comments related to each post
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
    );

    return(
        <div>
            {posts.map((post: any ) => {
            const content = JSON.parse(post.body);
            const src = post.userImage;
            const postID = post.id;
           console.log(JSON.parse(post.body).content)

            return(
            <div key={post.id}>
                <div className='flex px-10 flex-col'>
                    <div className='flex space-x-10 py-5'>
                         <ProfileImage src={src}/>
                         <p className='whitespace-pre-wrap'>{content}</p>

                    </div>
               
                {
                   post.comments.map((comment: any) => {
                    const commentContent = JSON.parse(comment.body);
                    const srcC = comment.userImage;

                    // flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800

                    return(<div key={comment.id} className='flex flex-row items-center px-20 py-5 space-x-10'>
                        <ProfileImage src={srcC}/>
                        
                        <p className='whitespace-pre-wrap'>{commentContent}</p>
                    </div>)
                   }) 
                    }
                </div>
                 <div className='px-40'>
                    <NewHaikuForm 
                    buttonText='Haiku it?'
                    placeHolder='Anything to add?'
                    address='comments'
                    postID={postID} />
                 </div>
             
            </div>
            )
          })}
        </div>
    )
}