import { Request, Response } from 'express';
import { movies } from './movieController.js';

interface Nota {
  nota: number;
}

export const createNota = (req: Request, res: Response): void => { 
  const id: number = parseInt(req.params.id);
  const nota: Nota = req.body;
  const filme = movies[id]; 
  //printa o numero recebido em nota
  console.log(nota['nota']);

  if (!filme) {
    res.status(404).send('Filme não encontrado.');
    return;
  }
  
  if (!nota['nota'] || Object.keys(nota).length > 1 || nota['nota'] < 0 || nota['nota'] > 10) {
    res.status(400).send('Dados inválidos. A nota deve ser um número entre 0 e 10.');
    return;
  }

  filme.notas.push(nota);
  res.send(`Nota adicionada com sucesso a ${filme.nome}`);
}

export const getNotas = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const filme = movies[id];
  const movieNotes = filme.notas;
  res.send(movieNotes);
}

export const getNota = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const notaId: number = parseInt(req.params.notaId);
  const filme = movies[id];

  if (!filme) {
    res.status(404).send('Filme não encontrado.');
    return;
  }

  if (notaId < 0 || notaId >= filme.notas.length) {
    res.status(404).send('Nota não encontrada.');
    return;
  }

  res.send({ nota: filme.notas[notaId] });
}

export const deleteNota = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const notaId: number = parseInt(req.params.notaId);
  const filme = movies[id];
  
  try {
    if (!filme) {
      res.status(404).send('Filme não encontrado.');
      return;
    }
    
    if (notaId < 0 || notaId >= filme.notas.length) {
      res.status(404).send('Nota não encontrada.');
      return;
    }

    const notaDeletada = filme.notas[notaId];
    filme.notas.splice(notaId, 1);

    res.send(`Nota deletada com sucesso: ${notaDeletada.content}`);
  } catch (error) {
    res.status(404).send('Nota não encontrada.');
  }
}

export const updateNota = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const notaId: number = parseInt(req.params.notaId);
  const nota: Nota = req.body;
  const filme = movies[id];

  if (!nota) {
    res.status(400).send('Dados inválidos. O conteúdo da nota é obrigatório.');
    return;
  }
  
  if (nota.nota < 0 || nota.nota > 10) {
    res.status(400).send('Dados inválidos. A nota deve ser um número entre 0 e 10.');
    return;
  }

  try {
    if (!filme) {
      res.status(404).send('Filme não encontrado.');
      return;
    }
    
    if (notaId < 0 || notaId >= filme.notas.length) {
      res.status(404).send('Nota não encontrada.');
      return;
    }

    filme.notas[notaId] = nota;

    res.send(`Nota atualizada com sucesso: ${filme.notas[notaId]}`);
  } catch (error) {
    res.status(404).send('Nota não encontrada.');
  }
}