import { Request, Response } from 'express';
import prisma from '../prisma/client.js';

interface Movie {
  nome: string;
  descricao: string;
  diretor: string;
  ano: number;
  genero: string;
}

export const createMovie = async (req: Request, res: Response): Promise<void> => {
  console.log('POST ROUTE REACHED')
  const {nome, descricao, diretor, ano, genero} = req.body;
  
  if (!nome || !descricao || !diretor || !ano || !genero) {
    res.status(400).send('Dados inválidos. Preencha todos os campos.');
    return;
  } 
  
  try {
    // Check if movie with same name exists
    const existingMovie = await prisma.movie.findFirst({
      where: { nome }
    });
    
    if (existingMovie) {
      res.status(400).send('Dados inválidos. O filme já existe.');
      return;
    }

    const newMovie = await prisma.movie.create({
      data: {
        nome,
        descricao,
        diretor,
        ano,
        genero
      }
    });

    res.status(201).send(`Filme ${newMovie.nome} adicionado com sucesso.`);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).send('Erro ao adicionar filme.');
  }
}

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        notas: true
      }
    });
    
    if (movies.length === 0) {
      res.status(404).send('Nenhum filme encontrado.');
      return;
    }
    
    res.send(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send('Erro ao buscar filmes.');
  }
}

export const getMovie = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);

  try {
    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        notas: true
      }
    });
    
    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    res.send(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).send('Erro ao buscar filme.');
  }
}

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  
  try {
    const movie = await prisma.movie.findUnique({
      where: { id }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    await prisma.movie.delete({
      where: { id }
    });
    
    res.send(`Filme ${movie.nome} deletado com sucesso.`);
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).send('Erro ao deletar filme.');
  }
}

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const {nome, descricao, diretor, ano, genero} = req.body;
  
  try {
    const movie = await prisma.movie.findUnique({
      where: { id }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        ...(nome && { nome }),
        ...(descricao && { descricao }),
        ...(diretor && { diretor }),
        ...(ano && { ano }),
        ...(genero && { genero })
      }
    });

    res.send(`Filme ${updatedMovie.nome} atualizado com sucesso.`);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send('Erro ao atualizar filme.');
  }
}