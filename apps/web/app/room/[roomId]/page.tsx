
import axios from "axios"
import { BACKEND_URL } from "../../../config"
import ChatRoom from "../../../components/chatroom"



export default async function Page({ params }: {
       params: any
} ) {
        const parseD = await params
        const  roomId  = parseD.roomId
        return (
                <ChatRoom id={roomId}/>
        )


}