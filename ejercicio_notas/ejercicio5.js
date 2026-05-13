class GradeSystem {
    constructor(studentName, grade1, grade2, grade3) {
        this.studentName = studentName;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
    }

    validateStudentName() {
        // Empty field
        if (this.studentName === "") {
            return "El nombre es obligatorio";
        }

        if(this.studentName.length < 3){
            return "El nombre tiene que tener mas de 3 caracteres"
        }

        // Only letters and spaces
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.studentName)) {
            return "El nombre solo puede contener letras";
        }

        return "";
    }

    validateGrade(grade, gradeNumber) {
        // Empty field
        if (grade === "") {
            return `La nota ${gradeNumber} es obligatoria`;
        }

        // Validate number format
        const regex = /^[0-5](\.[0-9]{1,2})?$/;
        if (!regex.test(grade)) {
            return "Ingrese un número válido";
        }

        // Grade between 0 and 5
        const gradeValue = parseFloat(grade);
        if (gradeValue < 0 || gradeValue > 5) {
            return "La nota debe estar entre 0 y 5";
        }

        return "";
    }

    calculateAverage() {
        const g1 = parseFloat(this.grade1);
        const g2 = parseFloat(this.grade2);
        const g3 = parseFloat(this.grade3);
        
        return (g1 + g2 + g3) / 3;
    }

    getStatus(average) {
        return average >= 3.0 ? "Aprobado" : "Reprobado";
    }
}

document.getElementById("gradesForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    let studentName = document.getElementById("studentName").value;
    let grade1 = document.getElementById("grade1").value;
    let grade2 = document.getElementById("grade2").value;
    let grade3 = document.getElementById("grade3").value;

    // Create instance
    let gradeSystem = new GradeSystem(studentName, grade1, grade2, grade3);

    // Validate all fields
    let errorStudentName = gradeSystem.validateStudentName();
    let errorGrade1 = gradeSystem.validateGrade(grade1, 1);
    let errorGrade2 = gradeSystem.validateGrade(grade2, 2);
    let errorGrade3 = gradeSystem.validateGrade(grade3, 3);

    // Show errors
    document.getElementById("errorStudentName").innerHTML = errorStudentName;
    document.getElementById("errorGrade1").innerHTML = errorGrade1;
    document.getElementById("errorGrade2").innerHTML = errorGrade2;
    document.getElementById("errorGrade3").innerHTML = errorGrade3;

    // Get inputs to apply error class
    let inputStudentName = document.getElementById("studentName");
    let inputGrade1 = document.getElementById("grade1");
    let inputGrade2 = document.getElementById("grade2");
    let inputGrade3 = document.getElementById("grade3");

    // Apply/remove error class
    if (errorStudentName !== "") {
        inputStudentName.classList.add("error");
    } else {
        inputStudentName.classList.remove("error");
    }

    if (errorGrade1 !== "") {
        inputGrade1.classList.add("error");
    } else {
        inputGrade1.classList.remove("error");
    }

    if (errorGrade2 !== "") {
        inputGrade2.classList.add("error");
    } else {
        inputGrade2.classList.remove("error");
    }

    if (errorGrade3 !== "") {
        inputGrade3.classList.add("error");
    } else {
        inputGrade3.classList.remove("error");
    }

    // General message
    let messageDiv = document.getElementById("mensaje");
    let resultCard = document.getElementById("resultCard");

    if (errorStudentName === "" && errorGrade1 === "" && errorGrade2 === "" && errorGrade3 === "") {
        // Calculate average
        let average = gradeSystem.calculateAverage();
        let status = gradeSystem.getStatus(average);

        // Show result
        document.getElementById("average").innerHTML = average.toFixed(2);
        document.getElementById("statusText").innerHTML = status;

        // Apply status color
        let statusBadge = document.getElementById("statusBadge");
        if (status === "Aprobado") {
            statusBadge.className = "status-badge approved";
        } else {
            statusBadge.className = "status-badge failed";
        }

        // Show result card
        resultCard.classList.add("show");

        // Show success message
        messageDiv.innerHTML = "Notas registradas exitosamente";
        messageDiv.className = "mensaje exito";
    } else {
        // Hide result card if there are errors
        resultCard.classList.remove("show");
        messageDiv.innerHTML = "";
        messageDiv.className = "mensaje";
    }
});