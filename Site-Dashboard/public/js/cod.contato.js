function enviar() {
    const nome = input_nome.value
    const email = input_email.value
    const assunto = input_assunto.value
    const problema = input_problema.value
    const fkUsuario = sessionStorage.ID_USUARIO

    // verificação de campos
    if (email == "" ||
        assunto == "" ||
        problema == "" ||
        fkUsuario == "" ||
        nome == "") {
        div_alert.innerHTML = "PREENCHA TODOS <br> OS CAMPOS!"

    } else {
        fetch('/contato/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                fkUsuarioServer: fkUsuario,
                nomeServer: nome,
                emailServer: email,
                assuntoServer: assunto,
                problemaServer: problema
            }),
        })
            .then(response => {
                if (response.ok) {
                    alert('E-mail enviado com sucesso!');
                } else {
                    alert('Erro ao enviar o e-mail. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao enviar o e-mail. Por favor, tente novamente.');
            });


        fetch("/contato/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                fkUsuarioServer: fkUsuario,
                nomeServer: nome,
                emailServer: email,
                assuntoServer: assunto,
                problemaServer: problema


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

function sumirMensagem() {
    div_alert.style.display = "none";
}
