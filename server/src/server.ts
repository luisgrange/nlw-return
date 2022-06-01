import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello world');
});

app.listen(3333, ()=> 
{console.log('HTTP server running!\nhttp://localhost:3333')})