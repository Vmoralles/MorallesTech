var artilheiroModel = require("../models/artilheiroModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var gol = req.body.golServer;
    var fkUsuario = req.body.fkUsuarioServer;





    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (gol == undefined) {
        res.status(400).send("Seu gol está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        artilheiroModel.cadastrar(nome, sobrenome, gol, fkUsuario)
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


function buscarUltimasMedidasArtilheiro(req, res) {

    const limite_linhas = 7;

    var idArtilheiro = req.params.idArtilheiro;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    artilheiroModel.buscarUltimasMedidasArtilheiro(idArtilheiro, limite_linhas).then(function (resultado) {
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


function buscarMedidasEmTempoRealArtilheiro(req, res) {

    var idArtilheiro = req.params.idArtilheiro;

    console.log(`Recuperando medidas em tempo real`);

    artilheiroModel.buscarMedidasEmTempoRealArtilheiro(idArtilheiro).then(function (resultado) {
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
    buscarUltimasMedidasArtilheiro,
    buscarMedidasEmTempoRealArtilheiro,
    cadastrar
}