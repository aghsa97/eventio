import { Link } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from '@/app/types/activity'
import { Button } from '@/components/ui/button'

interface ActivityListItemProps {
    activity: Activity
}

function ActivityListItem({ activity }: ActivityListItemProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription>{new Date(activity.date).toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{activity.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p>{activity.venue}</p>
                    <p className="text-sm text-muted-foreground">{activity.city}</p>
                </div>
                <Link to={`/activities/${activity.id}`}>
                    <Button className="px-8 text-base">Edit</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ActivityListItem