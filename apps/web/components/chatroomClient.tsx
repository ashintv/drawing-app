'use client'
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"

export default function ChatRoomClient({ messages, id }: {
        messages: { message: string }[]
        id: string
}) {
        const [chats, setChats] = useState(messages)
        const [currentMessage, setCurrentMessage] = useState("")
        const { socket, loading } = useSocket();
        
        useEffect(() => {
                if (socket && !loading) {
                        socket.onmessage = (event) => {
                                alert('recieved')
                                const ParsedData = JSON.parse(event.data)
                                if (ParsedData.type === 'chat') {
                                        setChats(c => [...c, { message: ParsedData.message }])
                                }
                        }
                
                }

        }, [ socket, loading ])
        useEffect(() => {
                console.log(socket)
                if (socket && !loading) {
                        socket.send(JSON.stringify({
                                type: 'join_room',
                                roomId: id
                        }))
                }
        }, [socket, id ])


        return (
                <div>
                        {chats.map((m, index) => <div key={index}>{m.message}</div>)}

                        
                        <input type="text" name="" id="" onChange={(e) => {
                                setCurrentMessage(e.target.value)
                        }} />


                        <button onClick={
                                async() => {
                                        await socket?.send(JSON.stringify({
                                                type: 'chat',
                                                message: currentMessage,
                                                roomId: parseInt(id)
                                        }))
                                        setCurrentMessage(" ")

                                }
                        }>Send</button>
                </div>
        )
} 