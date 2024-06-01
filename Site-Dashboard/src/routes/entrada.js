var express = require("express");
var router = express.Router();

var entradaController = require("../controllers/entradaController");

router.get("/ultimas/:idJogo", function (req, res) {
    entradaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idJogo", function (req, res) {
    entradaController.buscarMedidasEmTempoReal(req, res);
})
router.post("/cadastrar", function (req, res) {
    entradaController.cadastrar(req, res);
})
module.exports = router;