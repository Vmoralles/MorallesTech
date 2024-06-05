var express = require("express");
var router = express.Router();

var maestroController = require("../controllers/maestroController");

router.get("/ultimasAssistencia", function (req, res) {
    maestroController.buscarUltimasMedidasMaestro(req, res);
});

router.post("/cadastrar", function (req, res) {
    maestroController.cadastrar(req, res);
})
module.exports = router;