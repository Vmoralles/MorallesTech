var database = require("../database/config")


function buscarUltimasMedidasAssistencia(idJogoAssistencia, limite_linhasAssistencia) {

    var instrucaoSql = `SELECT 
    qtdAssistencia as Assistencia, 
    nome,
    sobrenome
    FROM estatisticas
    WHERE fkJogo = ${idJogoAssistencia}
    ORDER BY idEsta DESC LIMIT ${limite_linhasAssistencia}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasGol(idJogoGol, limite_linhasGol) {

    var instrucaoSql = `SELECT 
    qtdGol as Gol,
    nome,
    sobrenome
    FROM estatisticas
    WHERE fkJogo = ${idJogoGol}
    ORDER BY idEsta DESC LIMIT ${limite_linhasGol}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasAssistencias(limite_linhasGol) {

    var instrucaoSql = `SELECT 
    nome,
    sobrenome,
    qtdAssistencia AS Assistencia
    FROM estatisticas
    WHERE (nome, sobrenome, qtdAssistencia) IN (
        SELECT nome, sobrenome, MAX(qtdAssistencia)
        FROM estatisticas
        GROUP BY nome, sobrenome
    )
    ORDER BY qtdAssistencia DESC LIMIT ${limite_linhasGol}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasGols(limite_linhasGol) {

    var instrucaoSql = `SELECT 
    nome,
    sobrenome,
    qtdGol AS Gol
    FROM estatisticas
     WHERE (nome, sobrenome, qtdGol) IN (
        SELECT nome, sobrenome, MAX(qtdGol)
        FROM estatisticas
        GROUP BY nome, sobrenome
    )
    ORDER BY qtdGol DESC LIMIT ${limite_linhasGol}`;

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
    buscarUltimasMedidasGol,
    buscarUltimasMedidasAssistencia,
    buscarUltimasAssistencias,
    buscarUltimasGols
};