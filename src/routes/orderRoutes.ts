const router = require("express").Router();

const pedidoController = require("../controller/pedido.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validaPedido,  validaIdParams, validaProdutosCarrinhoPedido } = require("../middleware/validacao.middleware");
const paginacao = require("../middleware/paginacao.middleware");

router.get("/find/:id", authMiddleware, validaIdParams, pedidoController.findPedidoByIdController);
router.get("/findAll", authMiddleware, paginacao, pedidoController.findAllPedidosController);

router.post("/create", authMiddleware, validaProdutosCarrinhoPedido, validaPedido, pedidoController.createPedidoController);

router.delete("/delete/:id", authMiddleware, validaIdParams, pedidoController.deletePedidoController);

router.patch("/updateStatus/:id", authMiddleware, validaIdParams, pedidoController.updateStatusPedidoController);

module.exports = router;