class ReservationSystem {
    constructor(name, people, date, time) {
        this.name = name;
        this.people = people;
        this.date = date;
        this.time = time;
    }

    validateName() {
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

    validatePeople() {

        if (this.people === "") {
            return "El número de personas es obligatorio";
        }


        const regex = /^[0-9]+$/;
        if (!regex.test(this.people)) {
            return "Ingrese un número válido";
        }


        if (parseInt(this.people) <= 0) {
            return "El número de personas debe ser mayor a 0";
        }

        return "";
    }

    validateDate() {

        if (this.date === "") {
            return "La fecha es obligatoria";
        }


        const selectedDate = new Date(this.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        if (selectedDate < today) {
            return "La fecha no puede ser en el pasado";
        }

        return "";
    }

    validateTime() {

        if (this.time === "") {
            return "La hora es obligatoria";
        }


        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(this.time)) {
            return "Formato de hora inválido";
        }

        const [hours, minutes] = this.time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        const openingTime = 11 * 60; 
        const closingTime = 23 * 60; 

        if (timeInMinutes < openingTime || timeInMinutes > closingTime) {
            return "El horario de atención es de 11:00 AM a 11:00 PM";
        }

        return "";
    }
}

document.getElementById("reservaForm").addEventListener("submit", function (e) {
    e.preventDefault();


    let name = document.getElementById("nombre").value;
    let people = document.getElementById("personas").value;
    let date = document.getElementById("fecha").value;
    let time = document.getElementById("hora").value;


    let reservation = new ReservationSystem(name, people, date, time);


    let errorName = reservation.validateName();
    let errorPeople = reservation.validatePeople();
    let errorDate = reservation.validateDate();
    let errorTime = reservation.validateTime();


    document.getElementById("errorNombre").innerHTML = errorName;
    document.getElementById("errorPersonas").innerHTML = errorPeople;
    document.getElementById("errorFecha").innerHTML = errorDate;
    document.getElementById("errorHora").innerHTML = errorTime;


    let inputName = document.getElementById("nombre");
    let inputPeople = document.getElementById("personas");
    let inputDate = document.getElementById("fecha");
    let inputTime = document.getElementById("hora");

    if (errorName !== "") {
        inputName.classList.add("error");
    } else {
        inputName.classList.remove("error");
    }

    if (errorPeople !== "") {
        inputPeople.classList.add("error");
    } else {
        inputPeople.classList.remove("error");
    }

    if (errorDate !== "") {
        inputDate.classList.add("error");
    } else {
        inputDate.classList.remove("error");
    }

    if (errorTime !== "") {
        inputTime.classList.add("error");
    } else {
        inputTime.classList.remove("error");
    }


    let messageDiv = document.getElementById("mensaje");

    if (errorName === "" && errorPeople === "" && errorDate === "" && errorTime === "") {
        messageDiv.innerHTML = "Reserva registrada correctamente";
        messageDiv.className = "mensaje exito";
        

    } else {
        messageDiv.innerHTML = "";
        messageDiv.className = "mensaje";
    }
});