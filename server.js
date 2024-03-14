import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import {  GoogleGenerativeAI } from '@google/generative-ai';

const PORT=8000 

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())

const genAI=new GoogleGenerativeAI(
    'AIzaSyDjmbWR9uqqZ5FeLxq3sHLmZrlHFLAS7TQ'
)

app.post('/chat',async(req,res)=>{
    console.log(req.body.message)
    const model=genAI.getGenerativeModel({model:"gemini-pro"})

    const chat=model.startChat({
        history:req.body.history
    })
    const msg=req.body.message;
    const result=await chat.sendMessage(msg)
    const response=result.response;
    const text=response.text()
    res.send(text)
})

app.listen(PORT,()=>{
    console.log(`Server is Listening ${PORT}`)
})


