import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity } from '@/app/types/activity'

interface Props {
    activity: Activity
}

function ActivityDetails({ activity }: Props) {
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
                <Button variant="secondary">Cancel</Button>
            </CardFooter>
        </Card>
    )
}

export default ActivityDetails