import express from 'express';
import ContatosController from '../controllers/api/ContatosController.js';
import ProdutosController from '../controllers/api/ProdutosController.js';
import UsuariosController from '../controllers/api/UsuariosController.js';


const router = express.Router();

router.get("/contatos", ContatosController.listar);
router.get("/contatos/:id", ContatosController.buscar);
router.post("/contatos", ContatosController.salvar);
router.put("/contatos/:id", ContatosController.atualizar);
router.delete("/contatos/:id", ContatosController.excluir);

router.get("/produtos", ProdutosController.listar);
router.get("/produtos/:id", ProdutosController.buscar);
router.post("/produtos", ProdutosController.salvar);
router.put("/produtos/:id", ProdutosController.atualizar);
router.delete("/produtos/:id", ProdutosController.excluir);

router.get("/usuarios", UsuariosController.listar);
router.get("/usuarios/:id", UsuariosController.buscar);
router.post("/usuarios", UsuariosController.salvar);
router.put("/usuarios/:id", UsuariosController.atualizar);
router.delete("/usuarios/:id", UsuariosController.excluir);

export default router;
