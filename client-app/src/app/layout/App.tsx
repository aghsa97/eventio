import { useEffect, useState } from 'react'
import axios from 'axios'
// import {v4 as uuid} from 'uuid'

import Navbar from '@/components/Navbar'

import { Activity } from '../types/activity'
import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(act => act.id === id) || null)
  }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <div className='w-full max-w-screen-xl mx-auto flex-1 pt-16'>
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
        />
      </div>
    </div>
  )
}

export default App
