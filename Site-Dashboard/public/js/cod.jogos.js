const dadosUsuario = {
    nomeGol: "",
    sobrenomeGol: "",
    fkJogoGol: "",
    nomeAssistencia: "",
    sobrenomeAssistencia: "",
    fkJogoAssistencia: "",
    fkUsuario: sessionStorage.ID_USUARIO,
    nomeSession: sessionStorage.NOME_USUARIO.toLowerCase(),
    sobrenomeSession: sessionStorage.SOBRENOME_USUARIO.toLowerCase()
}

function atualizarDadosUsuario() {
    dadosUsuario.nomeGol = input_nome_gol.value.trim().toLowerCase();
    dadosUsuario.sobrenomeGol = input_sobrenome_gol.value.trim().toLowerCase();
    dadosUsuario.fkJogoGol = input_jogo.value;
    dadosUsuario.nomeAssistencia = input_nome_assistencia.value.trim().toLowerCase();
    dadosUsuario.sobrenomeAssistencia = input_sobrenome_assistencia.value.trim().toLowerCase();
    dadosUsuario.fkJogoAssistencia = input_jogo_assistencia.value;
}

// Definindo o intervalo de atualização 
setInterval(atualizarDadosUsuario, 1000);

function atualizarGraficos() {
    window.location = "../dashboard/site.jogos.html"
}


function gols() {
    const gol = input_gols.value;
    const assistencia = 0
    const idEsta = btn_gols.value = 1
    console.log(dadosUsuario)
    limparDiv()
    if (dadosUsuario.nomeGol == "" || dadosUsuario.sobrenomeGol == "" || isNaN(gol) || isNaN(dadosUsuario.fkJogoGol)) {
        div_jogo.innerHTML = `Por favor, preencha o nome completo do jogador, o jogo e a quantidade de gols.`;
    } else if (dadosUsuario.sobrenomeGol != dadosUsuario.sobrenomeSession || dadosUsuario.nomeGol != dadosUsuario.nomeSession) {
        div_jogo.innerHTML = ` Você não é o ${dadosUsuario.nomeSession} ${dadosUsuario.sobrenomeSession}`
    } else {
        atualizarGraficos()
        fetch("/entrada/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                fkUsuarioServer: dadosUsuario.fkUsuario,
                fkJogoServer: dadosUsuario.fkJogoGol,
                idEstaServer: idEsta,
                nomeServer: dadosUsuario.nomeGol,
                sobrenomeServer: dadosUsuario.sobrenomeGol,
                golServer: gol,
                assistenciaServer: assistencia
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
    }
    return false;
}

function assistencias() {
    const assistencia = input_assistencia.value;
    const gol = 0
    const idEsta = btn_assistencia.value + 2

    limparDiv()
    if (dadosUsuario.nomeAssistencia == "" || dadosUsuario.sobrenomeAssistencia == "" || isNaN(assistencia) || isNaN(dadosUsuario.fkJogoAssistencia)) {
        div_jogo.innerHTML += `Por favor, preencha o nome completo do jogador, o jogo e a quantidade de assistência.`;
    } else if (dadosUsuario.sobrenomeAssistencia != dadosUsuario.sobrenomeSession || dadosUsuario.nomeAssistencia != dadosUsuario.nomeSession) {
        div_jogo.innerHTML += ` Você não é o ${dadosUsuario.nomeSession} ${dadosUsuario.sobrenomeSession}`
    } else {
        atualizarGraficos()
        fetch("/entrada/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                fkUsuarioServer: dadosUsuario.fkUsuario,
                fkJogoServer: dadosUsuario.fkJogoAssistencia,
                idEstaServer: idEsta,
                nomeServer: dadosUsuario.nomeAssistencia,
                sobrenomeServer: dadosUsuario.sobrenomeAssistencia,
                golServer: gol,
                assistenciaServer: assistencia
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

function atualizarGol() {

    window.onload = exibirEstatisticasDoUsuario();
    function exibirEstatisticasDoUsuario() {
        let estatisticas = {
            fkUsuario: sessionStorage.ID_USUARIO,
            fkJogo: input_jogo.value,
            idEstatisticas: btn_gols.value = 1
        };

        sessionStorage.setItem('ESTATISTICAS', JSON.stringify(estatisticas));

        console.log(estatisticas)

        obterDadosGrafico(estatisticas.fkJogo);
    }

    function obterDadosGrafico(idJogoGol) {

        fetch(`/entrada/ultimasGol/${idJogoGol}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
                    plotarGrafico(resposta, idJogoGol);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                alert("Digite qual jogo deseja ver")
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
            dados.datasets[0].data.push(registro.Gol);
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
}

function atualizarAssistencia() {

    window.onload = exibirEstatisticasDoUsuario1();
    function exibirEstatisticasDoUsuario1() {
        let estatisticas = {
            fkUsuario: sessionStorage.ID_USUARIO,
            fkJogo: input_jogo_assistencia.value,
            idEstatisticas: btn_assistencia.value = 2
        };

        sessionStorage.setItem('ESTATISTICAS', JSON.stringify(estatisticas));

        console.log(estatisticas)

        obterDadosGrafico1(estatisticas.fkJogo);

    }

    function obterDadosGrafico1(idJogoAssistencia) {

        fetch(`/entrada/ultimasAssistencia/${idJogoAssistencia}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
                    plotarGrafico1(resposta, idJogoAssistencia);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

    function plotarGrafico1(resposta) {

        console.log('iniciando plotagem do gráfico...');

        // Criando estrutura para plotar gráfico - labels
        // Criando estrutura para plotar gráfico - dados
        let dados = {
            labels: [],
            datasets: [{
                label: 'Assistencia',
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
            dados.datasets[0].data.push(registro.Assistencia);
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
        const ctx1 = document.getElementById('myChart1');
        // Adicionando gráfico criado em div na tela
        if (Chart.getChart(ctx1)) {
            // Destruir o gráfico existente antes de criar um novo
            Chart.getChart(ctx1).destroy();
        }
        myChart1 = new Chart(ctx1, config)
    }
}

window.onload = obterGrafico();
window.onload = atualizarGrafico();


function obterGrafico() {

    fetch(`/entrada/graficoAssistencia`, { cache: 'no-store' }).then(function (response) {
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

    fetch(`/entrada/graficoGol`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                plotarGraficoGol(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoGol(resposta) {

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
        dados.datasets[0].data.push(registro.Gol);
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
            label: 'Assistencia',
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
        dados.datasets[0].data.push(registro.Assistencia);
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
    myChart = new Chart(ctx, config)
}
function sumirMensagem() {
    div_alert.style.display = "none";
}

function limparDiv() {
    div_jogo.innerHTML = ""
}

