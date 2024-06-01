var express = require("express");
var router = express.Router();

var maestroController = require("../controllers/maestroController");

router.get("/ultimas/:idMaestro", function (req, res) {
    maestroController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idMaestro", function (req, res) {
    maestroController.buscarMedidasEmTempoReal(req, res);
})
router.post("/cadastrar", function (req, res) {
    maestroController.cadastrar(req, res);
})
module.exports = router;