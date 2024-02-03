import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/app/stores/store'


function ActivityDetails() {
    const { activityStore } = useStore()
    const { selectedActivity: activity, deleteActivity } = activityStore

    if (!activity) return null
    return (
        <Card>
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
                <Button variant="destructive" onClick={() => deleteActivity(activity.id)}>Cancel</Button>
            </CardFooter>
        </Card>
    )
}

export default ActivityDetails