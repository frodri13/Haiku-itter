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
    <header className='sticky top-0 z-10 border-b bg-white pt-2'>
      <h1 className='mb-2 px-4 text-lg font-bold'>Home</h1>
    </header>
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

