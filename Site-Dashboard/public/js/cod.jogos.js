function gols() {
    const nome = document.getElementById('input_nome_gol').value.trim().toLowerCase();
    const sobrenome = document.getElementById('input_sobrenome_gol').value.trim().toLowerCase();
    const gol = parseInt(document.getElementById('input_gols').value);
    const fkJogo = parseInt(document.getElementById('input_jogo').value);
    const assistencia = 0
    const fkUsuario = sessionStorage.ID_USUARIO
    let idEsta = btn_gols.value = 1
    const nomeSession = sessionStorage.NOME_USUARIO.toLowerCase()
    const sobrenomeSession = sessionStorage.SOBRENOME_USUARIO.toLowerCase()
    limparDiv()
    if (nome == "" || sobrenome == "" || isNaN(gol) || isNaN(fkJogo)) {
        div_jogo.innerHTML = `Por favor, preencha o nome completo do jogador, o jogo e a quantidade de gols.`;
    } else if (sobrenome != sobrenomeSession || nome != nomeSession) {
        div_jogo.innerHTML = ` Você não é o ${nomeSession} ${sobrenomeSession}`
    } else {

        fetch("/entrada/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                fkUsuarioServer: fkUsuario,
                fkJogoServer: fkJogo,
                idEstaServer: idEsta,
                nomeServer: nome,
                sobrenomeServer: sobrenome,
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

        let proximaAtualizacao;
        window.onload = exibirEstatisticasDoUsuario();
        function exibirEstatisticasDoUsuario() {
            let estatisticas = {
                fkUsuario: fkUsuario,
                fkJogo: fkJogo,
                idEstatisticas: idEsta
            };

            sessionStorage.setItem('ESTATISTICAS', JSON.stringify(estatisticas));

            console.log(estatisticas)

            obterDadosGrafico(estatisticas.fkJogo);

            exibirEstatisticas(estatisticas);

        }

        function exibirEstatisticas(idJogo) {
            let estatisticas = {
                fkUsuario: fkUsuario,
                fkJogo: fkJogo,
                idEstatisticas: idEsta
            };

            // Converta o objeto JSON em uma string JSON e armazene na sessionStorage
            sessionStorage.setItem('ESTATISTICAS', JSON.stringify(estatisticas));
            let todosOsGraficos = estatisticas;

            for (i = 0; i < todosOsGraficos.length; i++) {
                // exibindo - ou não - o gráfico
                if (todosOsGraficos[i].id != idJogo) {
                    let elementoAtual = document.getElementById(`grafico${todosOsGraficos[i].id}`)
                    if (elementoAtual.classList.contains("display-block")) {
                        elementoAtual.classList.remove("display-block")
                    }
                    elementoAtual.classList.add("display-none")

                    // alterando estilo do botão
                    let btnAtual = document.getElementById(`btn_gols${todosOsGraficos[i].id}`)
                    if (btnAtual.classList.contains("btn-pink")) {
                        btnAtual.classList.remove("btn-pink")
                    }
                    btnAtual.classList.add("btn-white")
                }
            }

            // exibindo - ou não - o gráfico
            let graficoExibir = document.getElementById(`grafico${idJogo}`);
            if (graficoExibir) {
                graficoExibir.classList.remove("display-none");
                graficoExibir.classList.add("display-block");

                // alterando estilo do botão
                let btnExibir = document.getElementById(`btn_gols${idJogo}`);
                if (btnExibir) {
                    btnExibir.classList.remove("btn-white");
                    btnExibir.classList.add("btn-pink");
                }
            }
        }

        function obterDadosGrafico(idJogo) {

            if (proximaAtualizacao != undefined) {
                clearTimeout(proximaAtualizacao);
            }

            fetch(`/entrada/ultimas/${idJogo}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        resposta.reverse();
                        plotarGrafico(resposta, idJogo);

                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });
        }

        function plotarGrafico(resposta, idJogo) {

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
                dados.labels.push(registro.nome);
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

            setTimeout(() => atualizarGrafico(idJogo, dados, myChart)), 2000;
        }

        function atualizarGrafico(idJogo, dados, myChart) {



            fetch(`/entrada/tempo-real/${idJogo}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (novoRegistro) {
                        console.log(idJogo)
                        // obterDadosGrafico(idJogo);
                        // alertar(novoRegistro, idAquario);
                        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                        console.log(`Dados atuais do gráfico:`);
                        console.log(dados);

                        // let avisoCaptura = document.getElementById(`avisoCaptura${idJogo}`)
                        // avisoCaptura.innerHTML = ""


                        if (novoRegistro[0].nome == dados.labels[dados.labels.length - 1]) {
                            console.log("---------------------------------------------------------------")
                            console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                            // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                            console.log("Horário do novo dado capturado:")
                            console.log(novoRegistro[0])
                            console.log("Horário do último dado capturado:")
                            console.log(dados.labels[dados.labels.length - 1])
                            console.log("---------------------------------------------------------------")
                        } else {
                            // tirando e colocando valores no gráfico
                            dados.labels.shift(); // apagar o primeiro
                            dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                            dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                            dados.datasets[0].data.push(novoRegistro[0].gol); // incluir uma nova medida de umidade

                            myChart.update();
                        }

                        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                        proximaAtualizacao = setTimeout(() => atualizarGrafico(idJogo, dados, myChart), 2000);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idJogo, dados, myChart), 2000);
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });

        }

    }
    return false;
}



function assistencias() {
    const nome = document.getElementById('input_nome_assistencia').value.trim();
    const sobrenome = document.getElementById('input_sobrenome_assistencia').value.trim();
    const assistencia = parseInt(document.getElementById('input_assistencia').value);
    const fkJogo = parseInt(document.getElementById('input_jogo').value);
    const gol = 0
    const fkUsuario = sessionStorage.SOBRENOME_USUARIO
    let idEsta = btn_assistencia.value + 2
    const nomeSession = sessionStorage.NOME_USUARIO.toLowerCase()
    const sobrenomeSession = sessionStorage.SOBRENOME_USUARIO.toLowerCase()
    limparDiv()
    if (nome == "" || sobrenome == "" || isNaN(assistencia) || isNaN(fkJogo)) {
        div_jogo.innerHTML += `Por favor, preencha o nome completo do jogador, o jogo e a quantidade de assistência.`;
    } else if (sobrenome != sobrenomeSession || nome != nomeSession) {
        div_jogo.innerHTML += ` Você não é o ${nomeSession} ${sobrenomeSession}`
    } else {


    }

    fetch("/entrada/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            fkUsuarioServer: fkUsuario,
            fkJogoServer: fkJogo,
            idEstaServer: idEsta,
            nomeServer: nome,
            sobrenomeServer: sobrenome,
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


function sumirMensagem() {
    div_alert.style.display = "none";
}

function limparDiv() {
    div_jogo.innerHTML = ""
}

