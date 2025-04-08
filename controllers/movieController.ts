import { Request, Response } from 'express';

interface Movie {
  nome: string;
  descricao: string;
  diretor: string;
  ano: number;
  genero: string;
  notas: any[];
}

export let movies: Movie[] = [
  {
    nome: "O Poderoso Chefão",
    descricao: "O Poderoso Chefão é um filme de crime de 1972 dirigido por Francis Ford Coppola e produzido por Albert S. Ruddy, com roteiro de Mario Puzo e Coppola. É estrelado por Marlon Brando, Al Pacino, James Caan, Richard S. Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard Conte e Diane Keaton.",
    diretor: "Francis Ford Coppola",
    ano: 1972,
    genero: "Crime",
    notas: []
  }  
]

export const createMovie = (req: Request, res: Response): void => {
  console.log('POST ROUTE REACHED')
  const {nome, descricao, diretor, ano, genero} = req.body;
  if (!nome || !descricao || !diretor || !ano || !genero) {
    res.send('Dados inválidos. Preencha todos os campos.');
    return;
  } 
  if (incluiFilme(nome)){//verifica se o nome do filme já existe no array de filmes
    res.status(400).send('Dados inválidos. O filme já existe.');
    return;
  }

  const filme: Movie = {...req.body, notas: []};
  movies.push(filme);

  res.send(`Filme ${filme.nome} adicionado com sucesso.`);
}

export const getMovies = (req: Request, res: Response): void => {
  if (movies.length === 0) {
    res.status(404).send('Nenhum filme encontrado.');
    return;
  }
  
  res.send(movies);
}

export const getMovie = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);

  const filme: Movie = movies[id];
  if(!filme) {
    res.status(404).send('Filme não encontrado.');
    return;
  }

  res.send(filme);
}

export const deleteMovie = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);
  const filme: Movie = movies[id];

  if (!filme) {
    res.status(404).send('Filme não encontrado.');
    return;
  }

  movies.splice(id, 1); //splice é utilizado para remover um elemento de um array
  res.send(`Filme ${filme.nome} deletado com sucesso.`);
}

export const updateMovie = (req: Request, res: Response): void => { //patch é utilizado para atualizar um recurso específico
  const id: number = parseInt(req.params.id);
  const {nome, descricao, diretor, ano, genero} = req.body;
  const filme: Movie = movies[id];

  if (!filme) {
    res.status(404).send('Filme não encontrado.');
    return;
  }

  if (nome) {filme.nome = nome;}
  if (descricao) {filme.descricao = descricao;}
  if (diretor) {filme.diretor = diretor;}
  if (ano) {filme.ano = ano;}
  if (genero) {filme.genero = genero;}

  res.send(`Filme ${filme.nome} atualizado com sucesso.`);
}

function incluiFilme(nome: string): boolean {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].nome === nome) {
      return true;
    }
  }
  return false;
}