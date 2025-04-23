let usdAmount = prompt("Введите сумму в USD:");

usdAmount = parseFloat(usdAmount);

if (isNaN(usdAmount) || usdAmount <= 0) {
    alert("Ошибка: введите корректную положительную сумму.");
} else {
    let currency = prompt("Выберите валюту для конвертации (EUR, UAN, AZN):").toUpperCase();

    const EUR_RATE = 0.92; 
    const UAN_RATE = 37.5;
    const AZN_RATE = 1.7;

    let result;

    switch (currency) {
        case "EUR":
            result = usdAmount * EUR_RATE;
            alert(`Сумма в EUR: ${result.toFixed(2)}`);
            break;
        case "UAN":
            result = usdAmount * UAN_RATE;
            alert(`Сумма в UAN: ${result.toFixed(2)}`);
            break;
        case "AZN":
            result = usdAmount * AZN_RATE;
            alert(`Сумма в AZN: ${result.toFixed(2)}`);
            break;
        default:
            alert("Ошибка: выберите одну из доступных валют (EUR, UAN, AZN).");
    }
}