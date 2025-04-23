let circumference = prompt("Введите длину окружности:");

circumference = parseFloat(circumference);

let squarePerimeter = prompt("Введите периметр квадрата:");

squarePerimeter = parseFloat(squarePerimeter);

if (isNaN(circumference) || isNaN(squarePerimeter) || circumference <= 0 || squarePerimeter <= 0) {
    alert("Ошибка: введите корректные положительные числа для длины окружности и периметра квадрата.");
} else {
    let diameter = circumference / Math.PI;

    let sideLength = squarePerimeter / 4;

    if (diameter <= sideLength) {
        alert("Окружность может поместиться в указанный квадрат.");
    } else {
        alert("Окружность НЕ может поместиться в указанный квадрат.");
    }
}