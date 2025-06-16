'use client'
import { Background } from "@/components/bacground"
import { Card } from "@/components/card"
import Profile from "@/components/profile"
import { RoomCard } from "@/components/roomcard"
import { ProfileIcon } from "@/icons/profileIcon"

import { useRouter } from "next/navigation"

export default function Dashboard() {
        const profile = null
        const router = useRouter()
        return (
                <Background>
                        <div className="grid grid-cols-10 outline-none fixed w-screen h-screen  p-5 gap-2 ">
                                <Card tran='lg' className="outline-none col-span-7 overflow-auto p-5">
                                       

                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                                                        <RoomCard />
                            
                                </Card>
                                <div className="outline-none col-span-3 h-full">
                                        <div className="w-full h-3/10 outline-none p-2">
                                                <Card tran="lg" className="w-full h-full p-2 items-center ">
                                                        {profile ?
                                                                <div></div> :
                                                                <div className="flex m-4">
                                                                        <ProfileIcon size="size-20"></ProfileIcon>
                                                                        <div className='ml-5 '>Name</div>
                                                                </div>
                                                        }
                                                </Card>
                                        </div>
                                        <div className="h-7/10 p-2">
                                                <Card tran="lg" className='h-full w-full p-10'>Rooms Created</Card>
                                        </div>
                                </div>

                        </div>
                </Background>
        )
}