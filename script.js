const form = document.querySelector(".card-form");
const creditCardInput = document.querySelector("#card-number-input");
const frontCardNumber = document.querySelector("#card-number");
const cardHolderInput = document.querySelector("#cardholder-name-input");
const frontCardHolderName = document.querySelector("#cardholder-name");
const MonthInput = document.querySelector("#month-exp-date-input");
const Month = document.querySelector("#month-exp-date");
const YearInput = document.querySelector("#year-exp-date-input");
const Year = document.querySelector("#year-exp-date");
const cvcInput = document.querySelector("#cvc-input");
const cvc = document.querySelector("#cvc");
form.addEventListener('submit', e => {
    e.preventDefault();
    validateCardNumber(creditCardInput.value);
    validateExpiryMonth(MonthInput.value);
    validateCVC(cvcInput.value);
    validateExpiryYear(YearInput.value);

    if (validateCardHolderName(cardHolderInput.value) && validateCardNumber(creditCardInput.value) && validateExpiryMonth(MonthInput.value) && validateExpiryYear(YearInput.value) && validateCVC(cvcInput.value)) {
        form.style.animation = "dissapear 1.5s ease forwards";
        form.addEventListener("animationend", () => {
            form.style.display = "none";
            document.querySelector(".right-container").innerHTML = completeStateContainer();
        })
    }
});
const completeStateContainer = (message = 'THANK YOU!',details = "We've added your card details") => {
    return `<div class="complete-state-container">
    <img src="./images/icon-complete.svg" />
    <span>${message}</span>
    <span>${details}</span>
    <button class="buttons" type="reset" onclick="location.reload()">
      Continue</button>
    </div>`;
}

const showError = (element, message) => {
    const inputControl = element.parentElement;
    let errorDisplay;
    
    if (inputControl.querySelector('.error') !== null) {
    errorDisplay = inputControl.querySelector('.error');
    } else if (inputControl.parentElement.querySelector('.error') !== null) {
    errorDisplay = inputControl.parentElement.querySelector('.error');
    } else {
    errorDisplay = inputControl.parentElement.parentElement.querySelector('.error');
    }
    
    
    errorDisplay.innerText = message;
    element.classList.add('input-error-border');Error
    element.classList.add('shake');
    setTimeout(() => {
    element.classList.remove('shake');
    }, 750);
    }

const showSuccess = (element) => {
    let inputControl = element.parentElement;
    while (inputControl && !inputControl.querySelector('.error')) {
        inputControl = inputControl.parentElement;
    }
    const errorDisplay = inputControl ? inputControl.querySelector('.error') : null;
    if (errorDisplay) {
        errorDisplay.innerText = '';
    }
    element.classList.remove('input-error-border');
};

function validateCardHolderName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    if (name !== "" && regex.test(name)) {
        showSuccess(cardHolderInput);
        return true;
    } else if (name == '') {
        showError(cardHolderInput, "Can't be blank");
        return false;
    } else {
        showError(cardHolderInput, "Wrong Format");
        return false;
    }
}

function validateCardNumber(number) {
    const regex = /[0-9 ]+/;
    if (number != "" && regex.test(number) && number.length == '19') {
        showSuccess(creditCardInput);
        return true;
    } else if (number == '') {
        showError(creditCardInput, "Can't be blank");
        return false;
    } else {
        showError(creditCardInput, "Wrong Format");
        return false;
    }
}

function validateExpiryMonth(month) {
    const regex = /^(0?[1-9]|1[012])$/;
    if (month != "" && regex.test(month) && month.length == '2') {
        showSuccess(MonthInput);
        return true;
    } else if (month == '') {
        showError(MonthInput, "Can't be blank");
        return false;
    } else {
        showError(MonthInput, "Wrong Format");
        return false;
    }
}
function validateExpiryYear(year) {
    const regex = /^(0?[1-9]|[1-9][0-9])$/;
    if (year != "" && regex.test(year) && year.length == '2') {
        showSuccess(YearInput);
        return true;
    } else if (year == '') {
        showError(YearInput, "Can't be blank");
        return false;
    } else {
        showError(YearInput, "Wrong Format");
        return false;
    }
}
function validateCVC(cvc) {
    const regex = /^[0-9]*$/;
    if (cvc != "" && regex.test(cvc) && cvc.length == '3') {
        showSuccess(cvcInput);
        return true;
    } else if (cvc == '') {
        showError(cvcInput, "Can't be blank");
        return false;
    } else {
        showError(cvcInput, "Wrong Format");
        return false;
    }
}

creditCardInput.addEventListener("input", (e) => {
    let inputVal = e.target.value;
    inputVal = inputVal.replace(/[^0-9]/g, "").replace(/(\d{4})/g, "$1 ");
    e.target.value = inputVal.trim();
    frontCardNumber.innerHTML = inputVal.trim() !== "" ? inputVal.trim() : "0000 0000 0000 0000";
});
cardHolderInput.addEventListener("input", (e) => {
    frontCardHolderName.innerHTML = e.target.value !== "" ? e.target.value.toUpperCase() : "JANE APPLESEED";
});
MonthInput.addEventListener("input", (e) => {
    Month.innerHTML = e.target.value != '' ? e.target.value : '00';
})
YearInput.addEventListener("input", (e) => {
    Year.innerHTML = e.target.value != '' ? e.target.value : '00';
})
cvcInput.addEventListener("input", (e) => {
    cvc.innerHTML = e.target.value != '' ? e.target.value : '000';
})