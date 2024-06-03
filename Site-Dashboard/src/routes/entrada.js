var express = require("express");
var router = express.Router();

var entradaController = require("../controllers/entradaController");

router.get("/ultimas/:idJogoGol", function (req, res) {
    entradaController.buscarUltimasMedidasGol(req, res);
});

router.get("/ultimas/:idJogoAssistencia", function (req, res) {
    entradaController.buscarUltimasMedidasAssistencia(req, res);
});

router.get("/tempo-real/:idJogoGol", function (req, res) {
    entradaController.buscarMedidasEmTempoRealGol(req, res);
})

router.get("/tempo-real/:idJogoAssistencia", function (req, res) {
    entradaController.buscarMedidasEmTempoRealAssistencia(req, res);
})

router.post("/cadastrar", function (req, res) {
    entradaController.cadastrar(req, res);
})
module.exports = router;