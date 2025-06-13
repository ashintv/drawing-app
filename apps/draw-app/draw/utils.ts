import { metadata } from './../app/layout';
import axios from "axios";
import { Shape } from "./shapes";
import { HTTP_URL } from "@/config";

export function clearCanvas(existingShapes:Shape [] ,  canvas:HTMLCanvasElement , ctx:CanvasRenderingContext2D){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        existingShapes.map((s)=>{
                console.log(s)
                if(s.type=='rect'){
                        ctx.strokeRect(s.x ,s.y , s.width , s.height)
                }
        }) 
}       

export async function getExistingShape(roomId:string) {
        const res = await axios.get(`${HTTP_URL}/chats/${roomId}`)

        const messages  =  res.data.messages
        const shapes = messages.map( (x:{message: string})=>{
                const messageData = JSON.parse(x.message)

                return messageData.shape
        })
        return shapes
}