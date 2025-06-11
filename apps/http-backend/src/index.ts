import bcrypt from "bcrypt";
import express, { json } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, RoomCreateSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Auth } from "./middleware";
const app = express();
app.use(express.json());

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
                    adminId: "d7440adc-b7f7-456c-98b1-fbc1733a0546",
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

app.get("/chat/:roomId" ,async (req,res)=>{
    const roomId = Number(req.params.roomId)
    const response = await prismaClient.chat.findMany({
        where:{
            roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50,

    })

    res.json({response})
})

app.listen(3001);
