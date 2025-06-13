
import { InitDraw } from "@/draw"
import { useEffect, useRef } from "react"

export function Canvas({ roomId , socket }: { roomId: string , socket:WebSocket }) {
        const canRef = useRef<HTMLCanvasElement>(null)
        useEffect(() => {
                if (canRef.current) {
                        const canvas = canRef.current
                        InitDraw(canvas, roomId , socket)


                }
        }, [canRef])
        return (

                <div>
                        <canvas height={600} width={600} ref={canRef} className="outline-1" >

                        </canvas>
                        <div className="text-red-500 absolute bottom-0 right-0 m-20 ">
                                <div className="hover:text-green-400 hover:cursor-pointer">Rectange</div>
                                <div className="hover:text-green-400 hover:cursor-pointer">Circle </div>

                        </div>

                </div>
        )

}