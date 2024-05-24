var express = require("express");
var router = express.Router();

var artilheiroController = require("../controllers/artilheiroController");

// router.get("/ultimas/:idAquario", function (req, res) {
//     medidaController.buscarUltimasMedidas(req, res);
// });

// router.get("/tempo-real/:idAquario", function (req, res) {
//     medidaController.buscarMedidasEmTempoReal(req, res);
// })
router.post("/cadastrar", function (req, res) {
    artilheiroController.cadastrar(req, res);
})
module.exports = router;