let number = prompt("Введите число от 0 до 9:");

number = parseInt(number);

switch (number) {
    case 0:
        alert("Спецсимвол: )");
        break;
    case 1:
        alert("Спецсимвол: !");
        break;
    case 2:
        alert("Спецсимвол: @");
        break;
    case 3:
        alert("Спецсимвол: #");
        break;
    case 4:
        alert("Спецсимвол: $");
        break;
    case 5:
        alert("Спецсимвол: %");
        break;
    case 6:
        alert("Спецсимвол: ^");
        break;
    case 7:
        alert("Спецсимвол: &");
        break;
    case 8:
        alert("Спецсимвол: *");
        break;
    case 9:
        alert("Спецсимвол: (");
        break;
    default:
        alert("Ошибка: введите число от 0 до 9.");
}