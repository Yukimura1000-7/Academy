let number = prompt("Введите число:");

if (isNaN(number) || number.trim() === "") {
    alert("Ошибка: введите корректное число.");
} else {
    let numberStr = Math.abs(number).toString();

    let digitCount = numberStr.length;

    alert(`Количество цифр в числе: ${digitCount}`);
}