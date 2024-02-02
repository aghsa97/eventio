import { Activity } from "@/app/types/activity";

import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | null;
    selectActivity: (id: string) => void;
    isLoading: boolean;
    handleCreateUpdateActivity: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
    isSubmitting: boolean;
}

function ActivityDashboard({ activities, selectActivity, selectedActivity, isLoading, isSubmitting, handleCreateUpdateActivity, handleDeleteActivity }: Props) {
    return (
        <div className="grid grid-flow-row grid-cols-7 gap-4">
            <div className="col-span-4 space-y-2">
                <ActivityList activities={activities} selectActivity={selectActivity} isLoading={isLoading} />
            </div>
            <div className="col-span-3 space-y-4">
                <div className="p-4 bg-white border border-border rounded-lg">
                    <ActivityForm selectedActivity={selectedActivity}
                        isSubmitting={isSubmitting}
                        handleCreateUpdateActivity={handleCreateUpdateActivity} />
                </div>
                {selectedActivity && <ActivityDetails activity={selectedActivity} handleDeleteActivity={handleDeleteActivity} />}
            </div>
        </div>
    )
}

export default ActivityDashboard