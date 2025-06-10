import bcrypt from 'bcrypt'
import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema } from '@repo/common/types'
import { prismaClient } from '@repo/db/client'
const app = express()
app.use(express.json())

app.post('/signup', async (req, res) => {
        const Parse = CreateUserSchema.safeParse(req.body)
        if (Parse.error) {
                res.status(400).json({
                        message: 'invalid format',
                        error: Parse.error

                })
                return
        }
        try {
                const pass = await bcrypt.hash(Parse.data.password, 5)
                await prismaClient.user.create({
                        //@ts-ignore
                        data: {
                                email: Parse.data.email,
                                password: pass
                        }
                })
        } catch (e) {
                console.error("Prisma Error:", e);
                res.status(400).json({
                        message:'email already exist'
                });
                return;
        }

        res.status(200).json({
                message: 'user signed successfully'
        })
})




app.post('/signin', async (req, res) => {
        const Parse = CreateUserSchema.safeParse(req.body)
        if (Parse.error) {
                res.status(400).json({
                        message: 'invalid format',
                        error: Parse.error
                })
                return
        }
        try {
                const user = await prismaClient.user.findFirst({
                        where: {
                                email: Parse.data.email
                        }
                })
                if (!user) {
                        res.status(400).json({
                                message: 'email does not exist'
                        })
                }
                else {
                        const passCheck = await bcrypt.compare(Parse.data.password, user?.password)
                        if (passCheck) {
                                const token = jwt.sign({ id: user.id }, JWT_SECRET)
                                res.status(200).json({
                                        token
                                })
                        } else {
                                res.status(400).json({
                                        message: 'incorrect password'
                                })
                        }

                }

        } catch (e) {
                res.status(400).json({
                        error: e instanceof Error ? e.message : e
                })
        }

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