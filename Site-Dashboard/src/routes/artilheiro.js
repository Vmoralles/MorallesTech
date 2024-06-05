var express = require("express");
var router = express.Router();

var artilheiroController = require("../controllers/artilheiroController");

router.get("/ultimasGol", function (req, res) {
    artilheiroController.buscarUltimasMedidasArtilheiro(req, res);
});

router.get("/tempo-real", function (req, res) {
    artilheiroController.buscarMedidasEmTempoRealArtilheiro(req, res);
})

router.post("/cadastrar", function (req, res) {
    artilheiroController.cadastrar(req, res);
})
module.exports = router;