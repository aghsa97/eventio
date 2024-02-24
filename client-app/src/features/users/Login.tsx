import { useStore } from "@/app/stores/store"
import { observer } from "mobx-react-lite"

function Login() {
    const { user } = useStore().userStore
    return (
        <div>Login Form {user?.displayName}</div>
    )
}

// observer
const LoginOb = observer(Login)
export default LoginOb