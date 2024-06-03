var maestroModel = require("../models/maestroModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var assistencia = req.body.assistenciaServer;
    var fkUsuario = req.body.fkUsuarioServer;





    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (assistencia == undefined) {
        res.status(400).send("Sua assistencia está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        maestroModel.cadastrar(nome, sobrenome, assistencia, fkUsuario)
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


function buscarUltimasMedidasMaestro(req, res) {

    const limite_linhas = 7;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    maestroModel.buscarUltimasMedidasMaestro(limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}




module.exports = {
    buscarUltimasMedidasMaestro,
    cadastrar
}