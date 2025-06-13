import bcrypt from "bcrypt";
import express, { json } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, RoomCreateSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Auth } from "./middleware";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())
app.post("/signup", async (req, res) => {
    const Parse = CreateUserSchema.safeParse(req.body);
    if (Parse.error) {
        res.status(400).json({
            message: "invalid format",
            error: Parse.error,
        });
        return;
    }
    try {
        const pass = await bcrypt.hash(Parse.data.password, 5);
        await prismaClient.user.create({
            //@ts-ignore
            data: {
                email: Parse.data.email,
                password: pass,
            },
        });
    } catch (e) {
        console.error("Prisma Error:", e);
        res.status(400).json({
            message: "email already exist",
        });
        return;
    }

    res.status(200).json({
        message: "user signed successfully",
    });
});

app.post("/signin", async (req, res) => {
    const Parse = CreateUserSchema.safeParse(req.body);
    if (Parse.error) {
        res.status(400).json({
            message: "invalid format",
            error: Parse.error,
        });
        return;
    }
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: Parse.data.email,
            },
        });
        if (!user) {
            res.status(400).json({
                message: "email does not exist",
            });
        } else {
            const passCheck = await bcrypt.compare(
                Parse.data.password,
                user?.password
            );
            if (passCheck) {
                const token = jwt.sign({ id: user.id }, JWT_SECRET);
                res.status(200).json({
                    token,
                });
            } else {
                res.status(400).json({
                    message: "incorrect password",
                });
            }
        }
    } catch (e) {
        res.status(400).json({
            error: e instanceof Error ? e.message : e,
        });
    }
});
app.post("/room", Auth, async (req, res) => {
    const Parse = RoomCreateSchema.safeParse(req.body);
    if (Parse.error) {
        res.status(400).json({
            message: "invalid format",
        });
    } else {
        try {
            const room = await prismaClient.room.create({
                //@ts-ignore
                data: {
                    slug: Parse.data.name,
                    adminId: "89144d2c-91ed-4954-a41d-b50b5c8dcf0a",
                },
            });

            res.json({
                message: "room created successfully",
                roomId: room.id,
            });
        } catch (error) {
            res.status(400).json({
                error,
            });
            return;
        }
    }
});

app.get("/chats/:roomId" ,async (req,res)=>{
    const roomId = Number(req.params.roomId)
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50,

    })

    res.json({messages})
})
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})



app.listen(3001);
