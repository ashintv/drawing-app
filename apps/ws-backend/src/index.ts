import WebSocket, { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

//state managemet using gloabal array (inefficient approach)
interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];

//user auth logic using jwt
function checkuser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded == "string") {
            return null;
        }
        if (!decoded || !decoded.id) {
            return null;
        }
        return decoded.id;
    } catch (error) {
        return null;
    }
}

wss.on("connection", function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    // TODO: token as a url params !!!! security vulnerability
    const Queryparams = new URLSearchParams(url.split("?")[1]);
    const token = Queryparams.get("token") || "";
    const userId = checkuser(token);
    if (userId == null) {
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms: [],
        ws,
    });

    ws.on("message",async function message(data) {
        const ParseData = JSON.parse(data.toString());

        if (ParseData.type === "join_room") {
            const user = users.find((x) => x.ws === ws);
            if (!user) {
                return;
            }
            //TODO : verify room id in db
            user.rooms.push(ParseData.roomId);
        }

        if (ParseData.type === "leave_room") {
            const user = users.find((x) => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter((x) => x != ParseData.roomId);
        }

        if (ParseData.type === "chat") {
            const message = ParseData.message;
            const roomId = ParseData.roomId;
        
            // TODO should be added to queue : efficient approach
            await prismaClient.chat.create({
                data: {
                    userId,
                    message,
                    roomId,
                },
            });

            users.forEach((x) => {
                if (x.rooms.includes(roomId)) {
                    console.log(x.userId)
                    x.ws.send(JSON.stringify(ParseData));
                }
            });
            console.log(message)
        }
    });
});
