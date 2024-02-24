import { Outlet } from 'react-router-dom'
import { Toaster } from "sonner"

import Navbar from '@/components/Navbar'
import { useStore } from '../stores/store'
import { useEffect } from 'react'

function App() {
  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded()
      })
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

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
