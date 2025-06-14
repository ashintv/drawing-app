
import { InitDraw } from "@/draw"
import { useEffect, useRef } from "react"
import { Background } from "./bacground"
import { IConButto } from "./ButtonIcon"
import { PencilIcon } from "@/icons/pencil"
import { RectIcon } from "@/icons/rect"

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
        const canRef = useRef<HTMLCanvasElement>(null)
        useEffect(() => {
                if (canRef.current) {
                        const canvas = canRef.current
                        InitDraw(canvas, roomId, socket)


                }
        }, [canRef])
        return (
                <Background>

                    
                                <canvas  ref={canRef} className="outline-1 fixed" >
                                </canvas>
                                <div className="text-red-500  bottom-0 right-0 m-20 fixed ">
                                        <IConButto Icon={<PencilIcon/>} />
                                        <IConButto Icon={<RectIcon/>} />

                                </div>



                </Background>




        )

}