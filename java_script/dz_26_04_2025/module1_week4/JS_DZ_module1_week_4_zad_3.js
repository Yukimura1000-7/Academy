function combineDigitsToNumber(digit1, digit2, digit3)
{
    if (!Number.isInteger(digit1) || !Number.isInteger(digit2) || !Number.isInteger(digit3) ||
        digit1 < 0 || digit1 > 9 || digit2 < 0 || digit2 > 9 || digit3 < 0 || digit3 > 9) {
        throw new Error("Все аругменты должны быть цифрами (0-9).");
    }


    const combinedString = `${digit1}${digit2}${digit3}`;
    return parseInt(combinedString, 10);
}

document.getElementById('combineButton').addEventListener('click', function () 
{
    try
    {
        const digit1 = parseInt(document.getElementById('digit1').value, 10);
        const digit2 = parseInt(document.getElementById('digit2').value, 10);
        const digit3 = parseInt(document.getElementById('digit3').value, 10);

        if (isNaN(digit1) || isNaN(digit2) || isNaN(digit3)) 
        {
            throw new Error("Неверный формат.");
        }

        const result = combineDigitsToNumber(digit1, digit2, digit3);

        document.getElementById('result').textContent = `Результат: ${result}`;
    } 
    catch (error) 
    {
        document.getElementById('result').textContent = `Ошибка: ${error.message}`;
    }
});