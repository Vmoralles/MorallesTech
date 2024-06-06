// sessão
function validarSessao() {
    const email = sessionStorage.EMAIL_USUARIO;
    const nome = sessionStorage.NOME_USUARIO.toUpperCase()
    const sobrenome = sessionStorage.SOBRENOME_USUARIO.toUpperCase()

    var user = document.getElementById("nome_usuario");
    var sobreuser = document.getElementById("sobrenome_usuario");

    if (email != null && nome != null) {
        user.innerHTML = nome;
        sobreuser.innerHTML = sobrenome;
    } else {
        window.location = "site.login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../site.login.html";
}

// carregamento (loading)
function aguardar() {
    var loading = document.getElementById("loading-gif");
    loading.style.display = "inline";
}

function finalizarAguardar() {
    var loading = document.getElementById("loading-gif");
    loading.style.display = "none";

}


