var contatoModel = require("../models/contatoModel");


function cadastrar(req, res) {

    var fkUsuario = req.body.fkUsuarioServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var assunto = req.body.assuntoServer;
    var problema = req.body.problemaServer;



    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Sua nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (assunto == undefined) {
        res.status(400).send("Sua assunto está undefined!");
    } else if (problema == undefined) {
        res.status(400).send("Seu problema está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        contatoModel.cadastrar(fkUsuario, nome, email, assunto, problema)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}