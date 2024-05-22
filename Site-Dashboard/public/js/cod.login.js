function entrar() {


    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (senhaVar == "" || senhaVar == "") {
        div_alert.style.display = 'block';
        ddiv_alert.innerHTML = "PREENCHA TODOS <br> OS CAMPOS!"
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


            setTimeout(function () {
                window.location = "site_index.html";
            }, 1000); // apenas para exibir o loading



        } else {

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
