import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/app/stores/store'

import ActivityForm from '../form/ActivityForm'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'


function ActivityDetails() {
    const { activityStore } = useStore()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { selectedActivity: activity, deleteActivity } = activityStore


    useEffect(() => {
        if (id) activityStore.loadActivity(id)
    }, [activityStore, id])

    const handleEventCancel = async (id: string) => {
        try {
            await deleteActivity(id)
            navigate('/activities')
        }
        catch (error) {
            console.log(error)
        }
    }

    if (!activity) return null
    return (
        <div className='flex items-start gap-6'>
            <div className='w-full flex flex-col gap-6'>
                <Card className='w-full'>
                    <CardHeader className='p-0 relative'>
                        <img src={`/categoryImages/${activity.category}.jpg`} alt="user" className="h-full w-full rounded-t-lg mb-4 brightness-50" />
                        <div className='absolute bottom-6 left-6'>
                            <CardTitle className='text-zinc-50'>{activity.title}</CardTitle>
                            <CardDescription className='text-muted'>{new Date(activity.date).toDateString()}</CardDescription>
                        </div>
                        <Button variant="destructive" className='absolute bottom-6 right-6' onClick={() => handleEventCancel(activity.id)}>Cancel</Button>
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-start pb-6'>
                            <p className="text-sm text-muted-foreground">{activity.city}, <span>{activity.venue}</span></p>
                        </div>
                        <p>{activity.description}</p>
                    </CardContent>
                </Card>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-xl font-medium'>Chat about the event</h2>
                    <div className='bg-white p-4 border rounded-md space-y-3'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-2'>
                                <img src="https://randomuser.me/api/portraits/thumb/women/22.jpg"
                                    alt="user" className="h-12 w-12 rounded-full object-cover" />
                                <div className='flex flex-col items-start'>
                                    <p>Host Name <span className='text-muted-foreground text-sm'>• Today 2h</span></p>
                                    <p className='text-sm text-muted-foreground -mt-1'>@hostname</p>
                                </div>
                            </div>
                            <div>
                                Some Comment Here!
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground'>
                                    Replay
                                </p>
                            </div>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-2'>
                                <img src="https://randomuser.me/api/portraits/thumb/men/62.jpg"
                                    alt="user" className="h-12 w-12 rounded-full object-cover" />
                                <div className='flex flex-col items-start'>
                                    <p>Host Name <span className='text-muted-foreground text-sm'>• Today 2h</span></p>
                                    <p className='text-sm text-muted-foreground -mt-1'>@hostname</p>
                                </div>
                            </div>
                            <div>
                                Some Comment Here!
                            </div>
                            <div>
                                <p className='text-sm text-muted-foreground'>
                                    Replay
                                </p>
                            </div>
                        </div>
                        <Separator />
                        <Input placeholder='Write a comment...' />
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <ActivityForm key='edit' />
            </div>
            <div className='w-1/2'>
                <div className='w-full bg-white border rounded-md p-4 space-y-6'>
                    <h1 className='text-xl font-semibold'>Attending</h1>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <img src="https://randomuser.me/api/portraits/thumb/men/72.jpg"
                                alt="user" className="h-12 w-12 rounded-full object-cover" />
                            <div className='flex flex-col items-start'>
                                <p>Host Name</p>
                                <p className='text-sm text-muted-foreground -mt-1'>@hostname</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img src="https://randomuser.me/api/portraits/thumb/women/71.jpg"
                                alt="user" className="h-12 w-12 rounded-full object-cover" />
                            <div className='flex flex-col items-start'>
                                <p>Host Name</p>
                                <p className='text-sm text-muted-foreground -mt-1'>@hostname</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img src="https://randomuser.me/api/portraits/thumb/men/71.jpg"
                                alt="user" className="h-12 w-12 rounded-full object-cover" />
                            <div className='flex flex-col items-start'>
                                <p>Host Name</p>
                                <p className='text-sm text-muted-foreground -mt-1'>@hostname</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <img src="https://randomuser.me/api/portraits/thumb/women/72.jpg"
                                alt="user" className="h-12 w-12 rounded-full object-cover" />
                            <div className='flex flex-col items-start'>
                                <p>Host Name</p>
                                <p className='text-sm text-muted-foreground -mt-1'>@hostname</p>
                            </div>
                        </div>
                        <h2 className='text-sm text-muted-foreground hover:text-zinc-950 hover:underline cursor-pointer'>+468 Attending</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ActivityDetailsOb = observer(ActivityDetails)
export default ActivityDetailsOb