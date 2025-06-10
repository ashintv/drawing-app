import express, { json } from 'express'
import  jwt  from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema } from '@repo/common/types'

const app = express()
app.use(express.json())

app.post('/signin', (req, res) => {
        res.send('Working')
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