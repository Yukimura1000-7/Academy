let result = "";

for (let i = 2; i <= 9; i++) {
    result += `Таблица умножения для числа ${i}:\n`;

    for (let j = 1; j <= 10; j++) {
        result += `${i} × ${j} = ${i * j}\n`;
    }

    result += "\n";
}

alert(result);