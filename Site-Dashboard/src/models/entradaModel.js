var database = require("../database/config")

function buscarUltimasMedidas(idJogo, limite_linhas) {

    var instrucaoSql = `SELECT 
    qtdAssistencia as assistencia, 
    qtdGol as Gol,
    nome,
    sobrenome
    FROM estatisticas
    WHERE fkJogo = ${idJogo}
    ORDER BY idEsta DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idJogo) {

    var instrucaoSql = `SELECT 
    qtdAssistencia as assistencia,
    qtdGol as Gol, 
    nome,
    sobrenome
    FROM estatisticas
    WHERE fkJogo = ${idJogo}
    ORDER BY idEsta DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(fkUsuario, fkJogo, idEsta, nome, sobrenome, assistencia, gol) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkUsuario, fkJogo, idEsta, nome, sobrenome, assistencia, gol);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO estatisticas (fkUsuario, fkJogo, idEsta, nome, sobrenome, qtdAssistencia, qtdGol) VALUES ('${fkUsuario}','${fkJogo}',  ${idEsta}, '${nome}', '${sobrenome}', '${assistencia}',  '${gol}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
};