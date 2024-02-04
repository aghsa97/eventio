import { RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import HomePage from '@/features/home/Page'
import ActivityDashboardOb from '@/features/activities/dashboard/ActivityDashboard'
import ActivityForm from '@/features/activities/form/ActivityForm'
import ActivityDetails from '@/features/activities/details/ActivityDetails'


const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboardOb /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
        ],
    },
]

export const Routes = createBrowserRouter(routes)