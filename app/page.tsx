import HaikuPosts from '@/components/HaikuPosts'
import NewHaikuForm from '@/components/NewHaikuForm'

export default async function Home() {
  return (
    <main>
    <header className='sticky top-0 z-10 border-b bg-white pt-2'>
      <h1 className='mb-2 px-4 text-lg font-bold'>Home</h1>
    </header>
    <NewHaikuForm 
      buttonText='Haiku That Post!'
      placeHolder='What are you thinking?'
      address='content' />

    <HaikuPosts />
  
  </main>
  )
}

