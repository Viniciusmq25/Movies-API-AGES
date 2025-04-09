import express, { Application, Request, Response } from 'express';  
import bodyParser from 'body-parser';
import prisma from './prisma/client.js';

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

// Initialize database with seed data if empty
async function initializeDatabase() {
  const movieCount = await prisma.movie.count();
  
  if (movieCount === 0) {
    console.log('Seeding initial data...');
    
    await prisma.movie.create({
      data: {
        nome: "O Poderoso Chefão",
        descricao: "O Poderoso Chefão é um filme de crime de 1972 dirigido por Francis Ford Coppola e produzido por Albert S. Ruddy, com roteiro de Mario Puzo e Coppola. É estrelado por Marlon Brando, Al Pacino, James Caan, Richard S. Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard Conte e Diane Keaton.",
        diretor: "Francis Ford Coppola",
        ano: 1972,
        genero: "Crime"
      }
    });
    
    await prisma.movie.create({
      data: {
        nome: "Meu malvado favorito",
        descricao: "Um malvado que é favorito",
        diretor: "Chris Renaud e Pierre Coffin",
        ano: 2010,
        genero: "Animação"
      }
    });
    
    console.log('Initial data seeded successfully');
  }
}

// Connect to the database, then start the server
prisma.$connect()
  .then(() => {
    console.log('Connected to database');
    return initializeDatabase();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});