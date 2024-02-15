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
                <div key={group} className="space-y-2">
                    <h2 className="text-sm font-semibold bg-zinc-900 text-zinc-50 border rounded-md px-6 py-3">{new Date(group).toDateString()}</h2>
                    <div className="grid gap-2">
                        {activities.map((activity) => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}

const ActivityListObserver = observer(ActivityList)
export default ActivityListObserver