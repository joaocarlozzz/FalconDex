(function () {
    'use strict';

    //index
    var email = document.querySelector("#txtEmail");
    var senha = document.querySelector("#txtSenha");

    //BUTTONS
    var submit = document.querySelector("#btnEntrar");

    //form
    var form1 = document.querySelector("#form1");

    var validation = {
        email: false,
        password: false
    };

    email.addEventListener("keyup", e => {
        var emailTip = document.querySelector("[data-source='" + e.target.id + "']");
        var text = e.target.value;

        if (!validateEmail(text)) {
            emailTip.classList.remove("d-none");
            emailTip.textContent = "Digite um e-mail válido";
            e.target.classList.remove("is-valid");
            e.target.classList.add("is-invalid");
            validation.email = false;
        }
        else {
            emailTip.classList.toggle("d-none");
            e.target.classList.add("is-valid");
            e.target.classList.remove("is-invalid");
            emailTip.textContent = "";
            validation.email = true;
        }

        enabledButton();
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    senha.addEventListener("keyup", e => {

        var text = "";
        senhaTip.textContent = "";

        text = e.target.value;

        if (text.length < 8 || text.length > 32) {
            senhaTip.classList.remove("d-none");
            senhaTip.textContent = "Digite uma senha entre 8 e 32 caracteres";
            e.target.classList.remove("is-valid");
            e.target.classList.add("is-invalid");
            validation.password = false;
        }
        else {
            senhaTip.classList.toggle("d-none");
            e.target.classList.add("is-valid");
            e.target.classList.remove("is-invalid");
            senhaTip.textContent = "";
            validation.password = true;
        }

        enabledButton();
    });

    enabledButton();

    function enabledButton() {
        console.log(validation);

        if (validation.email == true && validation.password == true) {
            submit.removeAttribute("disabled");
        }
        else {
            submit.setAttribute("disabled", "true");
        }
    }

})();