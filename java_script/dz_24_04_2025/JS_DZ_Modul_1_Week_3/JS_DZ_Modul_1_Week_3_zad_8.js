let daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

let currentIndex = 0;

while (true) {
    let continueLoop = confirm(`${daysOfWeek[currentIndex]}. Хотите увидеть следующий день?`);

    if (!continueLoop) {
        break;
    }

    currentIndex++;

    if (currentIndex >= daysOfWeek.length) {
        currentIndex = 0;
    }
}

alert("Программа завершена.");