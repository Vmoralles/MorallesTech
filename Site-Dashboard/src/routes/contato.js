var express = require("express");
const nodemailer = require("nodemailer")
var router = express.Router();

const user = "morallestech@gmail.com"
const senha = "morallestech123"




router.post('/enviar-email', (req, res) => {
    const { nome, email, assunto, problema } = req.body;

    const smtp = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user, senha },
        connectionTimeout: 10000,
    })

    smtp.sendMail({
        from: email,
        to: user,
        subject: assunto,
        text: `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\nProblema: ${problema}`
    }).then(info => {
        smtp.close();
        res.sendStatus(200);
    }).catch(error => {
        console.error(error);
        smtp.close();
        res.sendStatus(500);
    });
})

var contatoController = require("../controllers/contatoController");

router.post("/cadastrar", function (req, res) {
    contatoController.cadastrar(req, res);
})

module.exports = router;