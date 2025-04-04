import { movies } from './movieController.js';

export const createNota = (req, res) => { 
  const id = req.params.id;
  const nota = req.body;
  const filme = movies[id]; 
  //printa o numero recebido em nota
  console.log(nota['nota']);


  if (!filme) {
    return res.status(404).send('Filme não encontrado.');
  }
  
  if (!nota['nota'] || Object.keys(nota).length > 1 || nota['nota'] < 0 || nota['nota'] > 10) {
    return res.status(400).send('Dados inválidos. A nota deve ser um número entre 0 e 10.');
  }

  filme.notas.push(nota);
  res.send(`Nota adicionada com sucesso a ${filme.nome}`);
}

export const getNotas = (req, res) => {
  const id = req.params.id;
  const filme = movies[id];
  const movieNotes = filme.notas;
  res.send(movieNotes);
}

export const getNota = (req, res) => {
  const id = req.params.id;
  const notaId = req.params.notaId;
  const filme = movies[id];

  if (!filme) {
    return res.status(404).send('Filme não encontrado.');
  }

  if (notaId < 0 || notaId >= filme.notas.length) {
    return res.status(404).send('Nota não encontrada.');
  }

  res.send({ nota: filme.notas[notaId] });
}

export const deleteNota = (req, res) => {
  const id = req.params.id;
  const notaId = req.params.notaId;
  const filme = movies[id];
  
  try {
    if (!filme) {
      return res.status(404).send('Filme não encontrado.');
    }
    
    if (notaId < 0 || notaId >= filme.notas.length) {
      return res.status(404).send('Nota não encontrada.');
    }

    const notaDeletada = filme.notas[notaId];
    filme.notas.splice(notaId, 1);

    res.send(`Nota deletada com sucesso`);
  } catch (error) {
    res.status(404).send('Nota não encontrada.');
  }
}

export const updateNota = (req, res) => {
  const id = req.params.id;
  const notaId = req.params.notaId;
  const nota  = req.body;
  const filme = movies[id];

  if (!nota) {
    return res.status(400).send('Dados inválidos. O conteúdo da nota é obrigatório.');
  }
  
  if (nota < 0 || nota > 10) {
    return res.status(400).send('Dados inválidos. A nota deve ser um número entre 0 e 10.');
  }

  try {
    if (!filme) {
      return res.status(404).send('Filme não encontrado.');
    }
    
    if (notaId < 0 || notaId >= filme.notas.length) {
      return res.status(404).send('Nota não encontrada.');
    }

    filme.notas[notaId] = nota;

    res.send(`Nota atualizada com sucesso`);
  } catch (error) {
    res.status(404).send('Nota não encontrada.');
  }
}