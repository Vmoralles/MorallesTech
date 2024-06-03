var entradaModel = require("../models/entradaModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkJogo = req.body.fkJogoServer;
    var idEsta = req.body.idEstaServer;
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var assistencia = req.body.assistenciaServer;
    var gol = req.body.golServer;





    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (gol == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (fkJogo == undefined) {
        res.status(400).send("Seu jogo está undefined!");
    } else if (assistencia == undefined) {
        res.status(400).send("Seu jogo está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (idEsta == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        entradaModel.cadastrar(fkUsuario, fkJogo, idEsta, nome, sobrenome, assistencia, gol)
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

function buscarMedidasEmTempoRealGol(req, res) {

    var idJogoGol = req.params.idJogoGol;

    console.log(`Recuperando medidas em tempo real`);

    entradaModel.buscarMedidasEmTempoRealGol(idJogoGol).then(function (resultado) {
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

function buscarUltimasMedidasGol(req, res) {

    const limite_linhasGol = 7;

    var idJogoGol = req.params.idJogoGol;

    console.log(`Recuperando as ultimas ${limite_linhasGol} medidas`);

    entradaModel.buscarUltimasMedidasGol(idJogoGol, limite_linhasGol).then(function (resultado) {
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

function buscarUltimasMedidasAssistencia(req, res) {

    const limite_linhasAssistencia = 7;

    var idJogoAssistencia = req.params.idJogoAssistencia;

    console.log(`Recuperando as ultimas ${limite_linhasAssistencia} medidas`);

    entradaModel.buscarUltimasMedidasAssistencia(idJogoAssistencia, limite_linhasAssistencia).then(function (resultado) {
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



function buscarMedidasEmTempoRealAssistencia(req, res) {

    var idJogoAssistencia = req.params.idJogoAssistencia;

    console.log(`Recuperando medidas em tempo real`);

    entradaModel.buscarMedidasEmTempoRealAssistencia(idJogoAssistencia).then(function (resultado) {
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
    buscarUltimasMedidasGol,
    buscarUltimasMedidasAssistencia,
    buscarMedidasEmTempoRealGol,
    buscarMedidasEmTempoRealAssistencia,
    cadastrar
}