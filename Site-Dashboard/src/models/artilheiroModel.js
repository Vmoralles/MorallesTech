var database = require("../database/config")

function buscarUltimasMedidasArtilheiro(limite_linhas) {

    var instrucaoSql = `SELECT nome, sobrenome,MAX(soma_gols) AS maximo_gols
    FROM (
    SELECT nome, sobrenome, SUM(gol) AS soma_gols
    FROM treinoArtilheiro
    GROUP BY nome, sobrenome
    ) AS total_Gols 
    GROUP BY nome, sobrenome
    ORDER BY maximo_gols DESC 
    LIMIT ${limite_linhas} `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, gol, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, gol, fkUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO treinoArtilheiro ( nome, sobrenome, gol, fkUsuario) VALUES ('${nome}', '${sobrenome}',  '${gol}', '${fkUsuario}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarUltimasMedidasArtilheiro,
};