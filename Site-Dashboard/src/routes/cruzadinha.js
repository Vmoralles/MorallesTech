var express = require("express");
var router = express.Router();

var cruzadinhaController = require("../controllers/cruzadinhaController");

router.post("/registrar", function (req, res) {
    cruzadinhaController.cadastrar(req, res);
})
module.exports = router;