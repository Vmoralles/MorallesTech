function email() {
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
        let email = 'morallestech@gmail.com';

        let subject = assunto;

        let cc = 'morallestech@gmail.com';

        let body = `Boa tarde, obrigado por entrar em contato! Iremos analisar seu problema e tentar resolvê-lo o mais rápido possível.`;



        let mailtoLink = 'mailto:' + email +

            '?subject=' + encodeURIComponent(subject) +

            '&cc=' + cc +

            '&body=' + encodeURIComponent(body);



        window.open(mailtoLink, '_blank');


    };

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
}


