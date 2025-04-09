import { Request, Response } from 'express';
import prisma from '../prisma/client.js';

interface Nota {
  nota: number;
}

export const createNota = async (req: Request, res: Response): Promise<void> => { 
  const id: number = parseInt(req.params.id);
  const { nota } = req.body;
  console.log(nota);

  if (nota === undefined || Object.keys(req.body).length > 1 || nota < 0 || nota > 10) {
    res.status(400).send('Dados inválidos. A nota deve ser um número entre 0 e 10.');
    return;
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: { id }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }
    
    const newNota = await prisma.nota.create({
      data: {
        nota,
        movieId: id
      }
    });

    res.status(201).send(`Nota adicionada com sucesso a ${movie.nome}`);
  } catch (error) {
    console.error("Error creating nota:", error);
    res.status(500).send('Erro ao adicionar nota.');
  }
}

export const getNotas = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  
  try {
    const movie = await prisma.movie.findUnique({
      where: { id }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    const notas = await prisma.nota.findMany({
      where: { movieId: id }
    });

    res.send(notas);
  } catch (error) {
    console.error("Error fetching notas:", error);
    res.status(500).send('Erro ao buscar notas.');
  }
}

export const getNota = async (req: Request, res: Response): Promise<void> => {
  const movieId: number = parseInt(req.params.id);
  const notaId: number = parseInt(req.params.notaId);
  
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    const nota = await prisma.nota.findFirst({
      where: { 
        id: notaId,
        movieId: movieId 
      }
    });

    if (!nota) {
      res.status(404).send('Nota não encontrada.');
      return;
    }

    res.send(nota);
  } catch (error) {
    console.error("Error fetching nota:", error);
    res.status(500).send('Erro ao buscar nota.');
  }
}

export const deleteNota = async (req: Request, res: Response): Promise<void> => {
  const movieId: number = parseInt(req.params.id);
  const notaId: number = parseInt(req.params.notaId);
  
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    const nota = await prisma.nota.findFirst({
      where: { 
        id: notaId,
        movieId: movieId 
      }
    });

    if (!nota) {
      res.status(404).send('Nota não encontrada.');
      return;
    }

    await prisma.nota.delete({
      where: { id: notaId }
    });

    res.send(`Nota deletada com sucesso.`);
  } catch (error) {
    console.error("Error deleting nota:", error);
    res.status(500).send('Erro ao deletar nota.');
  }
}

export const updateNota = async (req: Request, res: Response): Promise<void> => {
  const movieId: number = parseInt(req.params.id);
  const notaId: number = parseInt(req.params.notaId);
  const { nota } = req.body;
  
  if (nota === undefined || nota < 0 || nota > 10) {
    res.status(400).send('Dados inválidos. A nota deve ser um número entre 0 e 10.');
    return;
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      res.status(404).send('Filme não encontrado.');
      return;
    }

    const existingNota = await prisma.nota.findFirst({
      where: { 
        id: notaId,
        movieId: movieId 
      }
    });

    if (!existingNota) {
      res.status(404).send('Nota não encontrada.');
      return;
    }

    const updatedNota = await prisma.nota.update({
      where: { id: notaId },
      data: { nota }
    });

    res.send(`Nota atualizada com sucesso.`);
  } catch (error) {
    console.error("Error updating nota:", error);
    res.status(500).send('Erro ao atualizar nota.');
  }
}