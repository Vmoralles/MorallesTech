function gols() {
    const nome = document.getElementById('input_nome_gol').value.trim();
    const sobrenome = document.getElementById('input_sobrenome_gol').value.trim();
    const gol = parseInt(document.getElementById('input_gols').value);

    if (nome == "" || sobrenome == "" || isNaN(gol)) {
        alert('Por favor, preencha o nome completo do jogador e a quantidade de gols.');
    } else {
        const jogador = nome + " " + sobrenome;
        let chart = Chart.getChart('myChart');
        let playerIndex = chart.data.labels.indexOf(jogador);

        if (playerIndex !== -1) {
            chart.data.datasets[0].data[playerIndex] += gol;
        } else {
            chart.data.labels.push(jogador);
            chart.data.datasets[0].data.push(gol);
        }
        sortChartData(chart);
        chart.update();
    }
}

function assistencias() {
    const nome = document.getElementById('input_nome_assistencia').value.trim();
    const sobrenome = document.getElementById('input_sobrenome_assistencia').value.trim();
    const assistencia = parseInt(document.getElementById('input_assistencia').value);

    if (nome === "" || sobrenome === "" || isNaN(assistencia)) {
        alert('Por favor, preencha o nome completo do jogador e a quantidade de assistência.');
    } else {
        const jogador = nome + " " + sobrenome;
        let chart = Chart.getChart('myChart1');
        let playerIndex = chart.data.labels.indexOf(jogador);

        if (playerIndex !== -1) {
            chart.data.datasets[0].data[playerIndex] += assistencia;
        } else {
            chart.data.labels.push(jogador);
            chart.data.datasets[0].data.push(assistencia);
        }

        sortChartData(chart);
        chart.update();
    }
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