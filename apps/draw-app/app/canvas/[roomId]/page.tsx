'use client'
import { Background } from "@/components/bacground"
import { useEffect, useRef } from "react"
const Style = ''

export default function Canvas() {
        const canRef = useRef<HTMLCanvasElement>(null)
        useEffect(() => {
                if (canRef.current) {
                        const canvas = canRef.current
                        const ctx = canvas.getContext('2d')
                        let Startx = 0
                        let Starty = 0 
                        if (!ctx) {
                                return
                        }
                        let clicked = false
                        canvas.addEventListener('mousedown', (e) => {
                                clicked = true
                                Startx = e.clientX
                                Starty = e.clientY
                                
                        })
                        canvas.addEventListener('mouseup', (e) => {
                                clicked = false
                                
                        })

                        canvas.addEventListener('mousemove' , (e)=>{
                                if(clicked){
                                        const width = e.clientX - Startx
                                        const height = e.clientY - Starty
                                        ctx.clearRect(0,0,canvas.width , canvas.height)
                                        ctx.strokeRect(Startx ,  Starty , width , height)

                                }
                        })
                }
        }, [canRef])

        return (


                <canvas color="red" height={500} width={500} ref={canRef} className="rounded-xl bg-amber-50"></canvas>




        )
}