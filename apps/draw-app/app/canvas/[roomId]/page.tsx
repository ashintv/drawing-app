import {RoomCanvas } from "@/components/RoomCanvas"


export default  async function CanvasServer({
        params
}:{
      params:Promise<{roomId:string}>

}) {
        
        const  roomId  =(await params).roomId
        return (
               <RoomCanvas roomId ={roomId}></RoomCanvas>
        )
}