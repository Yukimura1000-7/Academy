function analyzeString(input) 
{
    let letters = 0;
    let digits = 0;
    let others = 0;

    for (let char of input) {
        if (/[a-zA-Zа-яА-Я]/.test(char))
        {
            letters++;
        } else if (/\d/.test(char)) 
        {
            digits++;
        } else {
            others++;
        }
    }

    return { letters, digits, others };
}

document.getElementById('analyzeButton').addEventListener('click', function () 
{
    const inputString = document.getElementById('inputString').value;

    if (!inputString) 
    {
        document.getElementById('result').textContent = "Ошибка: Введите строку.";
        return;
    }

    const stats = analyzeString(inputString);
    document.getElementById('result').innerHTML = `
        Букв: ${stats.letters}<br>
        Цифр: ${stats.digits}<br>
        Спец.символов: ${stats.others}
    `;
});