class EmployeeSystem {
    constructor(name, position, salary, extraHours) {
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.extraHours = extraHours;
    }

    validateName() {
        // Empty field
        if (this.name === "") {
            return "El nombre es obligatorio";
        }

        // Only letters and spaces
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.name)) {
            return "El nombre solo puede contener letras";
        }

        return "";
    }

    validatePosition() {
        // Empty field
        if (this.position === "") {
            return "El cargo es obligatorio";
        }

        // Only letters and spaces
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.position)) {
            return "El cargo solo puede contener letras";
        }

        return "";
    }

    validateSalary() {
        // Empty field
        if (this.salary === "") {
            return "El salario es obligatorio";
        }

        // Validate number
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!regex.test(this.salary)) {
            return "Ingrese un salario válido";
        }

        // Salary greater than 0
        if (parseFloat(this.salary) <= 0) {
            return "El salario debe ser mayor a 0";
        }

        return "";
    }

    validateExtraHours() {
        // Empty field
        if (this.extraHours === "") {
            return "Las horas extras son obligatorias";
        }

        // Validate number
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!regex.test(this.extraHours)) {
            return "Ingrese un número válido de horas";
        }

        // Hours can't be negative
        if (parseFloat(this.extraHours) < 0) {
            return "Las horas extras no pueden ser negativas";
        }

        return "";
    }

    calculateTotalSalary() {
        // Value per extra hour (typically 1.5x or 2x the hourly rate)
        // Assuming 240 working hours per month and 1.5x for extra hours
        const baseSalary = parseFloat(this.salary);
        const hours = parseFloat(this.extraHours);
        const hourlyRate = baseSalary / 240; // Monthly salary / typical monthly hours
        const extraHourRate = hourlyRate * 1.5; // 1.5x for extra hours
        const extraPay = hours * extraHourRate;
        
        return baseSalary + extraPay;
    }
}

document.getElementById("employeeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    let name = document.getElementById("name").value;
    let position = document.getElementById("position").value;
    let salary = document.getElementById("salary").value;
    let extraHours = document.getElementById("extraHours").value;

    // Create instance
    let employee = new EmployeeSystem(name, position, salary, extraHours);

    // Validate all fields
    let errorName = employee.validateName();
    let errorPosition = employee.validatePosition();
    let errorSalary = employee.validateSalary();
    let errorExtraHours = employee.validateExtraHours();

    // Show errors
    document.getElementById("errorName").innerHTML = errorName;
    document.getElementById("errorPosition").innerHTML = errorPosition;
    document.getElementById("errorSalary").innerHTML = errorSalary;
    document.getElementById("errorExtraHours").innerHTML = errorExtraHours;

    // Get inputs to apply error class
    let inputName = document.getElementById("name");
    let inputPosition = document.getElementById("position");
    let inputSalary = document.getElementById("salary");
    let inputExtraHours = document.getElementById("extraHours");

    // Apply/remove error class
    if (errorName !== "") {
        inputName.classList.add("error");
    } else {
        inputName.classList.remove("error");
    }

    if (errorPosition !== "") {
        inputPosition.classList.add("error");
    } else {
        inputPosition.classList.remove("error");
    }

    if (errorSalary !== "") {
        inputSalary.classList.add("error");
    } else {
        inputSalary.classList.remove("error");
    }

    if (errorExtraHours !== "") {
        inputExtraHours.classList.add("error");
    } else {
        inputExtraHours.classList.remove("error");
    }

    // General message
    let messageDiv = document.getElementById("mensaje");
    let resultBox = document.getElementById("resultBox");

    if (errorName === "" && errorPosition === "" && errorSalary === "" && errorExtraHours === "") {
        // Calculate total salary
        let totalSalary = employee.calculateTotalSalary();
        
        // Show result
        document.getElementById("totalSalary").innerHTML = "$" + totalSalary.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        resultBox.classList.add("show");
        
        // Show success message
        messageDiv.innerHTML = "Empleado registrado exitosamente";
        messageDiv.className = "mensaje exito";
    } else {
        // Hide result box if there are errors
        resultBox.classList.remove("show");
        messageDiv.innerHTML = "";
        messageDiv.className = "mensaje";
    }
});