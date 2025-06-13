
'use client'
import { WS_URL } from "@/config"
import { InitDraw } from "@/draw"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "./canvas"

export function RoomCanvas({ roomId }: { roomId: string }) {

        const [socket, setSocket] = useState<WebSocket | null>(null)
        useEffect(() => {
                const ws = new WebSocket(WS_URL)
                ws.onopen = () => {
                        setSocket(ws)
                        const data = JSON.stringify({
                                type: "join_room",
                                roomId:Number(roomId)
                        })
                        ws.send(data)
                }

        }, [])


        if (!socket) {
                return (
                        <div className="w-screen h-screen flex justify-center items-center">
                                Loading.....
                        </div>
                )
        }

        return (
                <Canvas roomId={roomId} socket={socket}></Canvas>
        )

}