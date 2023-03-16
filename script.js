const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submitButton = document.querySelector("button");
const creditCardInput = document.querySelector("#card-number-input");
const frontCardNumber = document.querySelector("#card-number");
const cardHolderInput = document.querySelector("#cardholder-name-input");
const frontCardHolderName = document.querySelector("#cardholder-name");
creditCardInput.setAttribute("maxlength", "19");
creditCardInput.setAttribute("pattern", "^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$");

inputs.forEach((input) => {
    input.setAttribute("required", '');
})

form.addEventListener('submit', function(event) {
    event.preventDefault();
    inputs.forEach((inputField) => {
        if (!inputField.checkValidity()) {
            inputField.classList.add('input-error');
            setTimeout(() => {
                inputField.classList.remove('input-error');
            }, 500);
        } else {
            inputField.classList.remove('input-error');
        }
    });
    if (form.checkValidity()) {
        form.submit();
    }
});


creditCardInput.addEventListener("input", (e) => {
    let inputVal = e.target.value;
    inputVal = inputVal.replace(/[^0-9]/g, '');
    inputVal = inputVal.replace(/(\d{4})/g, '$1 ');
    e.target.value = inputVal.trim();
    if (inputVal.trim() != '') {
        frontCardNumber.innerHTML = inputVal.trim();
    } else {
        frontCardNumber.innerHTML = '0000 0000 0000 0000'
    }
});

cardHolderInput.addEventListener("input", (e) => {
    let inputVal = e.target.value;
    const pattern = /^[a-zA-Z]*$/;
    if (inputVal != '') {
        frontCardHolderName.innerHTML = inputVal.toUpperCase();
    } else {
        frontCardHolderName.innerHTML = "JANE APPLESEED";
    }
})