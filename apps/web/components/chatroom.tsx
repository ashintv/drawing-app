

import axios from "axios"
import { BACKEND_URL } from "../config"
import ChatRoomClient from "./chatroomClient"

async function getRoomData(id: string) {

        try {
                const response = await axios.get(`${BACKEND_URL}chat/${id}/`)
                return response.data.response
        } catch (e) {
                return e
        }
}


export  default async function ChatRoom({id}:{
        id:string
}){
        const messages = await getRoomData(id)
        return (
                <ChatRoomClient messages={messages}  id={'1'}/>
        )
        

}