import express, { json } from 'express'
import  jwt  from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema } from '@repo/common/types'
import { prismaClient  } from '@repo/db/client'
const app = express()
app.use(express.json())

app.post('/signin', (req, res) => {
       const Parse = CreateUserSchema.parse(req.body)
       if(Parse){
        try{
                
        }catch(e){

        }
       }
}) 
app.post('/signup', (req, res) => {
        //zod validation

})
app.post('/room', (req, res) => {
       const userId = 1
        jwt.sign({
                userId
        },JWT_SECRET)
        res.json({
                message:'sign'
        })
})
app.listen(3001)  