function gols() {
    const nome = document.getElementById('input_nome_gol').value.trim().toLowerCase();
    const sobrenome = document.getElementById('input_sobrenome_gol').value.trim().toLowerCase();
    const gol = parseInt(document.getElementById('input_gols').value);
    const fkJogo = parseInt(document.getElementById('input_jogo').value);
    const assistencia = 0
    const fkUsuario = sessionStorage.ID_USUARIO
    let idEsta = btn_gols.value++
    const nomeSession = sessionStorage.NOME_USUARIO.toLowerCase()
    const sobrenomeSession = sessionStorage.SOBRENOME_USUARIO.toLowerCase()
    if (nome == "" || sobrenome == "" || isNaN(gol) || isNaN(fkJogo)) {
        div_resultado.innerHTML += `Por favor, preencha o nome completo do jogador, o jogo e a quantidade de gols.`;
    } else if (sobrenome != sobrenomeSession || nome != nomeSession) {
        div_resultado.innerHTML += ` Você não é o ${nomeSession} ${sobrenomeSession}`
    } else {
        const jogador = nome + " " + sobrenome;
        let chart = Chart.getChart('myChart');
        let jogadorIndex = chart.data.labels.indexOf(jogador);

        if (jogadorIndex != -1) {
            chart.data.datasets[0].data[jogadorIndex] += gol;
        } else {
            chart.data.labels.push(jogador);
            chart.data.datasets[0].data.push(gol);
        }
        sortChartData(chart);
        chart.update();
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
    if (nome == "" || sobrenome == "" || isNaN(assistencia) || isNaN(fkJogo)) {
        div_resultado.innerHTML += `Por favor, preencha o nome completo do jogador, o jogo e a quantidade de assistência.`;
    } else if (sobrenome != sobrenomeSession || nome != nomeSession) {
        div_resultado.innerHTML += ` Você não é o ${nomeSession} ${sobrenomeSession}`
    } else {
        const jogador = nome + " " + sobrenome;
        let chart = Chart.getChart('myChart1');
        let jogadorIndex = chart.data.labels.indexOf(jogador);

        if (jogadorIndex != -1) {
            chart.data.datasets[0].data[jogadorIndex] += assistencia;
        } else {
            chart.data.labels.push(jogador);
            chart.data.datasets[0].data.push(assistencia);
        }
        sortChartData(chart);
        chart.update();
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

function sortChartData(chart) {
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels;

    const dataWithLabels = data.map((value, index) => ({ value, label: labels[index] }));
    dataWithLabels.sort((a, b) => b.value - a.value);

    const top7Data = dataWithLabels.slice(0, 7);
    chart.data.datasets[0].data = top7Data.map(item => item.value);
    chart.data.labels = top7Data.map(item => item.label);
}


function sumirMensagem() {
    div_alert.style.display = "none";
}