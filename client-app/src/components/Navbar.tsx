import { UserGroupIcon } from "@heroicons/react/24/solid"

import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useStore } from "@/app/stores/store"


function Navbar() {
    const { activityStore } = useStore()

    return (
        <div className="flex items-center justify-center w-full bg-zinc-950">
            <nav className="flex w-full max-w-screen-xl py-2">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center text-zinc-50 space-x-2">
                        <UserGroupIcon className="h-6 w-6 text-zinc-50" />
                        <p>
                            Reactivities
                        </p>
                    </div>
                    <Separator orientation="vertical" className="bg-zinc-600" />
                    <a href="#" className="text-zinc-50">Activities</a>
                    <Separator orientation="vertical" className="bg-zinc-600" />
                    <Button variant={"secondary"} onClick={activityStore.cancelSelectedActivity}>Create Activity</Button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar