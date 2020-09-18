const express = require('express');
const router = express.Router();
const controller = require('../controller/usuario_controller')

router.get('/', controller.listar);
router.post('/', controller.inserir);
//Adicionado search para buscar produto pelo nome
router.get('/search', controller.buscarUsuario);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;