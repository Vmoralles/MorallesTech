var entradaModel = require("../models/entradaModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkJogo = req.body.fkJogoServer;
    var idEsta = req.body.idEstaServer;
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var gol = req.body.golServer;
    var assistencia = req.body.assistenciaServer;
    



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
    }else if (idEsta == undefined) {
        res.status(400).send("Seu id está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        entradaModel.cadastrar(fkUsuario, fkJogo, idEsta, nome, sobrenome, gol, assistencia)
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


// function buscarUltimasMedidas(req, res) {

//     const limite_linhas = 7;

//     var idAquario = req.params.idAquario;

//     console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

//     entradaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }


// function buscarMedidasEmTempoReal(req, res) {

//     var idAquario = req.params.idAquario;

//     console.log(`Recuperando medidas em tempo real`);

//     medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

module.exports = {
    // buscarUltimasMedidas,
    // buscarMedidasEmTempoReal

    cadastrar
}