import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from '@/app/types/activity'
import { Button } from '@/components/ui/button'

interface ActivityListItemProps {
    activity: Activity
}

function ActivityListItem({ activity }: ActivityListItemProps) {
    // 🐛: User Image GET a roundom pic
    const [userImage, setUserImage] = useState<string[]>([])

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=5&inc=picture&noinfo&nat=us")
            .then((res) => res.json())
            .then((data) => {
                setUserImage(data.results.map((user: { picture: { thumbnail: string } }) => user.picture.thumbnail))
            })
    }, [])

    return (
        <Card>
            <CardHeader>
                {/* User Image GET a roundom pic*/}
                <div className='flex items-start gap-4'>
                    <img src={userImage[0]}
                        alt="user"
                        className="w-12 h-12 rounded-full" />
                    <div className='flex flex-col items-start gap-'>
                        <CardTitle>{activity.title}</CardTitle>
                        <CardDescription>{activity.city}, {activity.venue}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p>{activity.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        {userImage.map((img, idx) => (
                            <img key={idx} src={img} alt="user" className="w-6 h-6 rounded-full cursor-pointer first:ml-0 -ml-4 hover:first:-ml-0 hover:scale-150 transition-all duration-150 ease-in-out" />
                        ))}
                        <span className='w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold -ml-4 cursor-pointer'>+47</span>
                    </div>
                </div>
                <Link to={`/activities/${activity.id}`}>
                    <Button className="px-8 text-base">View</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ActivityListItem