import { UserGroupIcon } from "@heroicons/react/24/solid"
import { NavLink } from "react-router-dom"

import { Separator } from "./ui/separator"
import { Button } from "./ui/button"


function Navbar() {

    return (
        <div className="flex items-center justify-center w-full bg-zinc-950">
            <nav className="flex w-full max-w-screen-xl py-2">
                <div className="flex items-center space-x-4">
                    <NavLink to={"/"} className="flex items-center justify-center text-zinc-50 space-x-2 active:text-zinc-950">
                        <UserGroupIcon className="h-6 w-6 text-zinc-50" />
                        <p>
                            Reactivities
                        </p>
                    </NavLink>
                    <Separator orientation="vertical" className="bg-zinc-600" />
                    <NavLink to={"/activities"} className="text-zinc-50">Activities</NavLink>
                    <Separator orientation="vertical" className="bg-zinc-600" />
                    <NavLink to={"/createActivity"} className="text-zinc-50">
                        <Button variant={"secondary"}>Create Activity</Button>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Navbar