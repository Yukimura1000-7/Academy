function convertSecondsToTime(totalSeconds) 
{
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

document.getElementById('convertButton').addEventListener('click', function () 
{
    try 
    {
        const secondsInput = parseInt(document.getElementById('secondsInput').value, 10);

        if (isNaN(secondsInput) || secondsInput < 0) 
        {
            throw new Error("Введите положительное число.");
        }

        const result = convertSecondsToTime(secondsInput);
        document.getElementById('result').textContent = `Результат: ${result}`;
    } 
    catch (error) 
    {
        document.getElementById('result').textContent = `Ошибка: ${error.message}`;
    }
});