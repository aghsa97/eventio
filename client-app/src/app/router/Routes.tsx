import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import HomePage from '@/features/home/Page'
import ActivityDashboardOb from '@/features/activities/dashboard/ActivityDashboard'
import ActivityForm from '@/features/activities/form/ActivityForm'
import ActivityDetails from '@/features/activities/details/ActivityDetails'
import NotFound from '@/features/errors/NotFound'


const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboardOb /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ],
    },
]

export const Routes = createBrowserRouter(routes)