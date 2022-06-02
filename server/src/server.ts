import express from 'express';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

app.post('/feedbacks', async (req, res) => {

    //desestruturando 
    const {type, comment, screenshot} = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    return res.status(201).json({data: feedback});
});

app.listen(3333, ()=> 
{console.log('HTTP server running!\nhttp://localhost:3333')})