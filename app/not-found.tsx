import { Home } from 'lucide-react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-8'>
      <div className="flex flex-row items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">404</h1>
        <div className="h-6 border border-secondary-foreground" />
        <p className="font-light text-regular">
          Not found.
        </p>
        
      </div>
      <Link className='flex flex-row gap-2' href="/">
        <p className='text-sm underline'>Return</p>
        <Home size={18}/>
      </Link>
    </div>
  )
}