import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useStore } from "@/app/stores/store";

import ActivityList from "./ActivityList";


function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore

    useEffect(() => {
        if (activityRegistry.size === 0) loadActivities()

    }, [activityStore, activityRegistry.size, loadActivities])

    return (
        <div className="grid grid-flow-row grid-cols-7 gap-4">
            <div className="col-span-4 space-y-2">
                <ActivityList />
            </div>
        </div>
    )
}

const ActivityDashboardOb = observer(ActivityDashboard)
export default ActivityDashboardOb