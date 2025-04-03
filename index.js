import express from 'express';  
import bodyParser from 'body-parser';

import movieRoutes from './routes/movieRoutes.js';
import notaRoutes from './routes/notaRoutes.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/movies', movieRoutes);
app.use('/movies', notaRoutes);

app.get('/', (req, res) => {res.send('Hello from Homepage.');});

app.listen (PORT, () => { console.log(`Server is running on port: http://localhost:${PORT}`) });