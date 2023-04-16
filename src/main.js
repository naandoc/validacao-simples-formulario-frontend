(function () {
    const formu = document.querySelector("form");

    formu.addEventListener("submit", e => {
        e.preventDefault();

        validInputs();

        if (validInputs()) formu.submit();
    })

    

    // Funções
    const validInputs = () => {
        let valid = true;
        
        const ipts = document.querySelectorAll("input");

        for (const errorSpan of document.querySelectorAll("form span")) {
            errorSpan.remove();
        }

        for (const input of ipts) {
            const nameInput = input.previousElementSibling;
            if (input.value === "") {
                emptyInput(nameInput, "nome:", "nome", input);
                emptyInput(nameInput, "sobrenome:", "sobrenome", input);
                emptyInput(nameInput, "cpf:", "CPF", input);
                emptyInput(nameInput, "usuário:", "usuário", input);
                emptyInput(nameInput, "senha:", "senha", input);

                valid = false;
            }
        }

        if (!validInputCpf() || !validPasswords()) return false;

        return valid;
    }

    const emptyInput = (nameInput, inputName, inputNameSpan, input) => {
        if (nameInput.innerText.toLowerCase() == inputName) {
            const span = createSpan("span", "input-error");
            span.innerText = `O campo ${inputNameSpan} não pode estar vazio`;

            document.querySelector("form").insertBefore(span, input);
        }
    }

    const validCpf = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;

        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        // Valida 1o digito	
        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;

        // Valida 2o digito	
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;
    }

    const validInputCpf = () => {
        const iptCpf = document.querySelector(".cpf");        

        if (!validCpf(iptCpf.value)) {
            const form = document.querySelector("form");
            const spanErrorCpf = createSpan("span", "input-error");
            spanErrorCpf.innerText = "CPF inválido!";
            form.insertBefore(spanErrorCpf, iptCpf);
            
            return false;
        }

        return true;
    }

    const validPasswords = () => {
        const password = document.querySelector(".password");
        const confirmPassword = document.querySelector(".confirm-password");

        if (password.value !== confirmPassword.value) {
            const form = document.querySelector("form");
            const spanErrorPassword = createSpan("span", "input-error");
            spanErrorPassword.innerText = "As senhas precisam ser iguais!";
            form.insertBefore(spanErrorPassword, password);

            return false;
        }

        return true;
    }

    const createSpan = (el, classAdd) => {
        const element = document.createElement(el);
        element.classList.add(classAdd);

        return element;
    }

})()