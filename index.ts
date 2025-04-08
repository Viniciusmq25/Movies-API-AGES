import express, { Application, Request, Response } from 'express';  
import bodyParser from 'body-parser';

import movieRoutes from './routes/movieRoutes.js';
import notaRoutes from './routes/notaRoutes.js';

const app: Application = express();
const PORT: number = 5000;

app.use(bodyParser.json());

app.use('/movies', movieRoutes);
app.use('/movies', notaRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Homepage.');
});

app.listen(PORT, () => { 
  console.log(`Server is running on port: http://localhost:${PORT}`);
});