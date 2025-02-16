const elements = {
    dayInput: document.getElementById('day'),
    monthInput: document.getElementById('month'),
    yearInput: document.getElementById('year'),
    dayResult: document.getElementById('DD'),
    monthResult: document.getElementById('MM'),
    yearResult: document.getElementById('YY'),
    form: document.querySelector('form')
};

// Data atual
const currentDate = new Date();
let [day, month, year] = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()];

// Dias dos meses
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Evento de envio do formulário
elements.form.addEventListener('submit', handleSubmit);

// Função para validar entrada do usuário
function validate() {
    let isValid = true;

    document.querySelectorAll('input').forEach(input => {
        const parent = input.parentElement;
        if (!input.value) {
            showError(input, "This field is required");
            isValid = false;
        } else if (input === elements.monthInput && input.value > 12) {
            showError(input, "Must be a valid month");
            isValid = false;
        } else if (input === elements.dayInput && input.value > 31) {
            showError(input, "Must be a valid day");
            isValid = false;
        } else {
            clearError(input);
        }
    });

    return isValid;
}

// Função para exibir erro nos campos
function showError(input, message) {
    input.style.borderColor = "red";
    input.parentElement.querySelector('small').innerText = message;
}

// Função para limpar erros
function clearError(input) {
    input.style.borderColor = "black";
    input.parentElement.querySelector('small').innerText = "";
}

// Função de envio e cálculo de idade
function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    let inputDay = parseInt(elements.dayInput.value);
    let inputMonth = parseInt(elements.monthInput.value);
    let inputYear = parseInt(elements.yearInput.value);

    let adjustedDay = day, adjustedMonth = month, adjustedYear = year;

    if (inputDay > adjustedDay) {
        adjustedDay += monthDays[adjustedMonth - 1];
        adjustedMonth--;
    }
    if (inputMonth > adjustedMonth) {
        adjustedMonth += 12;
        adjustedYear--;
    }

    // Cálculo da idade
    const result = {
        days: adjustedDay - inputDay,
        months: adjustedMonth - inputMonth,
        years: adjustedYear - inputYear
    };

    // Atualiza os resultados na tela
    elements.dayResult.innerText = result.days;
    elements.monthResult.innerText = result.months;
    elements.yearResult.innerText = result.years;
}