const dadosUsuario = {
    nomeGol: "",
    sobrenomeGol: "",
    nomeAssistencia: "",
    sobrenomeAssitencia: "",
    fkUsuario: sessionStorage.ID_USUARIO,
}

function atualizarDadosUsuario() {
    dadosUsuario.nomeGol = input_nome_gol.value.trim().toLowerCase();
    dadosUsuario.sobrenomeGol = input_sobrenome_gol.value.trim().toLowerCase();
    dadosUsuario.nomeAssistencia = input_nome_assistencia.value.trim().toLowerCase();
    dadosUsuario.sobrenomeAssitencia = input_sobrenome_assistencia.value.trim().toLowerCase();
}

function atualizarGraficos() {
    window.location = "../dashboard/site.treino.html"
}

// Definindo o intervalo de atualização 
setInterval(atualizarDadosUsuario, 1000);

function gols() {
    const gol = parseInt(document.getElementById('input_gols').value);
    if (dadosUsuario.nomeGol == "" || dadosUsuario.sobrenomeGol == "" || isNaN(gol)) {
        div_treino.innerHTML += `Por favor, preencha o nome completo do jogador e a quantidade de gols.`;
    } else if (dadosUsuario.sobrenomeAssistencia != dadosUsuario.sobrenomeSession || dadosUsuario.nomeAssistencia != dadosUsuario.nomeSession) {
        div_treino.innerHTML += ` Você não é o ${dadosUsuario.nomeSession} ${dadosUsuario.sobrenomeSession}`
    } else {
        atualizarGraficos()
        fetch("/artilheiro/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: dadosUsuario.nomeGol,
                sobrenomeServer: dadosUsuario.sobrenomeGol,
                golServer: gol,
                fkUsuarioServer: dadosUsuario.fkUsuario,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Funcionou")
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);

            });
        return false;
    }
}


function assistencias() {
    const assistencia = parseInt(document.getElementById('input_assistencia').value);
    if (dadosUsuario.nomeAssistencia === "" || dadosUsuario.sobrenomeAssitencia === "" || isNaN(assistencia)) {
        div_treino.innerHTML += `Por favor, preencha o nome completo do jogador e a quantidade de assistência.`;
    } else if (dadosUsuario.sobrenomeAssistencia != dadosUsuario.sobrenomeSession || dadosUsuario.nomeAssistencia != dadosUsuario.nomeSession) {
        div_treino.innerHTML += ` Você não é o ${dadosUsuario.nomeSession} ${dadosUsuario.sobrenomeSession}`
    } else {
        atualizarGraficos()
        fetch("/maestro/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: dadosUsuario.nomeAssistencia,
                sobrenomeServer: dadosUsuario.sobrenomeAssitencia,
                assistenciaServer: assistencia,
                fkUsuarioServer: dadosUsuario.fkUsuario,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    console.log("Funcionou")
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
        return false;
    }
}

// window.onload = atualizarGraficoGol();
let proximaAtualizacao;
window.onload = obterGraficos();

function obterGraficos() {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/artilheiro/ultimasGol`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    fetch(`/maestro/ultimasAssistencia`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                plotarGraficoAssistencia(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: [],
        datasets: [{
            label: 'Gols',
            data: [],
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.nome + " " + registro.sobrenome);
        dados.datasets[0].data.push(registro.maximo_gols);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };
    const ctx = document.getElementById('myChart');
    // Adicionando gráfico criado em div na tela
    if (Chart.getChart(ctx)) {
        // Destruir o gráfico existente antes de criar um novo
        Chart.getChart(ctx).destroy();
    }
    myChart = new Chart(ctx, config)
}

function plotarGraficoAssistencia(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: [],
        datasets: [{
            label: 'Assistencias',
            data: [],
            borderWidth: 1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.nome + " " + registro.sobrenome);
        dados.datasets[0].data.push(registro.maximo_Assistencia);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };
    const ctx = document.getElementById('myChart1');
    // Adicionando gráfico criado em div na tela
    if (Chart.getChart(ctx)) {
        // Destruir o gráfico existente antes de criar um novo
        Chart.getChart(ctx).destroy();
    }
    myChart1 = new Chart(ctx, config)
    console.log(dados.labels)
}