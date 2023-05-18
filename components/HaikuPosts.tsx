import { prisma } from '@/lib/prisma'
import { ProfileImage } from './ProfileImageProps';


export default async function HaikuPosts() {
    const posts = await prisma.post.findMany();

    return(
        <div>
            {posts.map((post: any ) => {
            const content = JSON.parse(post.body).content;
            const src = post.userImage;

            return(
            <div key={post.id}>
                <ProfileImage src={src}/>
                <p className='whitespace-pre-wrap'> {content}</p>
            </div>
            )
          })}
        </div>
    )
}