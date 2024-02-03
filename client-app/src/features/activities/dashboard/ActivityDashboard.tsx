import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";

import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";


function ActivityDashboard() {
    const { activityStore } = useStore();
    return (
        <div className="grid grid-flow-row grid-cols-7 gap-4">
            <div className="col-span-4 space-y-2">
                <ActivityList />
            </div>
            <div className="col-span-3 space-y-4">
                <div className="p-4 bg-white border border-border rounded-lg">
                    <ActivityForm />
                </div>
                {activityStore.selectedActivity && <ActivityDetails />}
            </div>
        </div>
    )
}

const ActivityDashboardOb = observer(ActivityDashboard)
export default ActivityDashboardOb