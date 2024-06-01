var database = require("../database/config")


function buscarUltimasMedidas(idMaestro, limite_linhas) {

    var instrucaoSql = `SELECT 
    qtdAssistencia as assistencia, 
    sobrenome,
    nome
    FROM estatisticas
    WHERE fkJogo = ${idMaestro}
    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaestro) {

    var instrucaoSql = `SELECT 
    qtdAssistencia as assistencia, 
    sobrenome,
    nome
    FROM estatisticas
    WHERE fkJogo = ${idMaestro}
    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, assistencia, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, assistencia, fkUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO treinoMaestro ( nome, sobrenome, assistencia, fkUsuario) VALUES ('${nome}', '${sobrenome}',  '${assistencia}', '${fkUsuario}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
};