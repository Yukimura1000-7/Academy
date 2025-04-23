let money = prompt("Введите сумму денег в кошельке (в рублях):");

money = parseFloat(money);

let chocolatePrice = prompt("Введите цену одной шоколадки (в рублях):");

chocolatePrice = parseFloat(chocolatePrice);

if (isNaN(money) || isNaN(chocolatePrice) || money <= 0 || chocolatePrice <= 0) {
    alert("Ошибка: введите корректные положительные числа для суммы денег и цены шоколадки.");
} else {
    let chocolates = Math.floor(money / chocolatePrice);

    let change = money % chocolatePrice;

    alert(
        "Вы можете купить " + chocolates + " шоколадок.\n" +
        "У вас останется сдача: " + change.toFixed(2) + " рублей."
    );
}