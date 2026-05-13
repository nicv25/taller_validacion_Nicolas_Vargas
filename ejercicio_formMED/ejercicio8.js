class MedicalSystem {
    constructor(name, age, weight, height) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
    }

    validateName() {
        if (this.name === "") {
            return "El nombre es obligatorio";
        }

        if(this.name.length < 4){
            return "el nombre debe tener mas de 4 letras"
        }

        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.name)) {
            return "El nombre solo puede contener letras";
        }

        return "";
    }

    validateAge() {
        if (this.age === "") {
            return "La edad es obligatoria";
        }

        const regex = /^[0-9]+$/;
        if (!regex.test(this.age)) {
            return "Ingrese una edad válida";
        }

        if (parseInt(this.age) <= 0 || parseInt(this.age) > 120) {
            return "La edad debe estar entre 1 y 120 años";
        }

        return "";
    }

    validateWeight() {
        if (this.weight === "") {
            return "El peso es obligatorio";
        }

        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!regex.test(this.weight)) {
            return "Ingrese un peso válido";
        }

        if (parseFloat(this.weight) <= 0) {
            return "El peso debe ser mayor a 0";
        }

        return "";
    }

    validateHeight() {
        if (this.height === "") {
            return "La estatura es obligatoria";
        }

        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!regex.test(this.height)) {
            return "Ingrese una estatura válida";
        }

        if (parseFloat(this.height) <= 0) {
            return "La estatura debe ser mayor a 0";
        }

        return "";
    }

    calculateIMC() {
        const weightKg = parseFloat(this.weight);
        const heightM = parseFloat(this.height) / 100;
        return weightKg / (heightM * heightM);
    }

    classifyIMC(imc) {
        if (imc < 18.5) {
            return "Bajo peso";
        } else if (imc >= 18.5 && imc < 25) {
            return "Normal";
        } else {
            return "Sobrepeso";
        }
    }

    getClassificationClass(classification) {
        if (classification === "Bajo peso") return "underweight";
        if (classification === "Normal") return "normal";
        if (classification === "Sobrepeso") return "overweight";
        return "";
    }
}

document.getElementById("medicalForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    let medical = new MedicalSystem(name, age, weight, height);

    let errorName = medical.validateName();
    let errorAge = medical.validateAge();
    let errorWeight = medical.validateWeight();
    let errorHeight = medical.validateHeight();

    document.getElementById("errorName").innerHTML = errorName;
    document.getElementById("errorAge").innerHTML = errorAge;
    document.getElementById("errorWeight").innerHTML = errorWeight;
    document.getElementById("errorHeight").innerHTML = errorHeight;

    let inputName = document.getElementById("name");
    let inputAge = document.getElementById("age");
    let inputWeight = document.getElementById("weight");
    let inputHeight = document.getElementById("height");

    if (errorName !== "") {
        inputName.classList.add("error");
    } else {
        inputName.classList.remove("error");
    }

    if (errorAge !== "") {
        inputAge.classList.add("error");
    } else {
        inputAge.classList.remove("error");
    }

    if (errorWeight !== "") {
        inputWeight.classList.add("error");
    } else {
        inputWeight.classList.remove("error");
    }

    if (errorHeight !== "") {
        inputHeight.classList.add("error");
    } else {
        inputHeight.classList.remove("error");
    }

    let messageDiv = document.getElementById("mensaje");
    let resultCard = document.getElementById("resultCard");

    if (errorName === "" && errorAge === "" && errorWeight === "" && errorHeight === "") {
        let imc = medical.calculateIMC();
        let classification = medical.classifyIMC(imc);
        let classificationClass = medical.getClassificationClass(classification);

        document.getElementById("imcValue").innerHTML = imc.toFixed(2);
        document.getElementById("classificationText").innerHTML = classification;

        let classificationBadge = document.getElementById("classificationBadge");
        classificationBadge.className = `classification-badge ${classificationClass}`;

        resultCard.classList.add("show");

        messageDiv.innerHTML = "Paciente registrado exitosamente";
        messageDiv.className = "mensaje exito";
    } else {
        resultCard.classList.remove("show");
        messageDiv.innerHTML = "";
        messageDiv.className = "mensaje";
    }
});