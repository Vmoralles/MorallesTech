function gols() {
    const nome = document.getElementById('input_nome_gol').value.trim();
    const sobrenome = document.getElementById('input_sobrenome_gol').value.trim();
    const gol = parseInt(document.getElementById('input_gols').value);
    const fkUsuario = sessionStorage.ID_USUARIO
    if (nome == "" || sobrenome == "" || isNaN(gol)) {
        div_resultado.innerHTML += `Por favor, preencha o nome completo do jogador e a quantidade de gols.`;
    } else {
        fetch("/artilheiro/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome,
                sobrenomeServer: sobrenome,
                golServer: gol,
                fkUsuarioServer: fkUsuario,
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
    const nome = document.getElementById('input_nome_assistencia').value.trim();
    const sobrenome = document.getElementById('input_sobrenome_assistencia').value.trim();
    const assistencia = parseInt(document.getElementById('input_assistencia').value);
    const fkUsuario = sessionStorage.ID_USUARIO
    if (nome === "" || sobrenome === "" || isNaN(assistencia)) {
        div_treino.innerHTML += `Por favor, preencha o nome completo do jogador e a quantidade de assistência.`;
    } else {
        fetch("/maestro/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nome,
                sobrenomeServer: sobrenome,
                assistenciaServer: assistencia,
                fkUsuarioServer: fkUsuario,
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

    fetch(`/artilheiro/ultimas`, { cache: 'no-store' }).then(function (response) {
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
            dados.datasets[0].data.push(registro.gol);
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

    fetch(`/maestro/ultimas`, { cache: 'no-store' }).then(function (response) {
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

    function plotarGrafico(resposta) {

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
            dados.datasets[0].data.push(registro.assistencia);
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
    }
}
