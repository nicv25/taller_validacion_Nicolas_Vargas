class VirtualStore {
    constructor(product, price, quantity) {
        this.product = product;
        this.price = price;
        this.quantity = quantity;
    }

    validateProduct() {
        if (this.product === "") {
            return "El producto es obligatorio";
        }

        if (this.product.length < 2 ){
            return "el producto debe ser mayor a 2 letras"
        }

        const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(this.product)) {
            return "El producto solo puede contener letras y números";
        }

        return "";
    }

    validatePrice() {
        if (this.price === "") {
            return "El precio es obligatorio";
        }

        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!regex.test(this.price)) {
            return "Ingrese un precio válido";
        }

        if (parseFloat(this.price) <= 0) {
            return "El precio debe ser mayor a 0";
        }

        return "";
    }

    validateQuantity() {
        if (this.quantity === "") {
            return "La cantidad es obligatoria";
        }

        const regex = /^[0-9]+$/;
        if (!regex.test(this.quantity)) {
            return "Ingrese una cantidad válida";
        }

        if (parseInt(this.quantity) <= 0) {
            return "La cantidad debe ser mayor a 0";
        }

        return "";
    }

    calculateSubtotal() {
        return parseFloat(this.price) * parseInt(this.quantity);
    }

    calculateIVA(subtotal) {
        return subtotal * 0.19;
    }

    calculateTotal(subtotal, iva) {
        return subtotal + iva;
    }
}

document.getElementById("storeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let product = document.getElementById("product").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;

    let store = new VirtualStore(product, price, quantity);

    let errorProduct = store.validateProduct();
    let errorPrice = store.validatePrice();
    let errorQuantity = store.validateQuantity();

    document.getElementById("errorProduct").innerHTML = errorProduct;
    document.getElementById("errorPrice").innerHTML = errorPrice;
    document.getElementById("errorQuantity").innerHTML = errorQuantity;

    let inputProduct = document.getElementById("product");
    let inputPrice = document.getElementById("price");
    let inputQuantity = document.getElementById("quantity");

    if (errorProduct !== "") {
        inputProduct.classList.add("error");
    } else {
        inputProduct.classList.remove("error");
    }

    if (errorPrice !== "") {
        inputPrice.classList.add("error");
    } else {
        inputPrice.classList.remove("error");
    }

    if (errorQuantity !== "") {
        inputQuantity.classList.add("error");
    } else {
        inputQuantity.classList.remove("error");
    }

    let messageDiv = document.getElementById("mensaje");
    let resultCard = document.getElementById("resultCard");

    if (errorProduct === "" && errorPrice === "" && errorQuantity === "") {
        let subtotal = store.calculateSubtotal();
        let iva = store.calculateIVA(subtotal);
        let total = store.calculateTotal(subtotal, iva);

        document.getElementById("subtotal").innerHTML = "$" + subtotal.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById("iva").innerHTML = "$" + iva.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById("total").innerHTML = "$" + total.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        resultCard.classList.add("show");

        messageDiv.innerHTML = "Compra procesada exitosamente";
        messageDiv.className = "mensaje exito";
    } else {
        resultCard.classList.remove("show");
        messageDiv.innerHTML = "";
        messageDiv.className = "mensaje";
    }
});