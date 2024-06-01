var express = require("express");
var router = express.Router();

var artilheiroController = require("../controllers/artilheiroController");

router.get("/ultimas/:idArtilheiro", function (req, res) {
    artilheiroController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idArtilheiro", function (req, res) {
    artilheiroController.buscarMedidasEmTempoReal(req, res);
})
router.post("/cadastrar", function (req, res) {
    artilheiroController.cadastrar(req, res);
})
module.exports = router;