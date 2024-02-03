import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import Navbar from '@/components/Navbar'
import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'

import { useStore } from '../stores/store'

function App() {
  const { activityStore } = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])


  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='w-full max-w-screen-xl mx-auto flex-1 pt-16'>
        <ActivityDashboard />
      </div>
    </div>
  )
}

const AppWithObserver = observer(App)
export default AppWithObserver
