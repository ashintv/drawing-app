
import { InitDraw } from "@/draw"
import { useEffect, useRef, useState } from "react"
import { Background } from "./bacground"
import { IConButto } from "./ButtonIcon"
import { PencilIcon } from "@/icons/pencil"
import { RectIcon } from "@/icons/rect"
import { Topbar } from "./topbar"

export type Shape = 'rect' | 'circle' | 'pencil'

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
        const canRef = useRef<HTMLCanvasElement>(null)
        useEffect(() => {
                if (canRef.current) {
                        const canvas = canRef.current
                        InitDraw(canvas, roomId, socket)


                }
        }, [canRef])

        const [ selected , setSelected ] = useState<Shape>('rect')
        return (<>

                <Background>


                        <canvas ref={canRef} className="outline-1 fixed" >
                        </canvas> 
                        <Topbar selected={selected}  setSelected={setSelected} classNameAd="hover:cursor-pointer bg-white/10 rounded-2xl p-5 fixed justify-center max-w-fit backdrop-blur-sm " />

                </Background>
        </>




        )

}