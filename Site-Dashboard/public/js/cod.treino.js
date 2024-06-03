function gols() {
    const nome = document.getElementById('input_nome_gol').value.trim();
    const sobrenome = document.getElementById('input_sobrenome_gol').value.trim();
    const gol = parseInt(document.getElementById('input_gols').value);
    const fkUsuario = sessionStorage.ID_USUARIO
    const idArtilheiros = +1
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
        let proximaAtualizacao;
        window.onload = exibirEstatisticasDoUsuario();
        function exibirEstatisticasDoUsuario() {
            let artilheiros = {
                fkUsuario: fkUsuario,
                idArtilheiro: idArtilheiros
            };

            sessionStorage.setItem('Artilheiro', JSON.stringify(artilheiros));

            console.log(artilheiros)

            obterDadosGrafico(artilheiros);

            exibirEstatisticas(artilheiros);

        }

        function exibirEstatisticas(idArtilheiro) {
            let artilheiros = {
                fkUsuario: fkUsuario,
                idArtilheiro: idArtilheiros
            };

            // Converta o objeto JSON em uma string JSON e armazene na sessionStorage
            sessionStorage.setItem('ESTATISTICAS', JSON.stringify(artilheiros));
            let todosOsGraficos = artilheiros;

            for (i = 0; i < todosOsGraficos.length; i++) {
                // exibindo - ou não - o gráfico
                if (todosOsGraficos[i].id != idArtilheiro) {
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
            let graficoExibir = document.getElementById(`grafico${idArtilheiro}`);
            if (graficoExibir) {
                graficoExibir.classList.remove("display-none");
                graficoExibir.classList.add("display-block");

                // alterando estilo do botão
                let btnExibir = document.getElementById(`btn_gols${idArtilheiro}`);
                if (btnExibir) {
                    btnExibir.classList.remove("btn-white");
                    btnExibir.classList.add("btn-pink");
                }
            }
        }

        function obterDadosGrafico(idArtilheiro) {

            if (proximaAtualizacao != undefined) {
                clearTimeout(proximaAtualizacao);
            }

            fetch(`/entrada/ultimas/${idArtilheiro}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        resposta.reverse();
                        plotarGrafico(resposta, idArtilheiro);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });
        }

        function plotarGrafico(resposta, idArtilheiro) {

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

            setTimeout(() => atualizarGrafico(idArtilheiro, dados, myChart)), 2000;
        }

        function atualizarGrafico(idArtilheiro, dados, myChart) {



            fetch(`/entrada/tempo-real/${idArtilheiro}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (novoRegistro) {
                        console.log(idArtilheiro)
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
                        proximaAtualizacao = setTimeout(() => atualizarGrafico(idArtilheiro, dados, myChart), 2000);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idArtilheiro, dados, myChart), 2000);
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
    const fkUsuario = sessionStorage.ID_USUARIO
    const idMaestros = +1
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
        let proximaAtualizacao;
        window.onload = exibirEstatisticasDoUsuario();
        function exibirEstatisticasDoUsuario() {
            let maestros = {
                fkUsuario: fkUsuario,
                idMaestro: idMaestros
            };

            sessionStorage.setItem('Maestros', JSON.stringify(maestros));

            console.log(maestros)

            obterDadosGrafico(maestros);

            exibirEstatisticas(maestros);

        }

        function exibirEstatisticas(idMaestro) {
            let maestros = {
                fkUsuario: fkUsuario,
                idMaestro: idMaestros
            };

            // Converta o objeto JSON em uma string JSON e armazene na sessionStorage
            sessionStorage.setItem('ESTATISTICAS', JSON.stringify(maestros));
            let todosOsGraficos = maestros;

            for (i = 0; i < todosOsGraficos.length; i++) {
                // exibindo - ou não - o gráfico
                if (todosOsGraficos[i].id != idMaestro) {
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
            let graficoExibir = document.getElementById(`grafico${idMaestro}`);
            if (graficoExibir) {
                graficoExibir.classList.remove("display-none");
                graficoExibir.classList.add("display-block");

                // alterando estilo do botão
                let btnExibir = document.getElementById(`btn_gols${idMaestro}`);
                if (btnExibir) {
                    btnExibir.classList.remove("btn-white");
                    btnExibir.classList.add("btn-pink");
                }
            }
        }

        function obterDadosGrafico(idMaestro) {

            if (proximaAtualizacao != undefined) {
                clearTimeout(proximaAtualizacao);
            }

            fetch(`/entrada/ultimas/${idMaestro}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        resposta.reverse();
                        plotarGrafico(resposta, idMaestro);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });
        }

        function plotarGrafico(resposta, idMaestro) {

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

            setTimeout(() => atualizarGrafico(idMaestro, dados, myChart)), 2000;
        }

        function atualizarGrafico(idMaestro, dados, myChart) {



            fetch(`/entrada/tempo-real/${idArtilheiro}`, { cache: 'no-store' }).then(function (response) {
                if (response.ok) {
                    response.json().then(function (novoRegistro) {
                        console.log(idArtilheiro)
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
                            dados.datasets[0].data.push(novoRegistro[0].assistencia); // incluir uma nova medida de umidade

                            myChart.update();
                        }

                        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                        proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaestro, dados, myChart), 2000);
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaestro, dados, myChart), 2000);
                }
            })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });

        }

    }
    return false;
    }


