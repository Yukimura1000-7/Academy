function concatenateStrings(...strings) 
{
    return strings.join(' ');
}

document.getElementById('concatenateButton').addEventListener('click', function () 
{
    const input = document.getElementById('inputStrings').value;

    const stringsArray = input.split(',').map(str => str.trim());

    const resultString = concatenateStrings(... stringsArray);

    document.getElementById('result').textContent = `Результат: ${resultString}`;
});