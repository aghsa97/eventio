import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useStore } from "@/app/stores/store";

import ActivityList from "./ActivityList";
import { Calendar } from "@/components/ui/calendar";
import { FilterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";


function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore

    useEffect(() => {
        if (activityRegistry.size === 0) loadActivities()

    }, [activityStore, activityRegistry.size, loadActivities])

    return (
        <div className="grid grid-flow-row grid-cols-6 gap-4">
            <div className="flex flex-col col-span-1 gap-4">
                <div className="bg-white rounded-md p-4">
                    <div className="flex items-center gap-2">
                        <FilterIcon className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">Filters</h2>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex flex-col space-y-2">
                        <div className="hover:bg-muted p-2 rounded-md cursor-pointer">
                            <label className="text-sm font-semibold cursor-pointer">I'm Going</label>
                        </div>
                        <Separator />
                        <div className="hover:bg-muted p-2 rounded-md cursor-pointer">
                            <label className="text-sm font-semibold cursor-pointer">I'm Hosting</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 space-y-2">
                <ActivityList />
            </div>
            <div className="col-span-1">
                <div className="bg-white w-full">
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

const ActivityDashboardOb = observer(ActivityDashboard)
export default ActivityDashboardOb