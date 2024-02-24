import { useStore } from '@/app/stores/store'
import { observer } from 'mobx-react-lite'

function Signup() {
    const { user } = useStore().userStore
    return (
        <div>Sign-up Form {user?.displayName}</div>
    )
}

// observer
const SignupOb = observer(Signup)
export default SignupOb