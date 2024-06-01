function entrar() {


    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (senhaVar == "" || senhaVar == "") {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "PREENCHA TODOS <br> OS CAMPOS!"
    }


    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.SOBRENOME_USUARIO = json.sobrenome;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.FK_USUARIO = json.fkUsuario;
                sessionStorage.FK_JOGO = json.fkJogo;
                sessionStorage.ID_ESTA = json.idEsta;

                setTimeout(function () {
                    window.location = "site_index.html";
                }, 1000); // apenas para exibir o loading

            })

        } else {
            div_alert.innerHTML = "Email e/ou senha inválido(s)"
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}


function sumirMensagem() {
    div_alert.style.display = "none"
}
