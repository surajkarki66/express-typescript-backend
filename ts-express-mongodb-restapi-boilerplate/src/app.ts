import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (req, res) => res.send('Hello'));
app.get('');
app.get('/what', (req, res) => res.send('Fuck you'));
app.listen(5000, () => {
    console.log('Server is running');
});
