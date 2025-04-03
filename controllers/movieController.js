export let movies = [
  {
    nome: "O Poderoso Chefão",
    descricao: "O Poderoso Chefão é um filme de crime de 1972 dirigido por Francis Ford Coppola e produzido por Albert S. Ruddy, com roteiro de Mario Puzo e Coppola. É estrelado por Marlon Brando, Al Pacino, James Caan, Richard S. Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard Conte e Diane Keaton.",
    diretor: "Francis Ford Coppola",
    ano: 1972,
    genero: "Crime",
    notas: []
  }  
]

export const createMovie = (req, res) => {
  console.log('POST ROUTE REACHED')
  const {nome, descricao, diretor, ano, genero} = req.body;
  if (!nome || !descricao || !diretor || !ano || !genero) {
    return res.send('Dados inválidos. Preencha todos os campos.');
  } 
  if (incluiFilme(nome)){//verifica se o nome do filme já existe no array de filmes
    return res.status(400).send('Dados inválidos. O filme já existe.');
  }

  const filme = {...req.body, notas: []};
  movies.push(filme);

  res.send(`Filme ${filme.nome} adicionado com sucesso.`);
}

export const getMovies = (req, res) => {
  if (movies.length === 0) {
    return res.status(404).send('Nenhum filme encontrado.');
  }
  
  res.send(movies);
}

export const getMovie = (req, res) => {
  const id = req.params.id;

  const filme = movies[id];
  if(!filme) {
    return res.status(404).send('Filme não encontrado.');
  }


  res.send(filme);
}

export const deleteMovie = (req, res) => {
  const id = req.params.id;
  const filme = movies[id];

  if (!filme) {return res.status(404).send('Filme não encontrado.');}

  movies.splice(id, 1); //splice é utilizado para remover um elemento de um array
  res.send(`Filme ${filme.nome} deletado com sucesso.`);
}

export const updateMovie = (req, res) => { //patch é utilizado para atualizar um recurso específico
  const id = req.params.id;
  const {nome, descricao, diretor, ano, genero} = req.body;
  const filme = movies[id];

  if (!filme) {return res.status(404).send('Filme não encontrado.');}

  if (nome) {filme.nome = nome;}
  if (descricao) {filme.descricao = descricao;}
  if (diretor) {filme.diretor = diretor;}
  if (ano) {filme.ano = ano;}
  if (genero) {filme.genero = genero;}

  res.send(`Filme ${filme.nome} atualizado com sucesso.`);
}

function incluiFilme(nome) {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].nome === nome) {
      return true;
    }
  }
  return false;
}