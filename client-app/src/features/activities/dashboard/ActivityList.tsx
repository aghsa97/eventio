import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useStore } from "@/app/stores/store";


function ActivityList() {
    const { activityStore } = useStore()
    if (activityStore.loadingInitial) return <div className="flex flex-col gap-4">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
    </div>
    return (
        <div className="grid gap-4">
            {activityStore.activitiesByDate.map((activity, i) => ( // change to activity.id later
                <Card key={i}>
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
            ))}
        </div>
    )
}

const ActivityListObserver = observer(ActivityList)
export default ActivityListObserver