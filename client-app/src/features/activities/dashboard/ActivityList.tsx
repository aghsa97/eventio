import { observer } from "mobx-react-lite";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/app/stores/store";

import ActivityListItem from "./ActivityListItem";


function ActivityList() {
    const { activityStore } = useStore()
    const { groupedActivities } = activityStore
    if (activityStore.loadingInitial) return <div className="flex flex-col gap-4">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
    </div>
    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <div key={group} className="mb-8 space-y-2">
                    <h2 className="text-xl font-semibold">{new Date(group).toDateString()}</h2>
                    <div className="grid gap-4">
                        {activities.map((activity) => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            ))}
            <div className="grid gap-4">
                {activityStore.activitiesByDate.map((activity) => ( // change to activity.id later
                    <ActivityListItem key={activity.id} activity={activity} />
                ))}
            </div>
        </>
    )
}

const ActivityListObserver = observer(ActivityList)
export default ActivityListObserver