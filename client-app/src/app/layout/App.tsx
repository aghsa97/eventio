import { Outlet } from 'react-router-dom'
import { Toaster } from "sonner"

import Navbar from '@/components/Navbar'

function App() {

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='w-full max-w-screen-xl mx-auto flex-1 pt-16'>
        <Outlet />
      </div>
      <Toaster position='bottom-right' richColors />
    </div>
  )
}

export default App
