import NewHaikuForm from '@/components/NewHaikuForm'
import { prisma } from '@/lib/prisma'

const getHaikus = async () => {
  const posts = await prisma.post.findMany()
  
  return posts
}

export default async function Home() {
  const posts = await getHaikus()
  // console.log(posts)

  return (
    <main>
    <h1>Hello</h1>
    <NewHaikuForm />
    <div>
          {posts.map((post: any ) => {
              const content = JSON.parse(post.body).content;

              return(<p className='whitespace-pre-wrap' key={post.id}> {content}</p>)
          })}
      </div>
  </main>
  )
}

