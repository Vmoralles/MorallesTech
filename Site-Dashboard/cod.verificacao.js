function registrar() {
    const senha = input_senha.value
    const telefone = input_telefone.value
    const email = input_email.value
    const senhaConfirmada = input_senhaConfirmada.value
    let verificarLetraMaiuscula = false
    let verificarCaracterEspecial = false
    let caracteresEspeciais = ["!","@","#","$","%","^","&","*","()",",","?","/",":","{}","|","<",">",]
    let letrasMaiusculas = ["A", "B", "C", "D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let senhaValidada = false



    // verificação de campos
    if (email == "" ||
        senha == "" ||
        telefone == "" ||
        senhaConfirmada == "") {
        div_alert.innerHTML = "PREENCHA TODOS <br> OS CAMPOS!"

    }
    // verificação telefone
    else if (telefone.length < 11 || telefone.length > 11) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "O TELEFONE NÃO ESTA COMPLETO!"
    }
    // verificação senha igual
    else if (senha != senhaConfirmada) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "AS SENHAS PRECISAM SER IGUAIS!"
    }
    // verificação email
    else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "DIGITE UM E-MAIL VÁLIDO!"
    }
    // verificação de senha
    else if (senha.length < 8) {
        div_alert.style.display = 'block';
        div_alert.innerHTML = "A SENHA TEM QUE TER NO MINIMO 8 CARACTERES"
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

        if (senhaValidada) {
            window.location.href = "site.login.html";
        } else {
            div_alert.style.display = 'block';
            div_alert.innerHTML = "DIGITE UMA SENHA COM CARACTER ESPECIAL E LETRA MAISCULA"
        }
    }
}

function login(){
    div_alert.innerHTML = " "
    const email = input_email.value
    const senha = input_senha.value

    if(email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        div_alert.innerHTML = "DIGITE UM E-MAIL EXISTENTE"
    } else if(senha != 1){
        div_alert.innerHTML = "DIGITE UMA SENHA EXISTENTE"
    } else {
        window.location.href = "site.index.html";
    }
}