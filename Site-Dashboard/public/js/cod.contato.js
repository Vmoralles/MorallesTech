function enviar() {
    const nome = input_nome.value
    const email = sessionStorage.EMAIL_USUARIO
    const assunto = input_assunto.value
    const problema = input_problema.value
    const fkUsuario = sessionStorage.ID_USUARIO

    // verificação de campos
    if (assunto == "" ||
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
                    div_alert.innerHTML = ('E-mail enviado com sucesso!');
                } else {
                    div_alert.innerHTML = ('Erro ao enviar o e-mail. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                div_alert.innerHTML = ('Erro ao enviar o e-mail. Por favor, tente novamente.');
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
