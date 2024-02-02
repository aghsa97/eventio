import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/app/types/activity";
import { Button } from "@/components/ui/button";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
}

function ActivityList({ activities, selectActivity }: Props) {
    return (
        <div className="grid gap-4">
            {activities.map((activity) => (
                <Card key={activity.id}>
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
                        <Button className="px-8 text-base" onClick={() => selectActivity(activity.id)}>Edit</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default ActivityList