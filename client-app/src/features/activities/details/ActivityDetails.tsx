import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/app/stores/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import ActivityForm from '../form/ActivityForm'


function ActivityDetails() {
    const { activityStore } = useStore()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { selectedActivity: activity, deleteActivity } = activityStore


    useEffect(() => {
        if (id) activityStore.loadActivity(id)
    }, [activityStore, id])

    const handleEventCancel = async (id: string) => {
        try {
            await deleteActivity(id)
            navigate('/activities')
        }
        catch (error) {
            console.log(error)
        }
    }

    if (!activity) return null
    return (
        <div className='flex items-start gap-6'>
            <Card className='w-full'>
                <CardHeader>
                    <img src={`/categoryImages/${activity.category}.jpg`} alt="user" className="h-full w-full rounded-xl mb-4" />
                    <CardTitle>{activity.title}</CardTitle>
                    <CardDescription>{new Date(activity.date).toDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{activity.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <div>
                        <p>{activity.venue}</p>
                        <p className="text-sm text-muted-foreground">{activity.city}</p>
                    </div>
                    <Button variant="destructive" onClick={() => handleEventCancel(activity.id)}>Cancel</Button>
                </CardFooter>
            </Card>
            <div className='w-full'>
                <ActivityForm key='edit' />
            </div>
        </div>
    )
}

const ActivityDetailsOb = observer(ActivityDetails)
export default ActivityDetailsOb