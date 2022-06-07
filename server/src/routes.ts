import express from 'express';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed87bde887e5ac",
      pass: "373ff43eac897f"
    }
  });


routes.post('/feedbacks', async (req, res) => {

    //desestruturando 
    const {type, comment, screenshot} = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Equipe feedget <oi@feedget.com>',
        to: 'Luis Fernando <l.grange@protonmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div styles="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do feedback ${type}</p>`,
            `<p>Commentário ${comment}</p>`,
            `</div>`
        ].join('\n')
    });

    return res.status(201).json({data: feedback});
});