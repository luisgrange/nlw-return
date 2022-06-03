import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed87bde887e5ac",
      pass: "373ff43eac897f"
    }
  });

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

    transport.sendMail({
        from: 'Equipe feedget <oi@feedget.com>',
        to: 'Luis Fernando <l.grange@protonmail.com>',
        subject: 'Novo feedback',
        html: [
            `<p>Tipo do feedback ${type}</p>`,
            `<p>Commentário ${comment}</p>`,
        ].join('\n')
    });

    return res.status(201).json({data: feedback});
});

app.listen(3333, ()=> 
{console.log('HTTP server running!\nhttp://localhost:3333')})