import express from 'express';
import { createNota, getNotas, getNota, deleteNota, updateNota } from "../controllers/notaController.js";

const router = express.Router();

router.get('/:id/notas', getNotas); //rota para pegar todas as notas de um filme rota de exemplo: http://localhost:5000/movies/0/notas

router.post('/:id/notas', createNota);

router.get('/:id/notas/:notaId', getNota);

router.delete('/:id/notas/:notaId', deleteNota);

router.patch('/:id/notas/:notaId', updateNota);

export default router;