var database = require("../database/config")


function buscarUltimasMedidasMaestro(limite_linhas) {

    var instrucaoSql = `SELECT nome, sobrenome,MAX(soma_Assistencia) AS maximo_Assistencia
    FROM (
    SELECT nome, sobrenome, SUM(assistencia) AS soma_Assistencia
    FROM treinoMaestro
    GROUP BY nome, sobrenome
    ) AS total_Assistencia
    GROUP BY nome, sobrenome
    ORDER BY maximo_Assistencia DESC 
    LIMIT  ${limite_linhas}`;

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
    buscarUltimasMedidasMaestro,
};