import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { useStore } from "@/app/stores/store"

function HomePage() {
    const { user } = useStore().userStore
    return (
        <div>HomePage
            {user?.displayName && <h2>Welcome back {user.displayName}</h2>}
            <Link to="/login">
                <Button>Login</Button>
            </Link>
        </div>
    )
}

export default HomePage