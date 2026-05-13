class register_students {
    constructor(name, lastname, email, age, program) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.program = program;
    }

    register_name() {
        if (this.name === "") {
            return "Nombre obligatorio";
        }

        if (this.name.length < 3) {
            return "Nombre debe tener al menos 3 caracteres";
        }
        
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.name)) {
            return "El nombre solo puede contener letras";
        }

        return "";
    }

    register_lastname() {
        if (this.lastname === "") {
            return "Apellido obligatorio";
        }

        if (this.lastname.length < 3) {
            return "Apellido debe tener al menos 3 caracteres";
        }


        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.lastname)) {
            return "El apellido solo puede contener letras";
        }

        return "";
    }

    register_email() {
        if (this.email === "") {
            return "Email obligatorio";
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(this.email)) {
            return "El correo no es válido";
        }
        
        return "";
    }

    register_age() {
        if (this.age === "") {
            return "Edad obligatoria";
        }


        const regex = /^[0-9]+$/;
        if (!regex.test(this.age)) {
            return "La edad solo puede contener números";
        }

        if (parseInt(this.age) <= 14) {
            return "Edad debe ser mayor a 14 años";
        }

        return "";
    }

    register_program() {
        if (this.program === "") {
            return "Programa obligatorio";
        }

        if (this.program.length < 3) {
            return "Programa debe tener al menos 3 caracteres";
        }

        return "";
    }
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores
    let name = document.getElementById("name").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let program = document.getElementById("program").value;

    // Crear instancia
    let register = new register_students(name, lastname, email, age, program);
    
    // Validar todos los campos
    let error_name = register.register_name();
    let error_lastname = register.register_lastname();
    let error_email = register.register_email();
    let error_age = register.register_age();
    let error_program = register.register_program();

    // Mostrar mensajes de error
    document.getElementById("errorName").innerHTML = error_name;
    document.getElementById("errorLastname").innerHTML = error_lastname;
    document.getElementById("errorEmail").innerHTML = error_email;
    document.getElementById("errorAge").innerHTML = error_age;
    document.getElementById("errorProgram").innerHTML = error_program;

    // Obtener inputs para agregar/quitar clase error
    let inputName = document.getElementById("name");
    let inputLastname = document.getElementById("lastname");
    let inputEmail = document.getElementById("email");
    let inputAge = document.getElementById("age");
    let inputProgram = document.getElementById("program");

    // Aplicar clase de error en cada campo
    if (error_name !== "") {
        inputName.classList.add("error");
    } else {
        inputName.classList.remove("error");
    }

    if (error_lastname !== "") {
        inputLastname.classList.add("error");
    } else {
        inputLastname.classList.remove("error");
    }

    if (error_email !== "") {
        inputEmail.classList.add("error");
    } else {
        inputEmail.classList.remove("error");
    }

    if (error_age !== "") {
        inputAge.classList.add("error");
    } else {
        inputAge.classList.remove("error");
    }

    if (error_program !== "") {
        inputProgram.classList.add("error");
    } else {
        inputProgram.classList.remove("error");
    }

    // Mensaje general
    let mensajeDiv = document.getElementById("mensaje");

    // validar TODOS los campos
    if (error_name === "" && error_lastname === "" && error_email === "" && error_age === "" && error_program === "") {
        mensajeDiv.innerHTML = "Registro exitoso";
        mensajeDiv.className = "mensaje exito";
    } else {
        mensajeDiv.innerHTML = "";
        mensajeDiv.className = "mensaje";
    }
});