import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'


import Navbar from '@/components/Navbar'

import ActivityDashboard from '@/features/activities/dashboard/ActivityDashboard'
import { Activity } from '../types/activity'
import agent from '../api/agent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await agent.Activities.list()
        setActivities(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchActivities().then(() => setIsLoading(false))
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(act => act.id === id) || null)
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(null)
  }

  function handleCreateUpdateActivity(activity: Activity) {
    setIsSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(act => act.id !== activity.id), activity
        ])
        setSelectedActivity(activity)
        setIsSubmitting(false)
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setIsSubmitting(false)
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setIsSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(act => act.id !== id)])
      setSelectedActivity(null)
      setIsSubmitting(false)
    })
  }

  return (
    <div className='h-screen flex flex-col'>
      <Navbar handleCancelSelectActivity={handleCancelSelectActivity} />
      <div className='w-full max-w-screen-xl mx-auto flex-1 pt-16'>
        <ActivityDashboard activities={activities}
          handleCreateUpdateActivity={handleCreateUpdateActivity}
          handleDeleteActivity={handleDeleteActivity}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default App
