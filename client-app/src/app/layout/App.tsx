import { Outlet } from 'react-router-dom'

import Navbar from '@/components/Navbar'

function App() {

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='w-full max-w-screen-xl mx-auto flex-1 pt-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
