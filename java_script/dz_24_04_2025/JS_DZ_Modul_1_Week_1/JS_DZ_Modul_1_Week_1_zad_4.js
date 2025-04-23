let radius = prompt("Введите радиус окружности:");

radius = parseFloat(radius);

if (isNaN(radius) || radius <= 0) {
    alert("Ошибка: введите корректное положительное число для радиуса.");
} else {
    let area = Math.PI * Math.pow(radius, 2);

    alert("Площадь окружности с радиусом " + radius + " равна:\n" + area.toFixed(2));
}