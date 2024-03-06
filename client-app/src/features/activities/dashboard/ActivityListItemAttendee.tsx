import { Profile } from "@/app/types/profile"
import { observer } from "mobx-react-lite"

interface IProps {
    attendees: Profile[]
}

function ActivityListItemAttendee({ attendees }: IProps) {
    return (
        <div>
            {attendees.map(attendee => (
                // make it a link to the user profile
                <div key={attendee.username}>
                    <img src={attendee.image || '/assets/user.png'} alt='user' />
                </div>
            ))}
        </div>
    )
}

const ObserverActivityListItemAttendee = observer(ActivityListItemAttendee)
export default ObserverActivityListItemAttendee