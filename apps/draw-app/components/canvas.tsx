
import { InitDraw } from "@/draw"
import { useEffect, useRef, useState } from "react"
import { Background } from "./bacground"
import { IConButto } from "./ButtonIcon"
import { PencilIcon } from "@/icons/pencil"
import { RectIcon } from "@/icons/rect"
import { Topbar } from "./topbar"
import { Game } from "@/draw/Game"

export type Tool = 'rect' | 'circle' | 'pencil'

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
        const canRef = useRef<HTMLCanvasElement>(null)
        const [game, setGame] = useState<Game>()
        const [selected, setSelected] = useState<Tool>('circle')
        useEffect(() => {
              
                game?.setTool(selected)
        }, [selected])

        useEffect(() => {
                if (canRef.current) {

                        const canvas = canRef.current
                        const game = new Game(canvas, roomId, socket)
                        // InitDraw(canvas, roomId, socket)
                        setGame(game)


                }
        }, [canRef])


        return (<>
                <Background>



                        <canvas ref={canRef} className="outline-1 fixed" >
                        </canvas>
                        <Topbar selected={selected} setSelected={setSelected} classNameAd="hover:cursor-pointer bg-white/10 rounded-2xl p-5 fixed justify-center max-w-fit backdrop-blur-sm " />

                </Background>
        </>




        )

}