class PasswordChangeSystem {
    constructor(currentPassword, newPassword, confirmPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    validateCurrentPassword() {
        
        if (this.currentPassword === "") {
            return "La contraseña actual es obligatoria";
        }

        
        if (this.currentPassword.length < 8) {
            return "La contraseña debe tener mínimo 8 caracteres";
        }

        return "";
    }

    validateNewPassword() {
        
        if (this.newPassword === "") {
            return "La nueva contraseña es obligatoria";
        }

        
        if (this.newPassword.length < 8) {
            return "La contraseña debe tener mínimo 8 caracteres";
        }

        
        if (!/[A-Z]/.test(this.newPassword)) {
            return "Debe contener al menos una mayúscula";
        }

        
        if (!/[0-9]/.test(this.newPassword)) {
            return "Debe contener al menos un número";
        }

       
        if (this.newPassword === this.currentPassword) {
            return "La nueva contraseña debe ser diferente a la actual";
        }

        return "";
    }

    validateConfirmPassword() {
       
        if (this.confirmPassword === "") {
            return "Debe confirmar la nueva contraseña";
        }

        
        if (this.confirmPassword !== this.newPassword) {
            return "Las contraseñas no coinciden";
        }

        return "";
    }

    getPasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return "weak";
        if (strength <= 4) return "medium";
        return "strong";
    }
}


document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (input.type === 'password') {
            input.type = 'text';
            this.querySelector('.eye-icon').style.color = '#6366f1';
        } else {
            input.type = 'password';
            this.querySelector('.eye-icon').style.color = '#9ca3af';
        }
    });
});


document.getElementById('newPassword').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (password.length === 0) {
        strengthBar.className = 'strength-bar';
        strengthText.textContent = '';
        strengthText.className = 'strength-text';
        return;
    }

    const tempSystem = new PasswordChangeSystem('', password, '');
    const strength = tempSystem.getPasswordStrength(password);
    
    strengthBar.className = `strength-bar ${strength}`;
    
    if (strength === 'weak') {
        strengthText.textContent = 'Débil';
        strengthText.className = 'strength-text weak';
    } else if (strength === 'medium') {
        strengthText.textContent = 'Media';
        strengthText.className = 'strength-text medium';
    } else {
        strengthText.textContent = 'Fuerte';
        strengthText.className = 'strength-text strong';
    }

   
    updateRequirements(password);
});


function updateRequirements(password) {
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqNumber = document.getElementById('req-number');

    
    if (password.length >= 8) {
        reqLength.classList.add('valid');
    } else {
        reqLength.classList.remove('valid');
    }

    
    if (/[A-Z]/.test(password)) {
        reqUppercase.classList.add('valid');
    } else {
        reqUppercase.classList.remove('valid');
    }

    
    if (/[0-9]/.test(password)) {
        reqNumber.classList.add('valid');
    } else {
        reqNumber.classList.remove('valid');
    }
}


document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    
    let currentPassword = document.getElementById('currentPassword').value;
    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    
    let passwordSystem = new PasswordChangeSystem(currentPassword, newPassword, confirmPassword);

    
    let errorCurrentPassword = passwordSystem.validateCurrentPassword();
    let errorNewPassword = passwordSystem.validateNewPassword();
    let errorConfirmPassword = passwordSystem.validateConfirmPassword();

 
    document.getElementById('errorCurrentPassword').innerHTML = errorCurrentPassword;
    document.getElementById('errorNewPassword').innerHTML = errorNewPassword;
    document.getElementById('errorConfirmPassword').innerHTML = errorConfirmPassword;

 
    let inputCurrentPassword = document.getElementById('currentPassword');
    let inputNewPassword = document.getElementById('newPassword');
    let inputConfirmPassword = document.getElementById('confirmPassword');

   
    if (errorCurrentPassword !== "") {
        inputCurrentPassword.classList.add('error');
        inputCurrentPassword.classList.remove('success');
    } else {
        inputCurrentPassword.classList.remove('error');
        inputCurrentPassword.classList.add('success');
    }

    if (errorNewPassword !== "") {
        inputNewPassword.classList.add('error');
        inputNewPassword.classList.remove('success');
    } else {
        inputNewPassword.classList.remove('error');
        inputNewPassword.classList.add('success');
    }

    if (errorConfirmPassword !== "") {
        inputConfirmPassword.classList.add('error');
        inputConfirmPassword.classList.remove('success');
    } else {
        inputConfirmPassword.classList.remove('error');
        inputConfirmPassword.classList.add('success');
    }

   
    let messageDiv = document.getElementById('mensaje');

    if (errorCurrentPassword === "" && errorNewPassword === "" && errorConfirmPassword === "") {
        messageDiv.innerHTML = "Contraseña cambiada exitosamente";
        messageDiv.className = "mensaje exito";
        
        
        setTimeout(() => {
            document.getElementById('passwordForm').reset();
            document.getElementById('strengthBar').className = 'strength-bar';
            document.getElementById('strengthText').textContent = '';
            document.querySelectorAll('.requirements-list li').forEach(li => li.classList.remove('valid'));
        }, 2000);
    } else {
        messageDiv.innerHTML = "";
        messageDiv.className = "mensaje";
    }
});