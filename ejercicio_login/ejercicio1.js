class Login {
    constructor(user, password) {
        this.user = user;
        this.password = password;
    }

    login_user() {
        
        if (this.user === "") {
            return "El usuario es obligatorio";
        }
        
        if (this.user.length < 4) {
            return "El usuario debe tener mínimo 4 caracteres";
        }
        
        return "";
    }

    login_password() {
        
        if (this.password === "") {
            return "La contraseña es obligatoria";
        }
        
        if (this.password.length < 8) {
            return "La contraseña debe tener mínimo 8 caracteres";
        }
        
        return "";
    }
}

// Evento del formulario
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Obtener valores de los inputs
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    
    // Crear instancia de Login
    let login = new Login(user, password);
    
    // Validar usuario y contraseña
    let error_user = login.login_user();
    let error_password = login.login_password();
    
    // Mostrar errores específicos de cada campo
    document.getElementById("errorUsuario").innerHTML = error_user;
    document.getElementById("errorPassword").innerHTML = error_password;
    
    // Obtener los inputs para agregar/quitar clase de error
    let inputUsuario = document.getElementById("usuario");
    let inputPassword = document.getElementById("password");
    
    // Aplicar clase de error si hay errores
    if (error_user !== "") {
        inputUsuario.classList.add("error");
    } else {
        inputUsuario.classList.remove("error");
    }
    
    if (error_password !== "") {
        inputPassword.classList.add("error");
    } else {
        inputPassword.classList.remove("error");
    }
    
    // Mensaje general
    let mensajeDiv = document.getElementById("mensaje");
    
    if (error_user === "" && error_password === "") {
        // Todo correcto - Acceso permitido
        mensajeDiv.innerHTML = "Acceso permitido";
        mensajeDiv.className = "mensaje exito";
    } else {
        // Hay errores
        mensajeDiv.innerHTML = "";
        mensajeDiv.className = "mensaje";
    }
});