
import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema } from '@repo/common/types'
import { prismaClient } from '@repo/db/client'
const app = express()
app.use(express.json())

app.post('/signup', async (req, res) => {
        console.log(req.body)
        const Parse = CreateUserSchema.parse(req.body)
        if (!Parse) {
                res.status(400).json({
                        message: 'invalid data '
                })
                return
        }
        try {
                await prismaClient.user.create({
                        //@ts-ignore
                        data: {
                                email: req.body.email,
                                password: req.body.password,
                        }
                })
        } catch (e) {
                console.error("Prisma Error:", e);
                res.status(400).json({
                        error: e instanceof Error ? e.message : e
                });
                return;
        }

        res.status(200).json({
                message: 'user signed successfully'
        })
})




app.post('/signin', (req, res) => {
        //zod validation

})
app.post('/room', (req, res) => {
        const userId = 1
        jwt.sign({
                userId
        }, JWT_SECRET)
        res.json({
                message: 'sign'
        })
})
app.listen(3001)  