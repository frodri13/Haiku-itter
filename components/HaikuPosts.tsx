import { prisma } from '@/lib/prisma'

export default async function HaikuPosts() {
    const posts = await prisma.post.findMany();

    return(
        <div>
            {posts.map((post: any ) => {
            const content = JSON.parse(post.body).content;

            return(<p className='whitespace-pre-wrap' key={post.id}> {content}</p>)
          })}
        </div>
    )
}