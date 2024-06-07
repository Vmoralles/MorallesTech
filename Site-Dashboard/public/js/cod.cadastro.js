function registrar() {
    aguardar()
    const nome = input_nome.value
    const senha = input_senha.value
    const telefone = input_telefone.value
    const email = input_email.value
    const senhaConfirmada = input_senhaConfirmada.value
    const sobrenome = input_sobrenome.value
    let verificarLetraMaiuscula = false
    let verificarCaracterEspecial = false
    let caracteresEspeciais = ["!", "@", "#", "$", "%", "^", "&", "*", "()", ",", "?", "/", ":", "{}", "|", "<", ">",]
    let letrasMaiusculas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let senhaValidada = false



    // verificação de campos
    if (email == "" ||
        senha == "" ||
        telefone == "" ||
        senhaConfirmada == "" ||
        nome == "" ||
        sobrenome == "") {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "PREENCHA TODOS <br> OS CAMPOS!"
        finalizarAguardar();
        return false;
    }
    // verificação telefone
    else if (telefone.length < 11 || telefone.length > 11) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "O TELEFONE ESTA INCOMPLETO"
        finalizarAguardar();
        return false;
    }
    // verificação senha igual
    else if (senha != senhaConfirmada) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "AS SENHAS PRECISAM SER IGUAIS!"
        finalizarAguardar();
        return false;
    }
    // verificação email
    else if (email.indexOf("@") == -1 || email.indexOf(".") == -1 || email.indexOf("gmail") == -1) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "DIGITE UM E-MAIL VÁLIDO!"
        finalizarAguardar();
        return false;
    }
    // verificação de senha
    else if (senha.length < 8) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "A SENHA TEM QUE TER NO MINIMO 8 CARACTERES"
        finalizarAguardar();
        return false;
    }
    // verificação de caracter especial + letra maiuscula + for
    else {
        for (let senhaVerificiar = 0; senhaVerificiar < senha.length; senhaVerificiar++) {
            let char = senha[senhaVerificiar]
            if (caracteresEspeciais.indexOf(char) != -1) {
                verificarCaracterEspecial = true;
            }
            if (letrasMaiusculas.indexOf(char) != -1) {
                verificarLetraMaiuscula = true;
            }
        }
        if (verificarCaracterEspecial && verificarLetraMaiuscula) {
            senhaValidada = true
        }

        if (!senhaValidada) {
            div_alert.style.display = 'block';
            div_alert.innerHTML = "DIGITE UMA SENHA COM CARACTER ESPECIAL E LETRA MAISCULA"
            finalizarAguardar();
            return false;
        } else {
            sumirMensagem()
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // crie um atributo que recebe o valor recuperado aqui
                    // Agora vá para o arquivo routes/usuario.js
                    nomeServer: nome,
                    sobrenomeServer: sobrenome,
                    emailServer: email,
                    senhaServer: senha,
                    telefoneServer: telefone,


                }),
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);

                    if (resposta.ok) {
                        div_alert.style.display = "block";

                        div_alert.innerHTML.innerHTML =
                            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                        setTimeout(() => {
                            window.location = "site.login.html";
                        }, "2000");

                        limparFormulario();

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
}


function sumirMensagem() {
    div_alert.style.display = 'none';
}


