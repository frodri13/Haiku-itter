import { SideNav } from '@/components/SideNav'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Haiku-itter',
  description: 'Twitter inspired app that only takes Luna type Haikus as posts or comments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <AuthProvider>
    <html lang="en">
      <head>
        <title>Haiku-itter</title>
        <meta 
          name='description'
          content='This is a twitter inspired app that only accespts Haikus for posts and comments'
        />
      </head>
      <body className={inter.className}>
        <div className='container mx-auto flex items-start'>
          <SideNav />
          <div className='min-h-screen flex-grow border-x'>
            {children}
          </div>
        </div>
        </body>
    </html>
  </AuthProvider>
  )
}
