
import { prisma } from '@/lib/prisma'
import { ProfileImage } from './ProfileImageProps';
import { useState } from 'react';
import NewHaikuForm from './NewHaikuForm';


export default async function HaikuPosts() {
    const posts = await prisma.post.findMany(
        {include: {
            comments: true, // Include the comments related to each post
          },}
    );

    return(
        <div>
            {posts.map((post: any ) => {
            const content = JSON.parse(post.body).content;
            const src = post.userImage;
            const postID = post.id;

            return(
            <div key={post.id} className='flex gap-2'>
                <ProfileImage src={src}/>
                <p className='whitespace-pre-wrap'> {content}</p>
                {
                   post.comments.map((comment: any) => {
                    const commentContent = JSON.parse(comment.body);
                    const srcC = comment.userImage;

                    return(<div key={comment.id}>
                        <ProfileImage src={srcC}/>
                        
                        <p className='whitespace-pre-wrap'>{commentContent}</p>
                    </div>)
                   }) 
                    }
                <NewHaikuForm 
                    buttonText='Haiku it?'
                    placeHolder='Anything to add?'
                    address='comments'
                    postID={postID} />
            </div>
            )
          })}
        </div>
    )
}